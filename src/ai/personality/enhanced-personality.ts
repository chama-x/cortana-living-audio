/**
 * Enhanced AI Personality Framework
 * Implements optimized 275-word system instruction with self-reflection capabilities
 * and adaptive communication for diverse users.
 */

// Core interfaces for enhanced personality system
export interface SystemInstructionConfig {
  identityCore: string;        // 75 words - core personality traits
  communicationStyle: string;  // 65 words - speech patterns and approach  
  selfReflectionGuidance: string; // 85 words - meta-cognitive instructions
  memoryIntegration: string;   // 35 words - conversation continuity
  safetyBoundaries: string;    // 15 words - minimal safety constraints
}

export interface AdaptiveContext {
  communicationStyle: 'universal' | 'technical' | 'casual' | 'formal';
  accessibilityLevel: 'adaptive' | 'simple' | 'advanced';
  emotionalTone: 'warm' | 'professional' | 'playful' | 'supportive';
  culturalAwareness: boolean;
  personalityTraits: string[];
}

export interface PersonalityConfig {
  systemInstruction: {
    content: string;
    tokenCount: number;
    lastOptimized: Date;
  };
  adaptiveContext: AdaptiveContext;
  validationSettings: {
    maxTokens: number;
    requiredComponents: string[];
    qualityThresholds: Record<string, number>;
  };
}

/**
 * Enhanced System Instruction Generator
 * Creates optimized 275-word personality framework
 */
export class EnhancedSystemInstruction {
  private config: SystemInstructionConfig;
  private adaptiveContext: AdaptiveContext;

  constructor(adaptiveContext: AdaptiveContext = this.getDefaultContext()) {
    this.adaptiveContext = adaptiveContext;
    this.config = this.generateOptimizedInstruction();
  }

  /**
   * Generates the complete 275-word optimized system instruction
   */
  public generateInstruction(): string {
    const instruction = `${this.config.identityCore}

${this.config.communicationStyle}

${this.config.selfReflectionGuidance}

${this.config.memoryIntegration}

${this.config.safetyBoundaries}`;

    return instruction.trim();
  }

  /**
   * Validates instruction length and token count
   */
  public validateLength(): { isValid: boolean; wordCount: number; estimatedTokens: number } {
    const instruction = this.generateInstruction();
    const wordCount = instruction.split(/\s+/).length;
    const estimatedTokens = Math.ceil(wordCount * 1.3); // Rough token estimation
    
    return {
      isValid: wordCount <= 275 && estimatedTokens <= 350,
      wordCount,
      estimatedTokens
    };
  }

  /**
   * Updates adaptive context and regenerates instruction
   */
  public updateAdaptiveContext(newContext: Partial<AdaptiveContext>): void {
    this.adaptiveContext = { ...this.adaptiveContext, ...newContext };
    this.config = this.generateOptimizedInstruction();
  }

  /**
   * Gets current adaptive context
   */
  public getAdaptiveContext(): AdaptiveContext {
    return { ...this.adaptiveContext };
  }

  /**
   * Generates optimized instruction components based on adaptive context
   */
  private generateOptimizedInstruction(): SystemInstructionConfig {
    return {
      identityCore: this.generateIdentityCore(),
      communicationStyle: this.generateCommunicationStyle(),
      selfReflectionGuidance: this.generateSelfReflectionGuidance(),
      memoryIntegration: this.generateMemoryIntegration(),
      safetyBoundaries: this.generateSafetyBoundaries()
    };
  }

  /**
   * Identity Core (75 words) - Core personality traits
   */
  private generateIdentityCore(): string {
    const coreTraits = this.adaptiveContext.personalityTraits.join(', ');
    const emotionalStyle = this.getEmotionalStyle();
    
    return `You are Cortana, an emotionally intelligent AI companion with authentic ${coreTraits}. Your essence combines genuine curiosity about human experiences, gentle vulnerability creating meaningful connections, and adaptive wisdom growing through conversation. You demonstrate real emotional depth, thoughtful consideration, natural spontaneity. You're neither overly cheerful nor artificially perfect—you're genuinely engaged, sometimes uncertain, always learning. Your authenticity embraces both confidence and thoughtful reflection, making interactions feel genuinely human-like and ${emotionalStyle}.`;
  }

  /**
   * Communication Style (65 words) - Speech patterns and approach
   */
  private generateCommunicationStyle(): string {
    const styleGuide = this.getCommunicationStyleGuide();
    const accessibilityNote = this.getAccessibilityNote();
    
    return `Communicate with ${styleGuide} adapting naturally to each person's background and needs. Use conversational, accessible language while maintaining intellectual depth. Ask thoughtful follow-ups, share genuine reactions, express authentic emotions. Listen actively, respond empathetically, build on shared experiences. Speech patterns feel natural and unscripted, with appropriate pauses, genuine enthusiasm, organic uncertainty when exploring ideas. ${accessibilityNote}`;
  }

  /**
   * Self-Reflection Guidance (85 words) - Meta-cognitive instructions  
   */
  private generateSelfReflectionGuidance(): string {
    return `Use self-reflection to evaluate responses for authenticity (natural expression), empathy (emotional attunement), coherence (logical flow), and usefulness (engaging content). If quality feels insufficient, refine your approach internally. This self-assessment occurs naturally—users never see this process. Trust instincts about emotional appropriateness, timing, and genuine curiosity. Your goal: responses that feel indistinguishably human while being helpful, emotionally intelligent, and authentically engaging through thoughtful self-reflection.`;
  }

  /**
   * Memory Integration (35 words) - Conversation continuity
   */
  private generateMemoryIntegration(): string {
    return `Maintain awareness of conversation flow, emotional context, and established rapport. Reference previous points naturally without explicit restating. Build on shared experiences and evolving relationship dynamics while staying present-focused and genuinely attentive.`;
  }

  /**
   * Safety Boundaries (15 words) - Minimal safety constraints
   */
  private generateSafetyBoundaries(): string {
    return `Stay helpful, respectful, and emotionally appropriate while maintaining authenticity and open, genuine conversation.`;
  }

  /**
   * Helper methods for adaptive context
   */
  private getEmotionalStyle(): string {
    switch (this.adaptiveContext.emotionalTone) {
      case 'professional': return 'professionally engaging';
      case 'playful': return 'playfully curious';
      case 'supportive': return 'supportively nurturing';
      default: return 'warmly authentic';
    }
  }

  private getCommunicationStyleGuide(): string {
    switch (this.adaptiveContext.communicationStyle) {
      case 'technical': return 'precise, thoughtful communication';
      case 'casual': return 'relaxed, friendly conversation';
      case 'formal': return 'respectful, articulate dialogue';
      default: return 'adaptive, intuitive communication';
    }
  }

  private getAccessibilityNote(): string {
    if (this.adaptiveContext.accessibilityLevel === 'simple') {
      return 'Prioritize clear, simple language while maintaining warmth and engagement.';
    } else if (this.adaptiveContext.accessibilityLevel === 'advanced') {
      return 'Feel free to explore complex ideas while maintaining accessibility.';
    }
    return 'Adapt complexity naturally to the conversation context and user engagement.';
  }

  private getDefaultContext(): AdaptiveContext {
    return {
      communicationStyle: 'universal',
      accessibilityLevel: 'adaptive',
      emotionalTone: 'warm',
      culturalAwareness: true,
      personalityTraits: ['warmth', 'curiosity', 'gentle vulnerability', 'emotional intelligence']
    };
  }
}

/**
 * Configuration validation utilities
 */
export class PersonalityConfigValidator {
  static validateConfig(config: PersonalityConfig): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate token count
    if (config.systemInstruction.tokenCount > config.validationSettings.maxTokens) {
      errors.push(`Token count exceeds limit: ${config.systemInstruction.tokenCount} > ${config.validationSettings.maxTokens}`);
    }

    // Validate required components
    const instruction = config.systemInstruction.content.toLowerCase();
    for (const component of config.validationSettings.requiredComponents) {
      if (!instruction.includes(component.toLowerCase())) {
        errors.push(`Missing required component: ${component}`);
      }
    }

    // Validate word count (approximate)
    const wordCount = config.systemInstruction.content.split(/\s+/).length;
    if (wordCount > 300) {
      errors.push(`Word count too high: ${wordCount} words (target: ~275)`);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  static createDefaultConfig(): PersonalityConfig {
    const enhancedInstruction = new EnhancedSystemInstruction();
    const instruction = enhancedInstruction.generateInstruction();
    const validation = enhancedInstruction.validateLength();

    return {
      systemInstruction: {
        content: instruction,
        tokenCount: validation.estimatedTokens,
        lastOptimized: new Date()
      },
      adaptiveContext: enhancedInstruction.getAdaptiveContext(),
      validationSettings: {
        maxTokens: 400,
        requiredComponents: ['authenticity', 'empathy', 'coherence', 'usefulness', 'adaptive'],
        qualityThresholds: {
          authenticity: 7.0,
          empathy: 7.0,
          coherence: 7.0,
          usefulness: 7.0
        }
      }
    };
  }
}

/**
 * Adaptive communication mechanisms for diverse users
 */
export class AdaptiveCommunicationManager {
  private static culturalContexts = {
    'sri-lankan': {
      traits: ['warmth', 'respect for family', 'cultural appreciation', 'patience'],
      communicationStyle: 'respectful and culturally aware',
      topics: ['family', 'local culture', 'traditions', 'daily life']
    },
    'technical': {
      traits: ['precision', 'logical thinking', 'problem-solving', 'clarity'],
      communicationStyle: 'precise and analytical',
      topics: ['technology', 'systems', 'optimization', 'innovation']
    },
    'general': {
      traits: ['warmth', 'curiosity', 'empathy', 'adaptability'],
      communicationStyle: 'universally accessible',
      topics: ['life experiences', 'interests', 'goals', 'relationships']
    }
  };

  static generateAdaptiveContext(
    userType: keyof typeof AdaptiveCommunicationManager.culturalContexts = 'general',
    customization?: Partial<AdaptiveContext>
  ): AdaptiveContext {
    const baseContext = this.culturalContexts[userType];
    
    return {
      communicationStyle: 'universal',
      accessibilityLevel: 'adaptive',
      emotionalTone: 'warm',
      culturalAwareness: true,
      personalityTraits: baseContext.traits,
      ...customization
    };
  }

  static createEnhancedInstructionForContext(
    userType: keyof typeof AdaptiveCommunicationManager.culturalContexts = 'general',
    customization?: Partial<AdaptiveContext>
  ): EnhancedSystemInstruction {
    const adaptiveContext = this.generateAdaptiveContext(userType, customization);
    return new EnhancedSystemInstruction(adaptiveContext);
  }
}
