## Checkers
2 players can play on the same computer on this web application.

I had used this resource as a base to consider how to approach this project: https://levelup.gitconnected.com/creating-a-board-game-checkers-with-javascript-ecd562f985c2. The data structure and the project objectives in my project differs from that used in the resource.

### Overall Game flow
- Checker is played by two opponents, on opposite sides of the gameboard. One player has the black pieces; the other has the red pieces. Players alternate turns. A player may not move an opponent's piece. 
- A move consists of moving a piece diagonally to an adjacent unoccupied square. 
- If the adjacent square contains an opponent's piece, and the square immediately beyond it is vacant, the piece may be captured (and removed from the game) by jumping over it.
- Only the dark squares of the checkered board are used. 
- A piece may move only diagonally into an unoccupied square. The player without pieces remaining, or who cannot move due to being blocked, loses the game.
Reference: https://en.wikipedia.org/wiki/Draughts

### Most challenging part of the project
- Figuring out the logic and data structure to enable 'Multiple jumps'

![alt text](https://github.com/edangx100/Checkers/blob/main/Images/Image1.JPG?raw=true)
![alt text](https://github.com/edangx100/Checkers/blob/main/Images/Image2.JPG?raw=true)
![alt text](https://github.com/edangx100/Checkers/blob/main/Images/Image3.JPG?raw=true)
![alt text](https://github.com/edangx100/Checkers/blob/main/Images/Image4.JPG?raw=true)

### Further work and next steps
1) Functions modularity can be improved.
2) The player without pieces remaining, or who cannot move due to being blocked, loses the game. The code for this portion can be further optimised.