import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { P5Instance } from "types/p5";
import {
  KaleidoscopeCausticsVars,
  initialKaleidoscopeCausticsVars,
} from "./KaleidoscopeCaustics.variables";

// fbm for soft caustic texture (reduced default octaves for perf)
const fbm = (p: any, x: number, y: number, z: number, oct = 4) => {
  let amp = 0.5,
    freq = 1,
    sum = 0;
  for (let i = 0; i < oct; i++) {
    sum += amp * p.noise(x * freq, y * freq, z * freq);
    amp *= 0.5;
    freq *= 2;
  }
  return sum;
};

// domain-warped ridged noise -> caustic-like
const caustic = (
  p: any,
  x: number,
  y: number,
  t: number,
  s: number,
  warp: number,
  sharp: number
) => {
  const wx = x + (fbm(p, x * 1.7, y * 1.7, t, 3) - 0.5) * warp;
  const wy = y + (fbm(p, x * 1.3 + 100, y * 1.3 + 100, t + 3.1, 3) - 0.5) * warp;
  const n = fbm(p, wx * s, wy * s, t * 0.6, 4);
  const ridged = Math.pow(1 - Math.abs(2 * n - 1), sharp);
  return ridged;
};

/**
 * kaleidoscope caustics: domain-warped noise mirrored into rotating wedges with soft glow trails
 */
export const kaleidoscopeCausticsSketch = (
  p: P5Instance<KaleidoscopeCausticsVars>
) => {
  p.variables = initialKaleidoscopeCausticsVars;

  let t = 0;

  // Precomputed delta table to avoid per-point trig
  const MAX_SEG_TABLE = 96;
  let cachedWedgeAngle = -1;
  const cosD: number[] = new Array(MAX_SEG_TABLE);
  const sinD: number[] = new Array(MAX_SEG_TABLE);
  const ensureDeltaTable = (wedgeAngle: number) => {
    if (wedgeAngle === cachedWedgeAngle) return;
    cachedWedgeAngle = wedgeAngle;
    for (let i = 0; i < MAX_SEG_TABLE; i++) {
      const u = i / (MAX_SEG_TABLE - 1); // 0..1
      const delta = (u - 0.5) * wedgeAngle;
      cosD[i] = Math.cos(delta);
      sinD[i] = Math.sin(delta);
    }
  };

  const drawBackground = () => {
    if (!p.variables) return;
    const a = p.variables.decay;
    if (a <= 0) return;
    p.noStroke();
    p.fill(0, 0, 0, a);
    p.rect(0, 0, p.width, p.height);
  };

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.pixelDensity(1);
    p.colorMode(p.HSB, 360, 100, 100, 1);
    p.noiseDetail(4, 0.5);
    p.background(initialKaleidoscopeCausticsVars.bgColor);
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    p.background(p.variables?.bgColor || "#000");
  };

  const sampleTextureHSB = (x: number, y: number) => {
    if (!p.variables) return { h: 0, s: 0, b: 0 };
    const { noiseScale, warp, sharpness, hueBase, hueRange, saturation, gain } =
      p.variables;
    const n = caustic(p, x, y, t, noiseScale, warp, sharpness);
    const h = (hueBase + hueRange * n) % 360;
    const b = Math.min(100, 100 * n * gain);
    return { h, s: saturation, b };
  };

  p.draw = () => {
    checkForMismatchedSize(p);
    if (!p.variables) return;

    const { wedgeCount, resolution, timeSpeed } = p.variables;
    t += timeSpeed * (p.deltaTime / 1000);

    // subtle trail fade
    drawBackground();

    const cx = p.width / 2;
    const cy = p.height / 2;
    const maxR = Math.hypot(cx, cy);
    const wedgeAngle = (Math.PI * 2) / wedgeCount;
    ensureDeltaTable(wedgeAngle);

    p.strokeWeight(1);
    p.noFill();

    // Texture sampling stride (1 = every point, 2 = every other)
    const SAMPLE_STRIDE = 2;
    const MAX_SEGMENTS = 64; // cap segments per arc for perf

    for (let r = 0; r < maxR; r += resolution) {
      // Segment count grows with radius but capped
      const target = Math.floor((r / maxR) * MAX_SEGMENTS);
      const arcPoints = 2 + Math.max(6, target);
      const baseTheta = r * 0.002 + t * 0.5; // slow swirl

      const cos0 = Math.cos(baseTheta);
      const sin0 = Math.sin(baseTheta);

      // reuse same points across all wedges
      const ptsX: number[] = new Array(arcPoints);
      const ptsY: number[] = new Array(arcPoints);
      const H: number[] = new Array(arcPoints);
      const S: number[] = new Array(arcPoints);
      const B: number[] = new Array(arcPoints);

      const step = (MAX_SEG_TABLE - 1) / (arcPoints - 1);
      for (let i = 0; i < arcPoints; i++) {
        const idx = Math.round(i * step);
        const cD = cosD[idx];
        const sD = sinD[idx];
        const x = r * (cos0 * cD - sin0 * sD);
        const y = r * (sin0 * cD + cos0 * sD);
        ptsX[i] = x;
        ptsY[i] = y;
        if (i % SAMPLE_STRIDE === 0) {
          const tex = sampleTextureHSB(x * 0.5, y * 0.5);
          H[i] = tex.h;
          S[i] = tex.s;
          B[i] = tex.b;
        } else {
          // reuse last sample to cut caustic calls
          H[i] = H[i - 1];
          S[i] = S[i - 1];
          B[i] = B[i - 1];
        }
      }

      for (let w = 0; w < wedgeCount; w++) {
        const rot = w * wedgeAngle;
        const flip = w % 2 === 1 ? -1 : 1;
        p.push();
        p.translate(cx, cy);
        p.rotate(rot);
        p.scale(1, flip);
        for (let i = 0; i < arcPoints - 1; i++) {
          p.stroke(H[i], S[i], B[i], 0.35);
          p.line(ptsX[i], ptsY[i], ptsX[i + 1], ptsY[i + 1]);
        }
        p.pop();
      }
    }
  };
};
