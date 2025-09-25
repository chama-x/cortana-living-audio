/**
 * Main application entry point
 * Cortana Living Audio - Enhanced AI Personality with 3D Visuals
 */

// Core application component
export { default as GdmLiveAudio } from './core/app/GdmLiveAudio';

// Module exports for external use
export * from './audio';
export * from './visuals';
export * from './ai';
export * from './shared/types';
export * from './shared/constants';

// Styles
import './assets/styles/index.css';
