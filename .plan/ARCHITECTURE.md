# Cortana Living Audio - Modular Architecture

## Overview
This document describes the modular monolith architecture implemented for the Cortana Living Audio project, designed for maintainability, scalability, and clean separation of concerns.

## Folder Structure

```
├── src/                          # Source code (modular monolith)
│   ├── core/                     # Core application module
│   │   ├── app/                  # Main application components
│   │   │   ├── GdmLiveAudio.tsx  # Main app component
│   │   │   └── index.ts          # App exports
│   │   ├── config/               # Configuration management
│   │   │   └── index.ts          # App configuration
│   │   └── index.ts              # Core module exports
│   │
│   ├── audio/                    # Audio processing module
│   │   ├── processing/           # Audio analysis and utilities
│   │   │   ├── analyser.ts       # Audio analysis logic
│   │   │   └── utils.ts          # Audio processing utilities
│   │   ├── worklets/             # Audio worklet processors
│   │   │   └── mic-worklet-processor.js
│   │   └── index.ts              # Audio module exports
│   │
│   ├── visuals/                  # 3D visualization module
│   │   ├── components/           # Visual components
│   │   │   └── Visual3D.tsx      # 3D audio-reactive visualization
│   │   ├── shaders/              # WebGL shaders
│   │   │   ├── sphere-shader.ts  # Sphere vertex/fragment shaders
│   │   │   └── backdrop-shader.ts # Background gradient shaders
│   │   ├── utils/                # Visual utilities
│   │   │   └── visual.ts         # 2D visualization (legacy)
│   │   └── index.ts              # Visuals module exports
│   │
│   ├── ai/                       # AI personality module
│   │   ├── personality/          # Personality system
│   │   │   ├── enhanced-personality.ts # Enhanced AI framework
│   │   │   └── index.ts          # Personality exports
│   │   └── index.ts              # AI module exports
│   │
│   ├── shared/                   # Shared utilities and types
│   │   ├── types/                # Common TypeScript interfaces
│   │   │   └── index.ts          # Type definitions
│   │   ├── constants/            # Application constants
│   │   │   └── index.ts          # Configuration constants
│   │   └── utils/                # Shared utility functions
│   │       └── index.ts          # Common utilities
│   │
│   ├── assets/                   # Static assets
│   │   └── styles/               # CSS styles
│   │       └── index.css         # Main stylesheet
│   │
│   └── index.ts                  # Main module exports
│
├── public/                       # Public static assets
│   └── piz_compressed.exr        # HDR environment texture
│
├── docs/                         # Documentation
│   └── ARCHITECTURE.md           # This file
│
├── .plan/                        # Project planning documents
│   └── specs/                    # Feature specifications
│
├── main.ts                       # Application entry point
├── index.html                    # HTML entry point
├── vite.config.ts               # Build configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # Project overview
```

## Module Design Principles

### 1. Core Module (`src/core/`)
- **Purpose**: Main application logic and configuration
- **Components**: Primary Lit web component, app configuration
- **Dependencies**: All other modules (orchestrator)

### 2. Audio Module (`src/audio/`)
- **Purpose**: Audio processing, analysis, and worklet management
- **Components**: Audio analyzers, utilities, microphone processing
- **Dependencies**: Shared utilities only
- **Performance**: Optimized for real-time audio (<1000ms latency)

### 3. Visuals Module (`src/visuals/`)
- **Purpose**: 3D audio-reactive visualizations
- **Components**: Three.js components, WebGL shaders, visual utilities
- **Dependencies**: Audio module for analysis data
- **Performance**: 60fps rendering target

### 4. AI Module (`src/ai/`)
- **Purpose**: Enhanced personality system and conversation management
- **Components**: System instruction framework, adaptive communication
- **Dependencies**: Shared constants and types
- **Features**: 275-word optimized personality, self-reflection capabilities

### 5. Shared Module (`src/shared/`)
- **Purpose**: Common utilities, types, and constants
- **Components**: TypeScript interfaces, configuration constants
- **Dependencies**: None (pure utilities)
- **Usage**: Imported by all other modules

## Import Strategy

### Module Exports
Each module provides a clean API through its `index.ts` file:

```typescript
// Core module
export { default as GdmLiveAudio } from './app/GdmLiveAudio';

// Audio module  
export * from './processing/analyser';
export * from './processing/utils';

// Visuals module
export { default as Visual3D } from './components/Visual3D';
export * from './shaders/sphere-shader';

// AI module
export * from './personality/enhanced-personality';
```

### Path Aliases (vite.config.ts)
```typescript
resolve: {
  alias: {
    '@': path.resolve(__dirname, 'src'),
    '@core': path.resolve(__dirname, 'src/core'),
    '@audio': path.resolve(__dirname, 'src/audio'),
    '@visuals': path.resolve(__dirname, 'src/visuals'),
    '@ai': path.resolve(__dirname, 'src/ai'),
    '@shared': path.resolve(__dirname, 'src/shared'),
  }
}
```

## Benefits of This Architecture

### 1. **Maintainability**
- Clear separation of concerns
- Module boundaries prevent tight coupling
- Easy to locate and modify specific functionality

### 2. **Scalability**
- New features can be added as separate modules
- Existing modules can be enhanced independently
- Future expansion paths are well-defined

### 3. **Testability**
- Each module can be tested in isolation
- Clear dependency injection points
- Mocked dependencies for unit testing

### 4. **Development Experience**
- Clear file organization reduces cognitive load
- Path aliases provide clean imports
- TypeScript interfaces ensure type safety

### 5. **Future Expansion**
- Phase 2: Advanced AI capabilities (memory, RSIP)
- Phase 3: Multi-language support, personalization
- New modules can be added without refactoring

## Performance Considerations

### Audio Performance
- Real-time constraints maintained (<1000ms latency)
- Audio worklets isolated in dedicated folder
- No circular dependencies affecting audio pipeline

### Visual Performance  
- Shaders and Three.js code isolated for optimization
- WebGL resources properly managed
- 60fps target maintained

### AI Performance
- Personality framework optimized for <300ms overhead
- Self-reflection processing contained in AI module
- Token limits and validation centralized

## Migration Notes

### Breaking Changes
- Import paths updated from root-relative to module-relative
- Entry point changed from `index.tsx` to `main.ts`
- CSS moved to `src/assets/styles/`

### Compatibility
- All existing functionality preserved
- Performance targets maintained
- No changes to external APIs (Gemini Live, Web Audio, Three.js)

This modular architecture provides a solid foundation for the Cortana Living Audio project's continued development while maintaining the real-time performance and user experience quality that defines the application.
