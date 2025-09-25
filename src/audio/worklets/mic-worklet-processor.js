/*
 * Minimal microphone AudioWorklet processor
 * - Reads mono input from channel 0
 * - Posts Float32Array chunks to the main thread
 */
class MicProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this._downsampleFactor = 1; // keep at 1; upstream context is 16kHz already
  }

  process(inputs) {
    const input = inputs[0];
    if (!input || input.length === 0) return true;

    const channel = input[0];
    if (!channel || channel.length === 0) return true;

    // Copy to a new Float32Array to avoid transferring the internal buffer
    const frameCount = Math.floor(channel.length / this._downsampleFactor);
    const out = new Float32Array(frameCount);
    if (this._downsampleFactor === 1) {
      out.set(channel);
    } else {
      for (let i = 0, j = 0; i < channel.length; i += this._downsampleFactor, j++) {
        out[j] = channel[i];
      }
    }

    this.port.postMessage(out);
    return true; // keep processor alive
  }
}

registerProcessor('mic-processor', MicProcessor);
