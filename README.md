# Generative Gallery

A collection of interactive generative pieces built with React, TypeScript, and p5.js.

## Live Demo

[View Gallery](https://lowejosh.github.io/generative)

<div align="center">
  <img src="./public/thumbnails/psychedelic-spiral.png" width="200" height="134" alt="Psychedelic Spiral" />
  <img src="./public/thumbnails/perlin-field.png" width="200" height="134" alt="Perlin Field" />
  <img src="./public/thumbnails/cityscape.png" width="200" height="134" alt="Cityscape" />
</div>

<div align="center">
  <img src="./public/thumbnails/multiplicative-epicycloid.png" width="200" height="134" alt="Multiplicative Epicycloid" />
  <img src="./public/thumbnails/perlin-flow.png" width="200" height="134" alt="Perlin Flow" />
  <img src="./public/thumbnails/random-walk.png" width="200" height="134" alt="Random Walk" />
</div>

<div align="center">
  <img src="./public/thumbnails/quantum-harmonics.png" width="200" height="134" alt="Quantum Harmonics" />
  <img src="./public/thumbnails/recursive-divisions.png" width="200" height="134" alt="Recursive Subdivisions" />
  <img src="./public/thumbnails/moire-lattices.png" height="134" alt="Moiré Lattices" />
</div>

<div align="center">
  <img src="./public/thumbnails/kaleidoscope-caustics.png" height="134" alt="Kaleidoscope Caustics" />
</div>

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- Yarn package manager

### Installation

```bash
git clone https://github.com/lowejosh/generative.git
cd generative
yarn install
```

### Development

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view the gallery.

## Creating New Sketches

Quickly create new artworks:

```bash
yarn makeSketch SketchName
```

Generates boilerplate for:

- Components
- Menu system
- Types
- File structure and imports

## Stack

- **React** 
- **TypeScript** 
- **p5.js** 
- **Material-UI** 
- **React Router** 

## Project Structure

```
src/
├── components/     # Reusable UI components
├── sketches/       # Individual sketches
├── hooks/          # Custom React hooks for p5.js integration
├── factories/      # Reusable generative algorithms
├── constants/      # Configuration and sketch registry
└── utils/          # Helper functions and utilities
```
