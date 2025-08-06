import { checkForMismatchedSize } from "utils/misc/checkForMismatchedSize";
import { initialRecursiveDivisionsVars, RecursiveDivisionsVars } from "./RecursiveDivisions.variables";
import { P5Instance } from "types/p5";
import { Rectangle } from "./RecursiveDivisions.types";

export const getRecursiveDivisionsSketch = () => {
  return (p: P5Instance<RecursiveDivisionsVars>) => {
    p.variables = initialRecursiveDivisionsVars;

    let rectangles: Rectangle[] = [];

    const subdivide = (x: number, y: number, w: number, h: number, depth: number) => {
      if (!p.variables) return;

      // stop conditions
      if (depth >= p.variables.maxDepth || 
          w < p.variables.minSize || 
          h < p.variables.minSize ||
          p.random() > p.variables.splitChance) {
        
        // determine fill type and pattern
        const shouldFill = p.random() < p.variables.solidFillChance;
        const shouldPattern = !shouldFill && p.random() < p.variables.patternChance;
        
        let pattern: 'lines' | 'dots' | 'noise' | 'grid' | undefined;
        if (shouldPattern) {
          const patterns: ('lines' | 'dots' | 'noise' | 'grid')[] = ['lines', 'dots', 'noise', 'grid'];
          pattern = patterns[Math.floor(p.random() * patterns.length)];
        }
        
        // create final rectangle
        rectangles.push({
          x, y, width: w, height: h,
          filled: shouldFill,
          pattern: pattern
        });
        return;
      }

      // decide split direction based on aspect ratio with some randomness
      const aspectRatio = w / h;
      const splitVertical = aspectRatio > 1.2 || (aspectRatio > 0.8 && p.random() > 0.5);
      
      if (splitVertical) {
        // vertical split - use golden ratio-ish division with variation
        const goldenRatio = 0.618;
        const variation = 0.15;
        const splitRatio = goldenRatio + p.random(-variation, variation);
        const splitPoint = w * splitRatio;
        
        subdivide(x, y, splitPoint, h, depth + 1);
        subdivide(x + splitPoint, y, w - splitPoint, h, depth + 1);
      } else {
        // horizontal split
        const goldenRatio = 0.618;
        const variation = 0.15;
        const splitRatio = goldenRatio + p.random(-variation, variation);
        const splitPoint = h * splitRatio;
        
        subdivide(x, y, w, splitPoint, depth + 1);
        subdivide(x, y + splitPoint, w, h - splitPoint, depth + 1);
      }
    };

    const generate = () => {
      if (!p.variables) return;
      
      p.randomSeed(p.variables.seed);
      rectangles = [];
      
      // start subdivision from canvas bounds with padding
      const padding = 40;
      subdivide(
        padding, 
        padding, 
        p.width - padding * 2, 
        p.height - padding * 2, 
        0
      );
    };

    const drawPattern = (rect: Rectangle) => {
      if (!p.variables || !rect.pattern) return;
      
      p.push();
      // clip to rectangle bounds to prevent overflow
      const ctx = (p as any).drawingContext;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rect.x, rect.y, rect.width, rect.height);
      ctx.clip();
      
      p.translate(rect.x, rect.y);
      
      p.stroke(p.variables.accentColor);
      p.strokeWeight(1);
      
      switch (rect.pattern) {
        case 'lines':
          // diagonal lines - now properly clipped
          const lineSpacing = p.variables.lineSpacing;
          for (let i = -rect.height; i < rect.width + rect.height; i += lineSpacing) {
            p.line(i, 0, i + rect.height, rect.height);
          }
          break;
          
        case 'dots':
          // dot grid
          const dotSize = p.variables.dotSize;
          const spacing = p.variables.lineSpacing;
          p.noStroke();
          p.fill(p.variables.accentColor);
          for (let x = spacing; x < rect.width - spacing; x += spacing) {
            for (let y = spacing; y < rect.height - spacing; y += spacing) {
              p.circle(x, y, dotSize);
            }
          }
          break;
          
        case 'noise':
          // perlin noise texture
          p.noStroke();
          p.fill(p.variables.accentColor);
          for (let x = 0; x < rect.width; x += 4) {
            for (let y = 0; y < rect.height; y += 4) {
              const noiseVal = p.noise((rect.x + x) * p.variables.noiseScale, (rect.y + y) * p.variables.noiseScale);
              if (noiseVal > 0.6) {
                p.rect(x, y, 3, 3);
              }
            }
          }
          break;
          
        case 'grid':
          // small grid pattern
          const gridSpacing = p.variables.lineSpacing / 2;
          for (let x = gridSpacing; x < rect.width; x += gridSpacing) {
            p.line(x, 0, x, rect.height);
          }
          for (let y = gridSpacing; y < rect.height; y += gridSpacing) {
            p.line(0, y, rect.width, y);
          }
          break;
      }
      
      ctx.restore();
      p.pop();
    };

    const drawRectangles = () => {
      if (!p.variables) return;
      
      p.stroke(p.variables.strokeColor);
      p.strokeWeight(p.variables.strokeWeight);
      
      rectangles.forEach(rect => {
        if (rect.filled) {
          p.fill(p.variables!.fillColor);
          p.rect(rect.x, rect.y, rect.width, rect.height);
        } else if (rect.pattern) {
          p.noFill();
          p.rect(rect.x, rect.y, rect.width, rect.height);
          drawPattern(rect);
        } else {
          p.noFill();
          p.rect(rect.x, rect.y, rect.width, rect.height);
        }
      });
    };

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      generate();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
      generate();
    };

    p.draw = () => {
      checkForMismatchedSize(p);
      if (p.variables) {
        p.background(p.variables.bgColor);
        generate(); // regenerate on every frame when variables change
        drawRectangles();
      }
    };
  };
};