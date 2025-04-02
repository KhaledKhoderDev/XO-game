# X-O Game

A simple and interactive implementation of the classic Tic-Tac-Toe (X-O) game with a twist. The game allows two players (X and O) to compete, and it includes AI for player O. The game is designed to be played in the browser and includes features like score tracking, language selection (English and Arabic), and a responsive user interface.

## Features

- **Language Selection:** The game supports two languages: English and Arabic. You can switch between languages from the UI.
- **AI Player (O):** The game includes a basic AI that plays as player O using the Minimax algorithm.
- **Score Tracking:** The game keeps track of the score for both players (X and O).
- **Responsive Design:** The game layout adjusts to different screen sizes, ensuring it works well on both desktops and mobile devices.

## Technologies Used

- **HTML** for structure and content
- **CSS** for styling (Responsive Design, Grid Layout)
- **JavaScript** for game logic and interactivity

## Game Setup

1. Clone the repository or download the files. git clone https://github.com/KhaledKhoderDev/XO-game
2. Open `index.html` in your browser to start the game.
3. Use the "Start New Game" button to begin a new match.
4. Select your preferred language using the "Language" dropdown (English/Arabic).
5. Play against the computer by clicking on the cells of the game board.

## Game Rules

1. Players take turns marking a cell with their symbol (`X` or `O`).
2. The player who first gets three of their symbols in a row (horizontally, vertically, or diagonally) wins.
3. If all cells are filled and no one wins, the game ends in a draw.
4. The game allows players to reset and start a new match anytime.

## Game Controls

- **Start New Game:** Begins a new game.
- **Reset Game:** Resets the game board .
- **Play Again:** Available after a win or draw to restart the game.

## Game Logic

- The game board is a 3x3 grid.
- Player X starts first, followed by player O.
- The AI (Player O) makes its move based on the Minimax algorithm, evaluating potential moves to maximize its chances of winning.
- The game ends when either player wins or when all cells are filled (draw).

## User Interface

- The game features a minimalist interface with a clean layout, color-coded cells, and a message popup that displays the result (win or draw).
- The language selector is placed at the top left corner for easy access.

## How to Play

1. Click on any empty cell to make your move if you're playing as X.
2. The computer will automatically make its move as O.
3. Keep playing until there is a winner or the game ends in a draw.

## Installation

1. Clone or download the repository to your local machine.
2. Open the `index.html` file in your browser to start playing.

```bash
git clone https://github.com/khaledkhoderdev/XO-game.git
cd xo-game
open index.html
