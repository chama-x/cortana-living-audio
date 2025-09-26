/**
 * Debug Console Helper for Cortana Living Audio
 * Provides easy access to logs and debugging tools in development
 */

import { logger, LogLevel, LogModule } from './logger';

// Global debug helper for browser console access
declare global {
  interface Window {
    cortanaDebug: {
      // Logger access
      logs: typeof logger;
      setLogLevel: (level: LogLevel) => void;
      
      // Quick log retrieval
      getRecentLogs: (count?: number) => any[];
      getAudioLogs: (count?: number) => any[];
      getSessionLogs: (count?: number) => any[];
      getErrorLogs: (count?: number) => any[];
      
      // Debugging utilities
      exportLogs: () => string;
      clearLogs: () => void;
      
      // Audio debugging
      testAudioPipeline: () => void;
      getAudioState: () => any;
    };
  }
}

/**
 * Initialize debug console helpers
 */
export function initDebugConsole(): void {
  if (typeof window === 'undefined') return;

  window.cortanaDebug = {
    // Direct logger access
    logs: logger,
    setLogLevel: (level: LogLevel) => {
      logger.configure({ level });
      console.log(`🔧 Log level set to: ${LogLevel[level]}`);
    },

    // Quick log retrieval methods
    getRecentLogs: (count = 50) => {
      const logs = logger.getRecentLogs(count);
      console.table(logs.map(log => ({
        time: log.timestamp.split('T')[1].split('.')[0],
        level: LogLevel[log.level],
        module: log.module,
        context: log.context || '',
        message: log.message
      })));
      return logs;
    },

    getAudioLogs: (count = 30) => {
      const logs = logger.getFilteredLogs(LogModule.AUDIO, undefined, count);
      console.table(logs.map(log => ({
        time: log.timestamp.split('T')[1].split('.')[0],
        level: LogLevel[log.level],
        context: log.context || '',
        message: log.message,
        data: log.data
      })));
      return logs;
    },

    getSessionLogs: (count = 30) => {
      const logs = logger.getFilteredLogs(LogModule.SESSION, undefined, count);
      console.table(logs.map(log => ({
        time: log.timestamp.split('T')[1].split('.')[0],
        level: LogLevel[log.level],
        context: log.context || '',
        message: log.message,
        data: log.data
      })));
      return logs;
    },

    getErrorLogs: (count = 20) => {
      const logs = logger.getFilteredLogs(undefined, LogLevel.ERROR, count);
      console.table(logs.map(log => ({
        time: log.timestamp.split('T')[1].split('.')[0],
        module: log.module,
        context: log.context || '',
        message: log.message,
        error: log.error?.message
      })));
      return logs;
    },

    // Utilities
    exportLogs: () => {
      const logsJson = logger.exportLogs();
      console.log('📋 Logs exported to clipboard (if supported)');
      
      // Try to copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(logsJson).catch(() => {
          console.log('💾 Copy to clipboard failed, logs printed below:');
          console.log(logsJson);
        });
      } else {
        console.log('💾 Logs (copy manually):');
        console.log(logsJson);
      }
      
      return logsJson;
    },

    clearLogs: () => {
      logger.clearHistory();
      console.log('🗑️ Log history cleared');
    },

    // Audio debugging
    testAudioPipeline: () => {
      console.log('🎵 Testing audio pipeline...');
      
      // Check if component exists
      const component = document.querySelector('gdm-live-audio') as any;
      if (!component) {
        console.error('❌ GdmLiveAudio component not found');
        return;
      }

      console.log('✅ Component found:', component);
      
      // Log current state
      console.log('📊 Current state:', {
        isRecording: component.isRecording,
        status: component.status,
        error: component.error
      });

      // Check audio contexts
      if (component.inputAudioContext) {
        console.log('🎤 Input Audio Context:', {
          state: component.inputAudioContext.state,
          sampleRate: component.inputAudioContext.sampleRate
        });
      }

      if (component.outputAudioContext) {
        console.log('🔊 Output Audio Context:', {
          state: component.outputAudioContext.state,
          sampleRate: component.outputAudioContext.sampleRate
        });
      }

      console.log('💡 Use cortanaDebug.getAudioLogs() to see audio-specific logs');
    },

    getAudioState: () => {
      const component = document.querySelector('gdm-live-audio') as any;
      if (!component) {
        console.error('❌ Component not found');
        return null;
      }

      const state = {
        recording: component.isRecording,
        sessionOpen: component.sessionOpen,
        status: component.status,
        error: component.error,
        inputContext: component.inputAudioContext?.state,
        outputContext: component.outputAudioContext?.state,
        activeSources: component.sources?.size || 0
      };

      console.table(state);
      return state;
    }
  };

  // Log that debug console is ready
  console.log(`
🔧 Cortana Living Audio Debug Console Ready!

Available commands:
  cortanaDebug.getRecentLogs()     - Show recent logs
  cortanaDebug.getAudioLogs()      - Show audio-specific logs  
  cortanaDebug.getSessionLogs()    - Show session logs
  cortanaDebug.getErrorLogs()      - Show error logs
  cortanaDebug.testAudioPipeline() - Test audio system
  cortanaDebug.getAudioState()     - Get current audio state
  cortanaDebug.setLogLevel(level)  - Set log level (0=ERROR, 4=TRACE)
  cortanaDebug.exportLogs()        - Export all logs
  cortanaDebug.clearLogs()         - Clear log history

Example: cortanaDebug.getAudioLogs(10)
  `);
}
