/**
 * 3D Visualization module exports
 * Provides visual components, shaders, and utilities for audio-reactive graphics
 */

// Visual components
export { default as Visual3D } from './components/Visual3D';

// Shader modules
export * from './shaders/sphere-shader';
export * from './shaders/backdrop-shader';

// Visual utilities
export * from './utils/visual';

// Re-export visual-related types and constants
export type { VisualConfig } from '../shared/types';
export { VISUAL_CONFIG } from '../shared/constants';
