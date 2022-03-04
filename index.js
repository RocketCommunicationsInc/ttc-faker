import { generateAlert } from "./alerts.js";
import { generateStatusData } from "./status.js";

function generateStatus() {
  const statues = [
    'alert',
    'serious',
    'caution',
    'off',
    'standby',
  ];

  return statues[Math.floor(Math.random() * statues.length)];
}

let _frameCount = 0;

function generateSystemHealth() {
  _frameCount++;

  return {
    'systems': {
      'lock': {
        'status': generateStatus(),
        'value': parseInt(Math.random() * -100),
        'signalStrength': (Math.random() * -100).toFixed(1),
      },
      'telemetry': {
        'status': generateStatus(),
        'value': parseInt(Math.random() * -100),
        'frameCount': _frameCount,
      },
      'vcc': {
        'status': generateStatus(),
        'value': _frameCount,
        'badCommandCount': 0,
      },
    },
    'subsystems': {
      'attitude': {
        'status': 'caution',
      },
      'payload': {
        'status': generateStatus(),
      },
      'power': {
        'status': generateStatus(),
      },
      'propulsion': {
        'status': generateStatus(),
      },
      'thermal': {
        'status': generateStatus(),
      },
    },
  };
}

export { generateStatus, generateSystemHealth, generateStatusData, generateAlert };
