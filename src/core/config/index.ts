/**
 * Application configuration
 */

import { AUDIO_CONFIG, API_CONFIG } from '../../shared/constants';

export const appConfig = {
  audio: AUDIO_CONFIG,
  api: API_CONFIG,
  environment: {
    apiKey: process.env.GEMINI_API_KEY || '',
    isDevelopment: process.env.NODE_ENV === 'development'
  }
} as const;

export type AppConfig = typeof appConfig;
