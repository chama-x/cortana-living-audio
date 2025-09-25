/**
 * Shared TypeScript interfaces and types for the Cortana Living Audio application
 */

// Audio-related types
export interface AudioContexts {
  input: AudioContext;
  output: AudioContext;
}

export interface AudioNodes {
  input: GainNode;
  output: GainNode;
  source?: MediaStreamAudioSourceNode;
  worklet?: AudioWorkletNode;
}

// Visual-related types
export interface VisualConfig {
  canvas?: HTMLCanvasElement;
  context?: WebGL2RenderingContext;
  uniforms?: Record<string, any>;
}

// AI personality types (re-exported from AI module)
export interface ConversationContext {
  emotionalTone: string;
  topics: string[];
  rapport: number;
  sessionDuration: number;
}

export interface SessionState {
  isActive: boolean;
  isRecording: boolean;
  error?: string;
  status: string;
}

// Common utility types
export type ErrorHandler = (error: Error) => void;
export type StatusUpdateHandler = (status: string) => void;
export type AudioDataHandler = (data: Float32Array) => void;
