/**
 * Audio processing module exports
 * Provides audio analysis, processing utilities, and worklet management
 */

// Audio processing utilities
export * from './processing/analyser';
export * from './processing/utils';

// Audio worklet paths
export { ASSET_PATHS } from '../shared/constants';

// Re-export audio-related types
export type { AudioContexts, AudioNodes, AudioDataHandler } from '../shared/types';
