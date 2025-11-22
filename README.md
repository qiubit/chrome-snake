# Snake Game - Chrome Extension

A fun and classic Snake game that you can play right in your Chrome browser! Click the extension icon to start playing anytime.

## Features

- Classic Snake gameplay
- Score tracking with high score persistence
- Smooth animations and colorful design
- Keyboard controls (Arrow keys or WASD)
- Increasing difficulty as you score more points
- Game over screen with restart option

## Installation

### Install from Source

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" by toggling the switch in the top right corner
4. Click "Load unpacked" button
5. Select the `chrome-snake` directory
6. The Snake Game extension icon should now appear in your Chrome toolbar

## How to Play

1. Click the Snake Game extension icon in your Chrome toolbar
2. Use the arrow keys or WASD to control the snake's direction:
   - Up Arrow or W: Move up
   - Down Arrow or S: Move down
   - Left Arrow or A: Move left
   - Right Arrow or D: Move right
3. Eat the red food circles to grow your snake and increase your score
4. Avoid hitting the walls or your own tail
5. Try to beat your high score!

## Game Controls

- **Arrow Keys** or **WASD**: Control snake direction
- **Restart Button**: Start a new game
- **Play Again**: Restart after game over

## Files

- `manifest.json`: Chrome extension configuration
- `popup.html`: Game interface structure
- `popup.css`: Styling for the game
- `game.js`: Snake game logic and controls
- `icon.png`: Extension icon

## Technical Details

- Built with vanilla JavaScript (no frameworks required)
- Uses HTML5 Canvas for rendering
- LocalStorage for high score persistence
- Responsive design optimized for extension popup

## License

See LICENSE file for details.
