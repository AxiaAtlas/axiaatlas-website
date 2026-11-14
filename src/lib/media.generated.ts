// Written by scripts/build-media.mjs (npm run media). Do not edit by hand.
export const SHOTS = {
  "theia-home": {
    "w": 6240,
    "h": 3512,
    "widths": [
      960,
      1600,
      2400
    ],
    "alt": "Theia’s home screen: a greeting, the Ask Theia composer and four suggested questions."
  },
  "theia-thinking": {
    "w": 6240,
    "h": 3512,
    "widths": [
      960,
      1600,
      2400
    ],
    "alt": "Theia thinking through a question, each step listed as she works."
  },
  "theia-answer": {
    "w": 6240,
    "h": 3512,
    "widths": [
      960,
      1600,
      2400
    ],
    "alt": "A finished answer in Theia: what changed, recommended next steps, and follow-up questions."
  },
  "theia-deck": {
    "w": 6240,
    "h": 3512,
    "widths": [
      960,
      1600,
      2400
    ],
    "alt": "A six-slide report built by Theia, open in the slide editor beside the chat."
  },
  "theia-comment": {
    "w": 6240,
    "h": 3512,
    "widths": [
      960,
      1600,
      2400
    ],
    "alt": "A comment left on a slide, sent to Theia to revise."
  },
  "theia-library": {
    "w": 6240,
    "h": 3512,
    "widths": [
      960,
      1600,
      2400
    ],
    "alt": "The Library: every slideshow, spreadsheet and chart Theia has built, in one place."
  },
  "theia-scheduled": {
    "w": 6240,
    "h": 3512,
    "widths": [
      960,
      1600,
      2400
    ],
    "alt": "Scheduled tasks: weekly and monthly reports Theia runs on their own."
  },
  "cu-greeting": {
    "w": 2800,
    "h": 1575,
    "widths": [
      800,
      1200,
      1800
    ],
    "alt": "The Theia mark above the greeting on her home screen."
  },
  "cu-thinking-steps": {
    "w": 2480,
    "h": 1395,
    "widths": [
      800,
      1200,
      1800
    ],
    "alt": "Theia’s thinking steps, each one checked off as it completes."
  }
} as const

export type ShotId = keyof typeof SHOTS
