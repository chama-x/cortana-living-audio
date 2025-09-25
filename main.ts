/**
 * Main entry point for Cortana Living Audio application
 */

import './src/index';

// Register the main component
import { GdmLiveAudio } from './src/index';

// Ensure the component is defined
customElements.define('gdm-live-audio', GdmLiveAudio);
