# Grave - can you escape?

<a href="https://jmchor.github.io/grave_game/" target="_blank"> Click here to see the deployed game </a>

## Description

The Grave is a maze of walls the player has to maneuver through. In order to escape the map (and win the game), the player has to collect a key, find the corresponding door and escape the grave.

## MVP (DOM - CANVAS)

- ~one player character who can move in four directions (vertically and horizontally)~
- walls on map are impenetrable
- player can pick up items (key, powerup)
- key unlocks door to escape
- power up makes player briefly invincible
- ghosts/zombies/ghouls walk the tomb in either horizontal or vertical paths
- ghosts kill player
- time based high score (subtracting from a fixed highscore every second)
-
-

## Backlog

- power ups: freeze time
- pause/unpause
- player inventory: display keys
- only render visible circle around player (rest of map is black)
- "Race against Time" - mode (Countdown) --> display timer
- attack ghosts with weapon
- add treasure / collectibles for higher score
- display score

## Data structure

### main.js

### DOM.js

### game.js

### template.js

### map.js

### player.js

### item.js

### ghoul.js

## States & States Transitions

- splashScreen (Backstory, Controls, StartGame)
- GameScreen
- GameOverScreen

## Task

- ~main - create canvas & position it in center~
- ~map - create 2d array and Wall Class~
- map - make walls impenetrable with collision detection
- player - create player & keyEvents (controls & pickup)
- player - create pickup functionality
- item - create key
- item - create door
- ghoul -create nameless ghoul
-

## Links

- [Trello Link](https://trello.com)
- [Slides Link](http://slides.com)
- [Github repository Link](http://github.com)
- [Deployment Link](http://github.com)
