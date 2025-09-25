/**
 * Shared constants for the Cortana Living Audio application
 */

// Audio configuration constants
export const AUDIO_CONFIG = {
  INPUT_SAMPLE_RATE: 16000,
  OUTPUT_SAMPLE_RATE: 24000,
  BUFFER_SIZE: 2048,
  MAX_LATENCY_MS: 1000,
  ENHANCEMENT_OVERHEAD_MS: 300
} as const;

// Visual configuration constants
export const VISUAL_CONFIG = {
  TARGET_FPS: 60,
  ANALYSIS_BUFFER_SIZE: 32,
  UNIFORM_UPDATE_RATE: 16, // ms
  BLOOM_INTENSITY: 1.2
} as const;

// AI personality constants
export const AI_CONFIG = {
  MAX_TOKEN_COUNT: 400,
  TARGET_WORD_COUNT: 275,
  QUALITY_THRESHOLD: 7.0,
  MAX_REFINEMENT_CYCLES: 2
} as const;

// API configuration
export const API_CONFIG = {
  GEMINI_MODEL: 'gemini-2.5-flash-preview-native-audio-dialog',
  VOICE_NAME: 'Leda',
  RESPONSE_MODALITIES: ['AUDIO'] as const
} as const;

// File paths for worklets and assets
export const ASSET_PATHS = {
  MIC_WORKLET: '/src/audio/worklets/mic-worklet-processor.js',
  HDR_TEXTURE: '/piz_compressed.exr'
} as const;
