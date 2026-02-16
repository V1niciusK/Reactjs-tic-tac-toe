# React Dev's Tic Tac Toe

> Done for now

This repo is based on React.dev's [tic-tac-toe tutorial](https://react.dev/learn/tutorial-tic-tac-toe).

I've changed a few things from the original tutorial:
1. Created a new component called Row (to test props and exercise arrow functions)
2. Changed the "squares" array to a bi-dimensional array (nested arrays inside the outer "board" array, representing the rows)
3. Adapted the original winning logic and button functionality to work with these added challenges

### Features implemented
I've completed this tutorial. Final feature list is:

- Status bar atop (whose next player, who won and if stalemate)
- 3x3 board with expected usual behavior (no overwritting, player alternating)
- History list with moves taken and rollback functionality (current move is set as a simple paragraph with who is next)

Currently only a two-player game is set (hardcoded). Also the grid size is hardcoded, I'm not making it interactive, but there is room for a future v2.

### Observations
I have not followed the tutorial 1:1, instead I tried doing my own thing based on directions, it might be less optmized.

I only used LLM/AI for t-shooting and in one single instance: to validate that the truncating of the history list in case of rollback would also cut the history list.

The entirety of code was either typed by hand or copied from the tutorial.