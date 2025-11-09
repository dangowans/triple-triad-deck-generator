# Triple Triad Deck Generator

A way to generate a deck of cards for the Triple Triad card game.

[Game Rules](./GAME-RULES.md)

## Features

- Generate random Triple Triad cards with 4 numbers (top, left, right, bottom) between 1-9
- **Six difficulty levels** with different card strength totals:
  - Level 1: Numbers sum to 12-13
  - Level 2: Numbers sum to 14-15
  - Level 3: Numbers sum to 16-17
  - Level 4: Numbers sum to 18-19
  - Level 5: Numbers sum to 20-21
  - Level 6: Numbers sum to 22-23
- Level indicator displayed in the center of each card (e.g., "L2" for Level 2)
- Support for elemental cards (fire 🔥, water 💧, wind 🌪️, earth 🌍)
- Customize the number of total cards and elemental cards
- All generated cards are unique
- Print-friendly layout for physical card creation

## How to Use

1. Open `index.html` in a web browser
2. Set the number of total cards you want to generate (9-45)
3. Set the number of elemental cards (0 to total cards)
4. Select the card level (1-6) to determine card strength
5. Cards will automatically regenerate when you change these values
6. Click "Regenerate Cards" to manually create a new set of random cards
7. Click "Print Cards" to print the cards

## Card Rules

- Each card has 4 numbers positioned at the top, left, right, and bottom
- All numbers are between 1 and 9
- The 4 numbers on each card sum to a value based on the selected level:
  - Level 1: 12-13
  - Level 2: 14-15
  - Level 3: 16-17
  - Level 4: 18-19
  - Level 5: 20-21
  - Level 6: 22-23
- Each card displays its level in the center (e.g., "L2" for Level 2)
- Elemental cards display their element symbol in all four corners
- Available elements: fire, water, wind, earth

## Traditional Element Cycle

In Triple Triad, elemental cards have advantages when placed next to cards of certain elements:

| Element | Strong Against | Weak Against |
| ------- | -------------- | ------------ |
| Fire 🔥 | Wind 🌪️       | Water 💧     |
| Water 💧 | Fire 🔥       | Earth 🌍     |
| Earth 🌍 | Water 💧      | Wind 🌪️     |
| Wind 🌪️ | Earth 🌍      | Fire 🔥      |

## Technical Details

- Pure HTML, CSS, and JavaScript - no dependencies required
- Responsive design that works on desktop and mobile
- Print-optimized CSS for creating physical cards
- Cards are guaranteed to be unique within a generated set
