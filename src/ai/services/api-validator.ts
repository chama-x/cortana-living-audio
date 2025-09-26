/**
 * API validation service for reliable quota and connectivity testing
 * Browser-compatible implementation using direct API calls
 */

import { log, LogModule } from '../../shared/utils';

export interface ApiValidationResult {
  isValid: boolean;
  provider: string;
  error?: string;
  quotaExceeded?: boolean;
  latency?: number;
}

export interface ApiProviderConfig {
  name: string;
  model: string;
  apiKey: string;
  supportedFeatures?: ('text' | 'audio' | 'vision')[];
}

/**
 * Browser-compatible API Validator for testing provider availability and quota status
 */
export class ApiValidator {
  private readonly testContent = 'Respond with just "OK" to confirm API connectivity.';

  /**
   * Test Gemini API availability and quota status
   */
  async validateGeminiApi(apiKey: string): Promise<ApiValidationResult> {
    const startTime = performance.now();
    
    try {
      log.debug(LogModule.SESSION, 'Testing Gemini API connectivity', 'validateGeminiApi');
      
      if (!apiKey || apiKey.trim() === '') {
        throw new Error('No API key provided');
      }

      // Prefer env-defined validation model; fallback to a stable public text model
      const preferredModel = (process.env.GEMINI_VALIDATION_MODEL || '').trim();
      const candidateModels = [
        preferredModel,
        'gemini-1.5-flash-latest'
      ].filter(Boolean);

      let lastError: Error | null = null;

      for (const model of candidateModels) {
        try {
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-goog-api-key': apiKey
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: this.testContent }] }],
              generationConfig: { maxOutputTokens: 10, temperature: 0 }
            })
          });

          const latency = performance.now() - startTime;

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
            // If 404, try next candidate model
            if (response.status === 404) {
              lastError = new Error(`HTTP 404 on model ${model}: ${errorData.error?.message || response.statusText}`);
              continue;
            }
            throw new Error(`HTTP ${response.status}: ${errorData.error?.message || response.statusText}`);
          }

          const data = await response.json();
          const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';

          log.debug(LogModule.SESSION, 'Gemini API test successful', 'validateGeminiApi', {
            model,
            latency: `${latency.toFixed(2)}ms`,
            response: responseText.substring(0, 50)
          });

          return {
            isValid: true,
            provider: 'gemini',
            latency
          };
        } catch (innerErr: any) {
          lastError = innerErr instanceof Error ? innerErr : new Error(String(innerErr));
        }
      }

      // If all candidates failed, throw the last error to be handled below
      throw lastError || new Error('Unknown validation error');
      
    } catch (error: any) {
      const latency = performance.now() - startTime;
      
      log.warn(LogModule.SESSION, 'Gemini API test failed', 'validateGeminiApi', {
        latency: `${latency.toFixed(2)}ms`,
        error: error.message
      });

      // Check for quota exceeded errors
      const isQuotaError = this.isQuotaExceededError(error);
      
      return {
        isValid: false,
        provider: 'gemini',
        error: error.message,
        quotaExceeded: isQuotaError,
        latency
      };
    }
  }

  /**
   * Test multiple providers and return the best available option
   */
  async findBestAvailableProvider(configs: ApiProviderConfig[]): Promise<ApiValidationResult[]> {
    log.info(LogModule.SESSION, 'Testing multiple API providers', 'findBestAvailableProvider', {
      providerCount: configs.length,
      providers: configs.map(c => c.name)
    });

    const results = await Promise.allSettled(
      configs.map(config => this.validateProvider(config))
    );

    const validationResults: ApiValidationResult[] = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          isValid: false,
          provider: configs[index].name,
          error: result.reason?.message || 'Unknown error',
          latency: 0
        };
      }
    });

    // Sort by validity and latency
    validationResults.sort((a, b) => {
      if (a.isValid && !b.isValid) return -1;
      if (!a.isValid && b.isValid) return 1;
      if (a.isValid && b.isValid && a.latency !== undefined && b.latency !== undefined) {
        return a.latency - b.latency;
      }
      return 0;
    });

    log.info(LogModule.SESSION, 'Provider validation completed', 'findBestAvailableProvider', {
      validProviders: validationResults.filter(r => r.isValid).length,
      bestProvider: validationResults[0]?.provider,
      bestLatency: validationResults[0]?.latency
    });

    return validationResults;
  }

  /**
   * Validate a specific provider configuration
   */
  private async validateProvider(config: ApiProviderConfig): Promise<ApiValidationResult> {
    const startTime = performance.now();
    
    try {
      log.debug(LogModule.SESSION, `Testing ${config.name} API`, 'validateProvider');
      
      // For now, only support Gemini validation in browser
      if (config.name.toLowerCase() === 'gemini') {
        return await this.validateGeminiApi(config.apiKey);
      }
      
      // For other providers, return unsupported
      return {
        isValid: false,
        provider: config.name,
        error: 'Provider validation not supported in browser environment',
        latency: performance.now() - startTime
      };
      
    } catch (error: any) {
      const latency = performance.now() - startTime;
      const isQuotaError = this.isQuotaExceededError(error);
      
      return {
        isValid: false,
        provider: config.name,
        error: error.message,
        quotaExceeded: isQuotaError,
        latency
      };
    }
  }

  /**
   * Check if error indicates quota exceeded
   */
  private isQuotaExceededError(error: any): boolean {
    const errorMessage = error.message?.toLowerCase() || '';
    
    return (
      errorMessage.includes('quota') ||
      errorMessage.includes('rate limit') ||
      errorMessage.includes('billing') ||
      errorMessage.includes('exceeded') ||
      errorMessage.includes('403') ||
      errorMessage.includes('429') ||
      errorMessage.includes('resource_exhausted') ||
      errorMessage.includes('permission_denied')
    );
  }

  /**
   * Get the appropriate environment variable name for API key
   */
  private getApiKeyEnvVar(providerName: string): string {
    const envMap: Record<string, string> = {
      'gemini': 'GEMINI_API_KEY',
      'openai': 'OPENAI_API_KEY',
      'anthropic': 'ANTHROPIC_API_KEY',
      'cohere': 'COHERE_API_KEY',
      'replicate': 'REPLICATE_API_TOKEN'
    };
    
    return envMap[providerName.toLowerCase()] || `${providerName.toUpperCase()}_API_KEY`;
  }

  /**
   * Quick connectivity test for current Gemini setup
   */
  async quickGeminiTest(): Promise<boolean> {
    try {
      const result = await this.validateGeminiApi(process.env.GEMINI_API_KEY || '');
      return result.isValid;
    } catch {
      return false;
    }
  }
}

/**
 * Default configurations for popular providers
 */
export const DEFAULT_PROVIDER_CONFIGS: ApiProviderConfig[] = [
  {
    name: 'gemini',
    model: 'gemini-1.5-flash',
    apiKey: process.env.GEMINI_API_KEY || '',
    supportedFeatures: ['text', 'vision']
  },
  {
    name: 'openai',
    model: 'gpt-3.5-turbo',
    apiKey: process.env.OPENAI_API_KEY || '',
    supportedFeatures: ['text']
  },
  {
    name: 'anthropic',
    model: 'claude-3-haiku-20240307',
    apiKey: process.env.ANTHROPIC_API_KEY || '',
    supportedFeatures: ['text']
  }
];

// Singleton instance
export const apiValidator = new ApiValidator();
