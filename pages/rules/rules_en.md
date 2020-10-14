## Introduction

**AntHive** is a multiplayer competitive strategy in which each player creates his own colony of ants.

As in real life, ants get **food**, build **anthills**.

[<img src="/img/game-animation.gif" alt="ants" title="ants" width="100%"/>](//img/game-animation.gif)

**AntHive** is a game for programmers with different skill levels. Unlike conventional strategies, ants in AntHive respond to events the way you program them.

<br>

## Basic task

You create a **bot** that controls your colony's ants and runs it in one of the game modes. All games take place on a server without you being involved. 

<br>

## Elements of the game

### Map

The game map is a plane consisting of **cells**, each of which has its own **X** and **Y** coordinates. The coordinate countdown starts **in the top left corner of the map**. 

[<img src="/img/map-debug-mode.png" title="anthive map" alt="anthive map" width="100%"/>](/img/map-debug-mode.png)

Each of the cells may contain objects:
* Ant [<img src="https://raw.githubusercontent.com/anthive/website/master/static/skins/client/1/ant.png" title="ant" alt="ant" width="20"/>](https://raw.githubusercontent.com/anthive/website/master/static/skins/client/1/ant.png)
* Anthill [<img src="https://raw.githubusercontent.com/anthive/website/master/static/skins/client/1/hive.png" title="anthive" alt="ant" width="20"/>](https://raw.githubusercontent.com/anthive/website/master/static/skins/client/1/hive.png)
* Food [<img src="https://raw.githubusercontent.com/anthive/website/master/static/skins/server/1/foodbig.png" title="ant food" alt="ant food" width="20"/>](https://raw.githubusercontent.com/anthive/website/master/static/skins/server/1/foodbig.png)

<br>

```
One cell may have both an ant and an anthill and food at the same time
```
<br>

### Ant

**Birth**. To get a new ant you need to put 7 of food (in the challenge may be another amount) in the anthill, after which the food in the anthill is replaced by a new ant.

**Health**. Each ant has 9 health points.

**Death**. Every 10 ticks (in the challenge may be another amount) of the server takes 1 health point from all ants on the map - they starve. When all health points expire, the ants die. After death, an ant turns into 1 food.  In order to make up for its health, an ant must eat. 1 meal restores 1 ant health point. 

<br>

### Actions(`act`):
* `STAY` - stay on the cell
* `MOVE` - move in the specified direction on one cell
* `EAT` - there is food from the next specified cell
* `TAKE` - take food from the next specified cell
* `PUT` - put food on the next specified cell

<br>

### Directions(`dir`)

Ants can move in any direction on the neighboring cell.
* `UP`
* `DOWN`
* `LEFT`
* `RIGHT`

<br>

### Food

The food scattered on the map contains **1 to 9 units**. It is visually depicted in three types:
* Small - up to 3 units of food [<img src="https://raw.githubusercontent.com/anthive/website/master/static/skins/server/1/foodsmall.png" title="small food" alt="small food"/>](https://raw.githubusercontent.com/anthive/website/master/static/skins/server/1/foodsmall.png)
* Average - up to 6 food units [<img src="https://raw.githubusercontent.com/anthive/website/master/static/skins/server/1/foodmid.png" title="mid food" alt="mid food"/>](https://raw.githubusercontent.com/anthive/website/master/static/skins/server/1/foodmid.png)
* Big - up to 9 food units [<img src="https://raw.githubusercontent.com/anthive/website/master/static/skins/server/1/foodbig.png" title="big food" alt="big food"/>](https://raw.githubusercontent.com/anthive/website/master/static/skins/server/1/foodbig.png)

<br>

### Anthill

In order for the map cell to become an anthill, you must put 9 food in it. The size of the anthill is the main indicator of success in competition.

<br>

## Gaming modes

### Battle

Battle is an automatic mode, without players involved, where your bot competes with each opponent in a circle. This round of games is called **sprint**. The bot gets rating points when it wins the game and when it loses. The system automatically selects opponents close to you by level. It's important that the bot makes as many wins as possible in a single sprint, because in addition to the bot's points, it also raises the rating of its creator. At the end of the Sprint you will get the result and will be able to watch all the games played, analyze them and edit the bot.

#### Battle mode rules

The game is played on maps of different set configuration. Each bot has its own starting point - the anthill. Bots start the game with one ant. To increase the population of ants in the colony, you need to get food and bring to the anthill. The new ant will appear when the anthill will accumulate 9 food. Food on the map is not very much, so the ants compete for it.
The bot wins the game, which will gain more victory points for 1000 ticks server.


### _Challenges (coming soon)_

_Here you have to overcome a series of difficult programming challenges. Which are designed with gradual complication and set tasks for different types of skills that can be useful in the game and in the work. Once you pass the first challenge, the following will open. Pass all the challenges to receive various awards and titles._

<br>

## Bot

**Bot** is a server code that expects requests from a simulation on port:`7070`. Inside the request is information about each ants, their position on the map, as well as the location of food on the map. The bot manages the ants by responding to HTTP requests from **simulation** that it "listens" on the port. Based on the data from the request, **bot** decides the next **step** for **every** ant and sends it to the simulation. Each bot's response is an array with orders as to which action to take **ever ants** and in which direction. Ants can only **interact** with those **cells** on the card that are around them-left, right, top, and bottom.

The order contains the ants unique identifier (`antId`), action (`act`) and direction (`dir`), for example:

`{ "antId": 1, "act": "unload", "dir": "up" } }`,

After receiving an order, the simulation will process it and generate a new game state. The complete cycle from receiving the order to generating the new game state is called **tic**.

<br>.

## Possible errors

* **food taking error** is an attempt to take food from a cell where there is no food.
* **feedback error** - an attempt to take food from a cell where there is no food.
* **wrong eating** - an attempt to eat food from an adjacent cell where there is no food.
* **collision** - occurs when you illegally move into a cage with another ant, food, out of the map. Each error reduces the number of final points per game.

<br>

## FAQ:

**Question**: What happens when ants from different bots try to move to the same cell during the same tick?
**Answer**: In this case, the bot that first passes to the simulation the order to move the ants into the cell will perform the movement, and the ants of the other bots will get an error with the deceleration parameter.


**Question**: What programming language can I write my bot in ?
**Answer**: The current version supports Go, PHP, Javascript, C++, C#, Python.


**Question**: Where is the code stored ?
**Answer**: The code is stored in Git repository. Supported by Github, Gitlab and Bitbucket.


**Question**: Where does the food appear ?
**Answer**: The food appears in quantity from 1 to 9 in random points of the map.