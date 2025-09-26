/**
 * Centralized Logging System for Cortana Living Audio
 * Provides contextual, timestamped logging with module separation
 */

// Log levels for filtering and importance
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4
}

// Module categories for organized logging
export enum LogModule {
  CORE = 'CORE',
  AUDIO = 'AUDIO',
  VISUALS = 'VISUALS',
  AI = 'AI',
  SESSION = 'SESSION',
  WORKLET = 'WORKLET',
  PERSONALITY = 'PERSONALITY'
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  module: LogModule;
  context?: string;
  message: string;
  data?: any;
  error?: Error;
}

class Logger {
  private static instance: Logger;
  private logLevel: LogLevel = LogLevel.DEBUG;
  private enabledModules: Set<LogModule> = new Set(Object.values(LogModule));
  private logHistory: LogEntry[] = [];
  private maxHistorySize = 1000;

  private constructor() {
    // Set log level based on environment
    this.logLevel = process.env.NODE_ENV === 'development' ? LogLevel.TRACE : LogLevel.INFO;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Configure logging system
   */
  public configure(options: {
    level?: LogLevel;
    modules?: LogModule[];
    maxHistory?: number;
  }): void {
    if (options.level !== undefined) {
      this.logLevel = options.level;
    }
    if (options.modules !== undefined) {
      this.enabledModules = new Set(options.modules);
    }
    if (options.maxHistory !== undefined) {
      this.maxHistorySize = options.maxHistory;
    }
  }

  /**
   * Main logging method
   */
  private log(
    level: LogLevel,
    module: LogModule,
    message: string,
    context?: string,
    data?: any,
    error?: Error
  ): void {
    // Filter by log level and enabled modules
    if (level > this.logLevel || !this.enabledModules.has(module)) {
      return;
    }

    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      module,
      context,
      message,
      data,
      error
    };

    // Add to history
    this.logHistory.push(logEntry);
    if (this.logHistory.length > this.maxHistorySize) {
      this.logHistory.shift();
    }

    // Console output with formatting
    this.outputToConsole(logEntry);
  }

  /**
   * Format and output to console
   */
  private outputToConsole(entry: LogEntry): void {
    const levelColors = {
      [LogLevel.ERROR]: '\x1b[31m', // Red
      [LogLevel.WARN]: '\x1b[33m',  // Yellow
      [LogLevel.INFO]: '\x1b[36m',  // Cyan
      [LogLevel.DEBUG]: '\x1b[32m', // Green
      [LogLevel.TRACE]: '\x1b[90m'  // Gray
    };

    const levelNames = {
      [LogLevel.ERROR]: 'ERROR',
      [LogLevel.WARN]: 'WARN ',
      [LogLevel.INFO]: 'INFO ',
      [LogLevel.DEBUG]: 'DEBUG',
      [LogLevel.TRACE]: 'TRACE'
    };

    const reset = '\x1b[0m';
    const bold = '\x1b[1m';
    const time = entry.timestamp.split('T')[1].split('.')[0];
    
    const color = levelColors[entry.level];
    const levelName = levelNames[entry.level];
    const context = entry.context ? ` [${entry.context}]` : '';
    
    const prefix = `${color}${time} ${levelName}${reset} ${bold}${entry.module}${reset}${context}:`;
    
    // Choose appropriate console method
    const consoleMethod = entry.level <= LogLevel.ERROR ? console.error :
                         entry.level <= LogLevel.WARN ? console.warn :
                         console.log;

    if (entry.error) {
      consoleMethod(`${prefix} ${entry.message}`, entry.error);
      if (entry.data) {
        console.log('  Data:', entry.data);
      }
    } else if (entry.data) {
      consoleMethod(`${prefix} ${entry.message}`, entry.data);
    } else {
      consoleMethod(`${prefix} ${entry.message}`);
    }
  }

  /**
   * Public logging methods
   */
  public error(module: LogModule, message: string, context?: string, data?: any, error?: Error): void {
    this.log(LogLevel.ERROR, module, message, context, data, error);
  }

  public warn(module: LogModule, message: string, context?: string, data?: any): void {
    this.log(LogLevel.WARN, module, message, context, data);
  }

  public info(module: LogModule, message: string, context?: string, data?: any): void {
    this.log(LogLevel.INFO, module, message, context, data);
  }

  public debug(module: LogModule, message: string, context?: string, data?: any): void {
    this.log(LogLevel.DEBUG, module, message, context, data);
  }

  public trace(module: LogModule, message: string, context?: string, data?: any): void {
    this.log(LogLevel.TRACE, module, message, context, data);
  }

  /**
   * Specialized logging for performance tracking
   */
  public performance(module: LogModule, operation: string, startTime: number, context?: string): void {
    const duration = performance.now() - startTime;
    const message = `${operation} completed in ${duration.toFixed(2)}ms`;
    
    if (duration > 1000) {
      this.warn(module, message, context);
    } else if (duration > 500) {
      this.info(module, message, context);
    } else {
      this.debug(module, message, context);
    }
  }

  /**
   * Audio-specific logging helpers
   */
  public audioEvent(event: string, context?: string, data?: any): void {
    this.info(LogModule.AUDIO, `Audio Event: ${event}`, context, data);
  }

  public sessionEvent(event: string, context?: string, data?: any): void {
    this.info(LogModule.SESSION, `Session Event: ${event}`, context, data);
  }

  /**
   * Get recent logs for debugging
   */
  public getRecentLogs(count: number = 50): LogEntry[] {
    return this.logHistory.slice(-count);
  }

  /**
   * Get logs filtered by module and level
   */
  public getFilteredLogs(module?: LogModule, level?: LogLevel, count: number = 50): LogEntry[] {
    let filtered = this.logHistory;
    
    if (module) {
      filtered = filtered.filter(entry => entry.module === module);
    }
    
    if (level !== undefined) {
      filtered = filtered.filter(entry => entry.level <= level);
    }
    
    return filtered.slice(-count);
  }

  /**
   * Clear log history
   */
  public clearHistory(): void {
    this.logHistory = [];
    this.info(LogModule.CORE, 'Log history cleared');
  }

  /**
   * Export logs for debugging
   */
  public exportLogs(): string {
    return JSON.stringify(this.logHistory, null, 2);
  }
}

// Singleton instance
export const logger = Logger.getInstance();

// Convenience functions for direct import
export const log = {
  error: (module: LogModule, message: string, context?: string, data?: any, error?: Error) => 
    logger.error(module, message, context, data, error),
  
  warn: (module: LogModule, message: string, context?: string, data?: any) => 
    logger.warn(module, message, context, data),
  
  info: (module: LogModule, message: string, context?: string, data?: any) => 
    logger.info(module, message, context, data),
  
  debug: (module: LogModule, message: string, context?: string, data?: any) => 
    logger.debug(module, message, context, data),
  
  trace: (module: LogModule, message: string, context?: string, data?: any) => 
    logger.trace(module, message, context, data),
  
  performance: (module: LogModule, operation: string, startTime: number, context?: string) =>
    logger.performance(module, operation, startTime, context),
  
  audioEvent: (event: string, context?: string, data?: any) =>
    logger.audioEvent(event, context, data),
  
  sessionEvent: (event: string, context?: string, data?: any) =>
    logger.sessionEvent(event, context, data)
};

// Performance timing helper
export function timeOperation<T>(
  module: LogModule,
  operation: string,
  fn: () => T,
  context?: string
): T {
  const startTime = performance.now();
  const result = fn();
  logger.performance(module, operation, startTime, context);
  return result;
}

// Async performance timing helper
export async function timeAsyncOperation<T>(
  module: LogModule,
  operation: string,
  fn: () => Promise<T>,
  context?: string
): Promise<T> {
  const startTime = performance.now();
  const result = await fn();
  logger.performance(module, operation, startTime, context);
  return result;
}
