import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { P5Instance } from "types/p5";
import { initialPsychedelicSpiralVars, PsychedelicSpiralVars } from "./PsychedelicSpiral.variables";
import { createPerlinNoise } from "factories/PerlinNoise/PerlinNoise";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
  spiralAngle: number;
  spiralRadius: number;
}

export const getPsychedelicSpiralSketch = () => {
  return (p: P5Instance<PsychedelicSpiralVars>) => {
    p.variables = initialPsychedelicSpiralVars;
    const particles: Particle[] = [];
    const trails: Array<{x: number, y: number, hue: number, alpha: number}> = [];
    
    const noiseHandlers = {
      spiral: createPerlinNoise({ noiseIncrement: 0.002 }),
      color: createPerlinNoise({ noiseIncrement: 0.003 }),
      morph: createPerlinNoise({ noiseIncrement: 0.001 }),
      pulse: createPerlinNoise({ noiseIncrement: 0.008 }),
    };

    let centerX: number;
    let centerY: number;
    let globalTime = 0;

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < (p.variables?.particleCount || 150); i++) {
        particles.push({
          x: centerX,
          y: centerY,
          vx: p.random(-2, 2),
          vy: p.random(-2, 2),
          life: p.random(50, 200),
          maxLife: p.random(50, 200),
          hue: p.random(360),
          size: p.random(2, 8),
          spiralAngle: p.random(p.TWO_PI),
          spiralRadius: p.random(50, 200),
        });
      }
    };

    const drawBackground = () => {
      if (p.variables?.clearScreen) {
        p.background(0, 20);
      } else {
        // Create trail effect with fading background
        p.fill(0, 15);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);
      }
    };

    const updateParticles = () => {
      if (!p.variables) return;

      particles.forEach((particle, index) => {
        // Spiral motion with noise
        const spiralNoise = noiseHandlers.spiral.getNoise(
          particle.x * 0.01,
          particle.y * 0.01,
          globalTime
        );
        
        particle.spiralAngle += (p.variables?.spiralSpeed || 0.02) * (1 + spiralNoise);
        const morphNoise = noiseHandlers.morph.getNoise(
          particle.spiralAngle,
          globalTime,
          index * 0.1
        );
        
        const radiusModulation = p.sin(globalTime * 0.1 + index * 0.5) * (p.variables?.morphingIntensity || 50);
        const currentRadius = particle.spiralRadius + radiusModulation + morphNoise * 50;
        
        const targetX = centerX + p.cos(particle.spiralAngle) * currentRadius;
        const targetY = centerY + p.sin(particle.spiralAngle) * currentRadius;
        
        // Add organic movement
        particle.vx += (targetX - particle.x) * 0.02;
        particle.vy += (targetY - particle.y) * 0.02;
        
        // Apply velocity with damping
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        // Color shifting
        const colorNoise = noiseHandlers.color.getNoise(
          particle.x * 0.005,
          particle.y * 0.005,
          globalTime
        );
        particle.hue = (particle.hue + (p.variables?.colorShiftSpeed || 0.005) * 360 + colorNoise * 50) % 360;
        
        // Life cycle
        particle.life--;
        if (particle.life <= 0) {
          // Respawn particle
          particle.x = centerX + p.random(-50, 50);
          particle.y = centerY + p.random(-50, 50);
          particle.life = particle.maxLife;
          particle.spiralAngle = p.random(p.TWO_PI);
          particle.spiralRadius = p.random(50, 300);
        }
        
        // Add to trails
        if (trails.length > ((p.variables?.trailLength || 20) * particles.length)) {
          trails.shift();
        }
        trails.push({
          x: particle.x,
          y: particle.y,
          hue: particle.hue,
          alpha: p.map(particle.life, 0, particle.maxLife, 0, 255)
        });
      });
    };

    const drawKaleidoscope = () => {
      if (!p.variables) return;
      
      p.push();
      p.translate(centerX, centerY);
      
      const segments = p.variables?.kaleidoscopeSegments || 8;
      const angleStep = p.TWO_PI / segments;
      
      for (let i = 0; i < segments; i++) {
        p.push();
        p.rotate(i * angleStep);
        
        // Draw fractal spirals
        drawFractalSpiral(0, 0, p.variables?.fractalDepth || 3);
        
        p.pop();
      }
      p.pop();
    };

    const drawFractalSpiral = (x: number, y: number, depth: number) => {
      if (depth <= 0 || !p.variables) return;
      
      const pulseNoise = noiseHandlers.pulse.getNoise(x * 0.01, y * 0.01, globalTime);
      const radius = 20 + pulseNoise * (p.variables?.pulsationIntensity || 30);
      const segments = 12;
      
      p.strokeWeight(depth * 0.5);
      
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * p.TWO_PI + globalTime;
        const x1 = x + p.cos(angle) * radius;
        const y1 = y + p.sin(angle) * radius;
        
        const hue = (globalTime * 50 + i * 30 + depth * 60) % 360;
        p.stroke(hue, 80, 90, 150);
        
        p.line(x, y, x1, y1);
        
        // Recursive call
        if (depth > 1) {
          drawFractalSpiral(x1, y1, depth - 1);
        }
      }
    };

    const drawParticles = () => {
      p.noStroke();
      
      particles.forEach(particle => {
        const alpha = p.map(particle.life, 0, particle.maxLife, 0, 255);
        p.fill(particle.hue, 70, 95, alpha);
        
        const pulseNoise = noiseHandlers.pulse.getNoise(
          particle.x * 0.01,
          particle.y * 0.01,
          globalTime
        );
        const size = particle.size + pulseNoise * 5;
        
        p.ellipse(particle.x, particle.y, size, size);
      });
    };

    const drawTrails = () => {
      p.strokeWeight(1);
      
      for (let i = 0; i < trails.length - 1; i++) {
        const trail = trails[i];
        const nextTrail = trails[i + 1];
        
        const alpha = p.map(i, 0, trails.length, 0, trail.alpha * 0.3);
        p.stroke(trail.hue, 60, 85, alpha);
        p.line(trail.x, trail.y, nextTrail.x, nextTrail.y);
      }
    };

    const drawPsychedelicGrid = () => {
      if (!p.variables) return;
      
      p.strokeWeight(0.5);
      const gridSize = 40;
      
      for (let x = 0; x < p.width; x += gridSize) {
        for (let y = 0; y < p.height; y += gridSize) {
          const noise = noiseHandlers.morph.getNoise(x * 0.01, y * 0.01, globalTime);
          const distanceFromCenter = p.dist(x, y, centerX, centerY);
          const wave = p.sin(distanceFromCenter * 0.02 + globalTime * 2);
          
          const hue = (noise * 360 + globalTime * 30) % 360;
          const alpha = p.map(wave, -1, 1, 0, 100) * p.map(distanceFromCenter, 0, 400, 1, 0);
          
          p.stroke(hue, 50, 80, alpha);
          
          const size = 5 + noise * 10 + wave * 5;
          p.noFill();
          p.ellipse(x, y, size, size);
        }
      }
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 255);
      centerX = p.width / 2;
      centerY = p.height / 2;
      initParticles();
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      centerX = p.width / 2;
      centerY = p.height / 2;
      drawBackground();
    };

    p.draw = () => {
      checkForMismatchedSize(p);
      globalTime += 0.02;
      
      drawBackground();
      
      // Draw psychedelic grid background
      drawPsychedelicGrid();
      
      // Update and draw particles
      updateParticles();
      drawTrails();
      drawParticles();
      
      // Draw kaleidoscope overlay
      drawKaleidoscope();
      
      // Add some screen-wide effects
      p.push();
      p.blendMode(p.SCREEN);
      p.fill(0, 0, 5, 10);
      p.noStroke();
      p.ellipse(centerX, centerY, p.width * 2, p.height * 2);
      p.pop();
    };
  };
};
