/**
 * AI personality and interaction module exports
 * Provides enhanced personality framework and conversation management
 */

// AI personality system
export * from './personality/enhanced-personality';

// Re-export AI-related types and constants
export type { ConversationContext } from '../shared/types';
export { AI_CONFIG, API_CONFIG } from '../shared/constants';
