# Grave - can you escape?

[Click here to see the deployed game](https://jmchor.github.io/grave_game/)

## Description

The Grave is a maze of walls the player has to maneuver through. In order to escape the map (and win the game), the player has to collect a key, find the corresponding door and escape the grave.

## MVP (DOM - CANVAS)

- ~one player character who can move in four directions (vertically and horizontally)~
- ~walls on map are impenetrable~
- ~player can pick up items (key, power up)~
- ~key unlocks door to escape~
- power up makes player briefly invincible
- ~ghosts/zombies/ghouls walk the tomb in either horizontal or vertical paths~
- ~ghosts kill player~
- ~time based high score (subtracting from a fixed high score every second)~

## Backlog

- ~power ups: intangibility from monsters~
- ~power ups appear after random time~
- ~pause/unpause~
- ~player inventory: display keys~
- ~step and background noise~
- only render visible circle around player (rest of map is black)
- "Race against Time" - mode (Countdown) --> display timer
- attack ghosts with weapon
- ~add treasure / collectibles for higher score~
- display score

## Data structure

### functions.js

- contains all functions related to various game elements (e.g. to player interactions with items etc.)
- contains functions like drawMap(), getKey() or intangibility()

### DOM.js

- handle all DOM API queries
- key events

### game.js

- contains all variable declarations connected with the game itself
- contains the logic for different levels
- contains the game object with all game related functions

### template.js

- generic Template Class, other Classes extend it

### map.js

- holds the mapOne and mapTwo 2d arrays for the map
- contains all Classes for building blocks & items (Wall, Stairs, Floor etc.)

### player.js

holds the Player Class

### ghoul.js

holds the Ghoul Class

### skeleton.js

holds the Skeleton Class

### monk.js

holds the Monk Class

## States & States Transitions

- ~splashScreen (Backstory, Controls, StartGame)~
- ~GameScreen~
- ~GameOverScreen~
- ~pauseGame~
- ~forgotKey~
- ~Trapped!~

## Task

- ~main - create canvas & position it in center~
- ~map - create 2d array and Wall Class~
- ~map - make walls impenetrable with collision detection~
- ~player - create player & keyEvents (controls & pickup)~
- ~player - create pickup functionality~
- ~item - create key~
- ~item - create door~
- ~ghoul -create nameless ghoul~
-

## Links

- [Trello Link](https://trello.com)
- [Slides Link](http://slides.com)
- [Github repository Link](http://github.com)
- [Deployment Link](http://github.com)
