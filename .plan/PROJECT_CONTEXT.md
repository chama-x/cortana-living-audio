# Cortana Living Audio - Project Context Guide

> **Purpose:** Comprehensive context for AI assistants working on this project. Include this entire document in conversation context for optimal assistance.

## Project Overview

**Cortana Living Audio** is a real-time voice chat application with Google Gemini AI featuring immersive 3D audio-reactive visuals. The project aims to create the most authentic, emotionally intelligent conversational AI experience possible, inspired by Samantha from the movie "Her."

### Core Mission
Transform basic AI chat into indistinguishably human-like conversation through advanced personality engineering, self-reflection capabilities, and adaptive emotional intelligence, while maintaining real-time performance and stunning visual feedback.

## Technical Architecture

### Technology Stack
```
Frontend: Lit (Web Components) + TypeScript
Audio: Web Audio API, MediaDevices, AudioWorkletNode
Graphics: Three.js (WebGL) + Custom GLSL Shaders
AI: Google Gemini 2.5 Flash Native Audio Dialog API
Build: Vite + TypeScript (ES2022)
Package Manager: pnpm
Architecture: Modular Monolith
```

### Key Dependencies
```json
{
  "lit": "^3.3.0",
  "@lit/context": "^1.1.5", 
  "@google/genai": "^1.15.0",
  "three": "^0.176.0"
}
```

### Modular Architecture (v2.0)
- **Modular Monolith**: Clean separation of concerns with defined module boundaries
- **Component-Based**: Lit web components with reactive state management
- **Real-Time Audio Pipeline**: Microphone → AudioWorklet → Gemini Live API → Audio Output
- **3D Visualization Engine**: Audio analysis → WebGL shaders → Real-time visual feedback
- **Event-Driven**: Async callbacks for audio streaming and AI responses
- **Module System**: Core, Audio, Visuals, AI, and Shared modules with clean APIs

## Current System State

### Implemented Features
- ✅ Real-time bidirectional voice chat with Gemini Live API
- ✅ 3D audio-reactive visualizations with bloom effects
- ✅ Basic Cortana personality with warm, accessible communication style
- ✅ Microphone input processing via AudioWorkletNode
- ✅ Session management with start/stop/reset controls

### Active Development  
- ✅ **Enhanced AI Personality with Basic Self-Reflection** (Completed)
  - Location: `src/ai/personality/enhanced-personality.ts`
  - Status: Requirements ✅, Design ✅, Tasks ✅, Implementation ✅
  - Features: 275-word optimized framework, adaptive communication, self-reflection capabilities

## AI Personality System

### Current Implementation (Enhanced v2.0)
```typescript
// Location: src/core/app/GdmLiveAudio.tsx lines 171-175
systemInstruction: {
  parts: [{
    text: this.enhancedPersonality.generateInstruction()
  }]
}

// Enhanced Personality Framework: src/ai/personality/enhanced-personality.ts
interface EnhancedPersonality {
  systemInstruction: OptimizedInstruction;     // 275-word optimized framework  
  selfReflection: QualityEvaluationLayer;     // 4-criteria assessment
  conversationState: LightweightStateManager; // Session-based evolution
  emotionalIntelligence: ContextAdaptation;   // Response style adaptation
}
```

### Enhanced Personality Components
```typescript
// Identity Core (75 words) - Authentic personality traits
// Communication Style (65 words) - Adaptive speech patterns  
// Self-Reflection Guidance (85 words) - Meta-cognitive instructions
// Memory Integration (35 words) - Conversation continuity
// Safety Boundaries (15 words) - Minimal constraints
// Total: 275 words, ~316 tokens
```

### Communication Philosophy
- **Universal Accessibility**: Clear, engaging communication for diverse users
- **Language Approach**: Adaptive clarity suitable for various backgrounds
- **Personality Foundation**: Warm, curious, emotionally intelligent, authentic
- **Interaction Style**: Naturally evolving conversation with genuine interest

## Modular File Structure

```
src/                              # Source code (modular monolith)
├── core/                         # 🎯 Core application module
│   ├── app/                      # Main application components
│   │   ├── GdmLiveAudio.tsx      # Main component with enhanced personality (339 lines)
│   │   └── index.ts              # App exports
│   ├── config/                   # Configuration management
│   │   └── index.ts              # App configuration
│   └── index.ts                  # Core module exports
│
├── audio/                        # 🎵 Audio processing module
│   ├── processing/               # Audio analysis and utilities
│   │   ├── analyser.ts           # Audio analysis logic
│   │   └── utils.ts              # Audio processing utilities
│   ├── worklets/                 # Audio worklet processors
│   │   └── mic-worklet-processor.js # Microphone audio processing
│   └── index.ts                  # Audio module exports
│
├── visuals/                      # 🎨 3D visualization module
│   ├── components/               # Visual components
│   │   └── Visual3D.tsx          # 3D audio-reactive visualization (257 lines)
│   ├── shaders/                  # WebGL shaders
│   │   ├── sphere-shader.ts      # Sphere vertex/fragment shaders (92 lines)
│   │   └── backdrop-shader.ts    # Background gradient shaders
│   ├── utils/                    # Visual utilities
│   │   └── visual.ts             # 2D visualization (legacy)
│   └── index.ts                  # Visuals module exports
│
├── ai/                           # 🧠 AI personality module
│   ├── personality/              # Personality system
│   │   ├── enhanced-personality.ts # Enhanced AI framework (300+ lines)
│   │   └── index.ts              # Personality exports
│   └── index.ts                  # AI module exports
│
├── shared/                       # 🔧 Shared utilities and types
│   ├── types/                    # Common TypeScript interfaces
│   │   └── index.ts              # Type definitions
│   ├── constants/                # Application constants
│   │   └── index.ts              # Configuration constants
│   └── utils/                    # Shared utility functions
│       └── index.ts              # Common utilities
│
├── assets/                       # 📁 Static assets
│   └── styles/                   # CSS styles
│       └── index.css             # Main stylesheet
│
└── index.ts                      # Main module exports

Root Files:
├── main.ts                       # Application entry point
├── index.html                    # HTML entry point
├── vite.config.ts               # Build configuration with path aliases
└── .plan/                        # Project planning documents
    └── specs/enhanced-ai-personality/
        ├── requirements.md       # Feature requirements (175 lines)
        ├── design.md            # Architecture design (381 lines)
        └── tasks.md             # Implementation plan (180 lines)
```

## Modular Architecture Design

### Module Responsibilities

**1. Core Module (`src/core/`)**
- **Purpose**: Main application orchestration and configuration management
- **Components**: Primary Lit web component with enhanced personality integration
- **Dependencies**: All other modules (acts as the application orchestrator)
- **Key Files**: `GdmLiveAudio.tsx` with integrated enhanced personality system

**2. Audio Module (`src/audio/`)**
- **Purpose**: Real-time audio processing, analysis, and worklet management  
- **Components**: Audio analyzers, processing utilities, microphone worklets
- **Dependencies**: Shared utilities only (performance isolation)
- **Performance**: Optimized for <1000ms total latency, <300ms enhancement overhead

**3. Visuals Module (`src/visuals/`)**
- **Purpose**: 3D audio-reactive visualizations with WebGL rendering
- **Components**: Three.js components, GLSL shaders, visual utilities
- **Dependencies**: Audio module for frequency analysis data
- **Performance**: Maintains 60fps rendering target with bloom effects

**4. AI Module (`src/ai/`)**  
- **Purpose**: Enhanced personality system with 275-word optimized framework
- **Components**: System instruction generation, adaptive communication, self-reflection
- **Dependencies**: Shared constants and types only
- **Features**: Authenticity evaluation, empathy assessment, conversation state awareness

**5. Shared Module (`src/shared/`)**
- **Purpose**: Common utilities, TypeScript interfaces, and configuration constants
- **Components**: Type definitions, audio/visual/AI constants, utility functions
- **Dependencies**: None (pure utilities and types)
- **Usage**: Imported by all modules to prevent code duplication

### Architecture Benefits

**Maintainability**
- Clear module boundaries prevent tight coupling between components
- Single responsibility principle applied at module level
- Easy to locate and modify specific functionality

**Scalability**  
- New features can be added as separate modules without refactoring
- Existing modules can be enhanced independently
- Defined expansion paths for Phase 2 (memory) and Phase 3 (personalization)

**Performance**
- Audio processing isolated for real-time performance optimization
- Visual rendering separated from business logic
- AI personality framework contained for efficient processing

**Development Experience**
- Path aliases (`@core`, `@audio`, `@visuals`, `@ai`, `@shared`) for clean imports
- TypeScript strict mode with comprehensive interface definitions
- Module exports provide clean APIs for cross-module communication

## Performance Requirements

### Real-Time Constraints
- **Audio Latency**: <2000ms total response time
- **Enhancement Overhead**: <500ms additional processing
- **Memory Usage**: <10MB additional overhead
- **Visual Sync**: 60fps WebGL rendering maintained

### Quality Targets
- **Response Authenticity**: >8.5/10 subjective rating
- **Emotional Appropriateness**: >85% accuracy
- **Conversation Quality**: Natural, engaging, and contextually appropriate
- **Conversation Engagement**: +25% average session duration

## Development Principles

### Code Quality Standards
- **TypeScript Strict Mode**: Full type safety required
- **Lit Best Practices**: Reactive properties, lifecycle management
- **Web Audio Optimization**: Efficient AudioContext usage
- **Error Resilience**: Graceful degradation for all features

### Architecture Constraints
- **No External Databases**: Session-based state management only
- **Minimal Dependencies**: Prefer native APIs over libraries
- **Real-Time First**: Never compromise audio performance
- **Adaptive Intelligence**: Flexible personality that grows with user interaction

## AI Enhancement Framework

### Self-Reflection System
```typescript
interface QualityEvaluation {
  authenticity: number;    // 1-10 scale: Natural human-like responses
  empathy: number;        // 1-10 scale: Emotional recognition & response
  coherence: number;      // 1-10 scale: Logical conversation flow
  usefulness: number;     // 1-10 scale: Helpful & engaging content
  threshold: 7.0;         // Minimum acceptable score
}
```

### Personality Evolution
- **Session-Based**: State resets between conversations
- **Lightweight Tracking**: Conversation flow, emotional context, rapport building
- **No Persistence**: Maintains simplicity, prevents data complexity
- **Contextual Adaptation**: Dynamic response to user preferences and conversation style

## Future Expansion Roadmap

### Phase 1: Enhanced Personality (Current)
- Optimized system instruction (275 words)
- Basic self-reflection processing
- Improved emotional intelligence
- Conversation state awareness

### Phase 2: Advanced Capabilities
- External memory integration
- Full Recursive Self-Improvement Prompting (RSIP)
- Multi-session relationship building
- Advanced sentiment analysis

### Phase 3: Ecosystem Expansion
- Multi-language support and global accessibility
- Personality customization options
- Advanced contextual intelligence and personalization
- Integration with local knowledge bases

## Context Engineering Guidelines

### For AI Assistants Working on This Project

**Always Consider:**
1. **Real-Time Performance**: Audio cannot be compromised
2. **Authentic Intelligence**: Focus on genuine personality development
3. **Simplicity First**: Prefer elegant solutions over complex ones
4. **Incremental Enhancement**: Build on existing working systems
5. **Test-Driven Development**: Ensure reliability at every step

**Never Do:**
- Break existing audio streaming functionality
- Add overly restrictive personality constraints
- Add external database dependencies (Phase 1)
- Compromise real-time performance for features
- Ignore error handling and graceful degradation

**Key Integration Points:**
- `src/core/app/GdmLiveAudio.tsx` lines 171-175: Enhanced system instruction integration
- `src/ai/personality/enhanced-personality.ts`: 275-word optimized personality framework
- Audio pipeline: Microphone → `src/audio/worklets/` → Gemini Live API → Audio Output
- Visual pipeline: Audio analysis → `src/visuals/shaders/` → WebGL rendering
- State management: Lit reactive properties with modular component architecture

## Development Environment

### Setup Requirements
```bash
# Dependencies
pnpm i

# Environment  
GEMINI_API_KEY=AQ.Ab8RN6JmqeE4eFVllNszJ6ee4Mc4jdjbJx4fFfapWgIt8aeLxA # Add to .env.local

# Development (Modular Architecture)
pnpm dev    # Starts Vite dev server with modular structure
pnpm build  # Production build with path aliases
pnpm preview # Preview production build

# Entry Points
# - HTML: index.html
# - Main: main.ts → src/index.ts
# - Components: src/core/app/GdmLiveAudio.tsx
```

### Browser Requirements
- Modern Chromium-based browsers recommended
- Microphone permissions required
- Secure context (HTTPS or localhost)
- Hardware acceleration enabled for optimal performance

## Success Metrics & Validation

### Technical Metrics
- Response latency: <1000ms total, <300ms enhancement overhead
- Memory efficiency: <50MB additional usage
- Error resilience: >95% graceful degradation success
- Audio quality: No degradation from baseline

### User Experience Metrics
- Conversation authenticity: Subjective quality improvement
- Engagement duration: Measurable session length increases
- Emotional appropriateness: Context-sensitive communication
- Personality consistency: Coherent evolution across conversations

---

**Last Updated**: January 2025  
**Project Phase**: Modular Architecture v2.0 with Enhanced AI Personality ✅
**Architecture**: Modular Monolith (Core, Audio, Visuals, AI, Shared modules)
**Critical Dependencies**: Gemini 2.5 Flash Native Audio Dialog API
**Development Focus**: Scalable architecture with completed enhanced personality system
**Performance**: Real-time audio (<1000ms), 60fps visuals, 275-word optimized AI (316 tokens)
