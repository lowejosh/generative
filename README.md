# Generative Art Gallery 🎨

A collection of interactive generative art pieces built with React, TypeScript, and p5.js.

## 🚀 Live Demo

[View Gallery](https://lowejosh.github.io/generative)

## ✨ Featured

<div align="center">
  <img src="./public/thumbnails/psychedelic-spiral.png" width="200" alt="Psychedelic Spiral" />
  <img src="./public/thumbnails/perlin-field.png" width="200" alt="Perlin Field" />
  <img src="./public/thumbnails/cityscape.png" width="200" alt="Cityscape" />
</div>

<div align="center">
  <img src="./public/thumbnails/multiplicative-epicycloid.png" width="200" alt="Multiplicative Epicycloid" />
  <img src="./public/thumbnails/perlin-flow.png" width="200" alt="Perlin Flow" />
  <img src="./public/thumbnails/random-walk.png" width="200" alt="Random Walk" />
</div>

## 🛠️ Getting Started

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

### Build for Production

```bash
yarn build
```

### Deploy to GitHub Pages

```bash
yarn deploy
```

## 🎯 Creating New Sketches

Use the built-in sketch generator to quickly create new artworks:

```bash
yarn makeSketch SketchName
```

This command automatically generates:

- Component boilerplate with p5.js integration
- Menu system for interactive controls
- TypeScript type definitions
- Proper file structure and imports

## 🎨 Sketch Categories

- **Noise**: Perlin noise-based organic patterns
- **Geometry**: Mathematical shapes and transformations
- **Particles**: Dynamic particle system simulations
- **Animation**: Time-based generative animations
- **Interactive**: User-controllable parameters and real-time interaction
- **Mathematical**: Algorithm-driven mathematical visualizations

## 🧰 Built With

- **React** - UI framework
- **TypeScript** - Type safety and better development experience
- **p5.js** - Creative coding and graphics library
- **Material-UI** - Component library and design system
- **React Router** - Client-side routing
- **GitHub Pages** - Hosting and deployment

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components
├── sketches/       # Individual art pieces
├── hooks/          # Custom React hooks for p5.js integration
├── factories/      # Reusable generative algorithms
├── constants/      # Configuration and sketch registry
└── utils/          # Helper functions and utilities
```

## 🤝 Contributing

1. Fork the repository
2. Create a new sketch using `yarn makeSketch YourSketchName`
3. Implement your generative art piece
4. Add a thumbnail to `public/thumbnails/`
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
