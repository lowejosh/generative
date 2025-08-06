import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import {
  initialQuantumHarmonicsVars,
  QuantumHarmonicsVars,
} from "./QuantumHarmonics.variables";
import { P5Instance } from "types/p5";

interface WaveSource {
  x: number;
  y: number;
  frequency: number;
  amplitude: number;
  phase: number;
}

export const getQuantumHarmonicsSketch = () => {
  return (p: P5Instance<QuantumHarmonicsVars>) => {
    p.variables = initialQuantumHarmonicsVars;

    let waveSources: WaveSource[] = [];
    let time = 0;
    let colorOffset = 0;

    // optimize with pre-calculated wave field grid
    let waveFieldResolution = 6; // sample every N pixels
    let waveField: number[][] = [];
    let fieldWidth = 0;
    let fieldHeight = 0;

    const initializeWaveSources = () => {
      if (!p.variables) return;

      waveSources = [];
      const { numSources, sourceFrequency, sourceAmplitude } = p.variables;

      for (let i = 0; i < numSources; i++) {
        const angle = (i / numSources) * p.TWO_PI;
        const radius = Math.min(p.width, p.height) * 0.25; // smaller radius
        const centerX = p.width / 2;
        const centerY = p.height / 2;

        waveSources.push({
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          frequency: sourceFrequency,
          amplitude: sourceAmplitude,
          phase: (i * p.PI) / 2, // phase offset between sources
        });
      }
    };

    const calculateWaveField = () => {
      if (!p.variables) return;

      fieldWidth = Math.ceil(p.width / waveFieldResolution);
      fieldHeight = Math.ceil(p.height / waveFieldResolution);
      waveField = Array(fieldWidth)
        .fill(null)
        .map(() => Array(fieldHeight).fill(0));

      const { waveDecay, phaseOffset, rotationSpeed } = p.variables;
      const currentTime = time; // avoid unsafe reference

      for (let x = 0; x < fieldWidth; x++) {
        for (let y = 0; y < fieldHeight; y++) {
          const worldX = x * waveFieldResolution;
          const worldY = y * waveFieldResolution;
          let totalAmplitude = 0;

          // calculate interference from all sources
          waveSources.forEach((source, index) => {
            const distance = p.dist(worldX, worldY, source.x, source.y);
            // sin wave with distance-based phase shift + time evolution + decay
            const waveValue =
              source.amplitude *
              Math.sin(
                source.frequency * distance -
                  currentTime * p.variables!.timeScale +
                  source.phase +
                  phaseOffset +
                  rotationSpeed * currentTime * index
              ) *
              Math.exp(-distance * waveDecay * 0.002); // exponential decay over distance

            totalAmplitude += waveValue;
          });

          waveField[x][y] = totalAmplitude;
        }
      }
    };

    const drawBackground = () => {
      if (!p.variables) return;
      p.background(15, 15, 25, p.variables.backgroundAlpha); // dark blue
    };

    const drawInterferenceField = () => {
      if (!p.variables || !p.variables.showInterferenceField) return;

      p.push();
      p.noStroke();

      // draw interference patterns as colored pixels
      for (let x = 0; x < fieldWidth - 1; x++) {
        for (let y = 0; y < fieldHeight - 1; y++) {
          const amplitude = waveField[x][y];
          const normalizedAmplitude = Math.abs(amplitude);

          if (normalizedAmplitude > p.variables.interferenceThreshold * 50) {
            const worldX = x * waveFieldResolution;
            const worldY = y * waveFieldResolution;

            // colors based on interference intensity and phase
            const hue = (((colorOffset + amplitude * 2) % 360) + 360) % 360;
            const saturation = p.map(normalizedAmplitude, 0, 150, 40, 100);
            const brightness = p.map(normalizedAmplitude, 0, 150, 30, 90);
            const alpha = p.map(normalizedAmplitude, 0, 150, 0.1, 0.8);

            p.fill(hue, saturation, brightness, alpha);
            p.rect(worldX, worldY, waveFieldResolution, waveFieldResolution);
          }
        }
      }

      // draw contour lines for high-energy zones
      p.strokeWeight(1);
      p.noFill();

      const contourLevels = [80, 120, 160]; // high amplitude thresholds
      contourLevels.forEach((threshold, index) => {
        const hue = (colorOffset + index * 60) % 360;
        p.stroke(hue, 80, 90, 0.6);

        for (let x = 1; x < fieldWidth - 1; x++) {
          for (let y = 1; y < fieldHeight - 1; y++) {
            const val = Math.abs(waveField[x][y]);
            if (val > threshold && val < threshold + 20) {
              const worldX = x * waveFieldResolution;
              const worldY = y * waveFieldResolution;
              p.point(worldX, worldY);
            }
          }
        }
      });

      p.pop();
    };

    const drawWaveSources = () => {
      if (!p.variables || !p.variables.showWaveSources) return;

      p.push();

      waveSources.forEach((source, index) => {
        const hue = index * 60; // fixed colors instead of cycling
        const isHovered = p.dist(p.mouseX, p.mouseY, source.x, source.y) < 25;
        const isDraggedSource = p.variables!.draggedSourceIndex === index;

        // pulsing core
        const pulseSize = 12 + Math.sin(time * 0.15 + index * p.PI) * 4;
        const coreOpacity = isDraggedSource ? 1.0 : isHovered ? 0.9 : 0.8;
        p.fill(hue, 70, 100, coreOpacity);
        p.noStroke();
        p.circle(source.x, source.y, pulseSize);

        // outer ring
        p.noFill();
        p.stroke(hue, 50, 90, 0.6);
        p.strokeWeight(2);
        p.circle(source.x, source.y, pulseSize + 8);

        // subtle ripple rings
        p.strokeWeight(1);
        for (let r = 25; r < 50; r += 15) {
          const ripplePhase = (time * 0.08 + index) % p.TWO_PI;
          const rippleRadius = r + Math.sin(ripplePhase) * 3;
          const rippleOpacity = p.map(r, 25, 50, 0.3, 0.1);
          p.stroke(hue, 40, 80, rippleOpacity);
          p.circle(source.x, source.y, rippleRadius);
        }
      });

      p.pop();
    };

    const getSourceIndexAt = (x: number, y: number): number => {
      for (let i = 0; i < waveSources.length; i++) {
        if (p.dist(x, y, waveSources[i].x, waveSources[i].y) < 25) {
          return i;
        }
      }
      return -1;
    };

    const handleMousePressed = () => {
      if (!p.variables) return;

      const sourceIndex = getSourceIndexAt(p.mouseX, p.mouseY);
      if (sourceIndex !== -1) {
        p.variables.isDragging = true;
        p.variables.draggedSourceIndex = sourceIndex;
      }
    };

    const handleMouseDragged = () => {
      if (
        !p.variables ||
        !p.variables.isDragging ||
        p.variables.draggedSourceIndex === -1
      )
        return;

      // move the dragged source to mouse position
      const index = p.variables.draggedSourceIndex;
      if (index >= 0 && index < waveSources.length) {
        waveSources[index].x = p.mouseX;
        waveSources[index].y = p.mouseY;
      }
    };

    const handleMouseReleased = () => {
      if (!p.variables) return;

      p.variables.isDragging = false;
      p.variables.draggedSourceIndex = -1;
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.colorMode(p.HSB, 360, 100, 100, 1);

      // optimize for performance based on canvas size
      waveFieldResolution = Math.max(
        4,
        Math.floor(Math.min(p.width, p.height) / 150)
      );

      initializeWaveSources();
      calculateWaveField();
      drawBackground();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);

      // recalculate field resolution for new canvas size
      waveFieldResolution = Math.max(
        4,
        Math.floor(Math.min(p.width, p.height) / 150)
      );

      initializeWaveSources();
      drawBackground();
    };

    p.draw = () => {
      checkForMismatchedSize(p);
      if (!p.variables) return;

      const {
        numSources,
        sourceFrequency,
        sourceAmplitude,
        colorCycleSpeed,
        timeScale,
      } = p.variables;

      time += timeScale;
      colorOffset += colorCycleSpeed * 360;

      // update wave sources if parameters changed
      if (waveSources.length !== numSources) {
        initializeWaveSources();
      } else {
        waveSources.forEach((source) => {
          source.frequency = sourceFrequency;
          source.amplitude = sourceAmplitude;
        });
      }

      calculateWaveField();

      // draw layers
      drawBackground();
      drawInterferenceField();
      drawWaveSources();
    };

    // mouse interaction handlers
    p.mousePressed = handleMousePressed;
    p.mouseDragged = handleMouseDragged;
    p.mouseReleased = handleMouseReleased;
  };
};
