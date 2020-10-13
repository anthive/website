## Introduction

**AntHive** is a multiplayer competitive strategy in which each player creates his own colony of ants. Just like in real life, the ants harvest the **food**, build the **nests**, and protect themselves from **enemies**. Here, they'll have to prove their superiority in effectively expanding the colony in competition with other players.

**AntHive** is a game for people with programming skills. Unlike conventional strategies, ants in AntHive respond to events the way you program them. The current version supports Go, PHP, Javascript, C++, C#, Python. The code is stored in a Git repository. Github, Gitlab and Bitbucket are supported.
You create a **boot** that controls the ants in your colony and sends it to one of the game modes. All games take place on a server without your participation. Once you get the result of the battle, you can change the bot and continue the game. 


## Map, objects, events

The game map is a plane consisting of **cells**, each of which has its own **X** and **Y** coordinates. The coordinate countdown starts **in the top left corner of the map**. Each of the cells may contain different objects:

* Ant
* Nest
* Food
* Ant in the nest of its color
* Ant in the nest of its color with food
* Nest with food
* Ant with food


The food scattered on the map contains **1 to 9 units** food. It is visually represented by three types:
* Small - up to 3 food units
* Average - up to 6 units of food
* Big - up to 9 food units

Events taking place in a cell:
* the birth of an ant
* the death of an ant
* a simple ant
* slowdown - occurs in a controversial situation where ants **different** bots try to move to the same cell during the same tick. In this case, the bot that **first** passes the order for ants to move into the cell and the ants of the other bots get a **slowdown** error. 
* food upload error - an attempt to pick food from a cell where there is **no food**.
* food unload error - an attempt to take food when the ants have no food.
* wrong attempt to eat - an attempt to eat food from a neighboring cell where there is **no food**.
* Collision - occurs when **illegal** move into a cage with another ant, food, out of the map.




## Gaming modes

### Challenges

Here you have to overcome a series of difficult programming challenges. Challenges are designed with gradual complication and set tasks for all the skills that can be useful in the game and at work. Once you pass the first challenge, the following will open. Pass all the challenges to receive various awards and the title "Irrepressible".


### Battle

In this mode, the bots fight each other automatically 1 on 1. When you launch a bot into battle, it will fight with different opponents until it loses 5 times. This series of games is called **sprint**. 
The bot gets rating points when it wins the battle and when it loses. The system automatically selects opponents close to you by level. 
It's important that the bot makes as many wins as possible in one **sprint**, because in addition to the bot's points, it also raises the rating of its creator. 
At the end of the Sprint you'll get the result and be able to watch all the games played, analyze them and edit the bot.

      
### Battle Mode Rules

The game is played on maps of different set configuration. Each bot has its own starting point - a nest. Bots start the game with one ant. To increase the population of ants in the colony, you need to get food and bring to the hive. The new ant will appear when the hive will accumulate 9 food. There is not much food on the map, so the ants compete for it. 
There are two types of food sources:
* random food - it appears randomly at different points on the map and contains little food.
* constant food - is at certain points on the map, contains inexhaustible amount of food


The bot wins the game and gains more victory points for 1000 ticks of the server.
	

## Bot and ants

**Bot** is a server code that expects requests from a simulation on port `:7070`. Inside the request is information about each ants, their position on the map, as well as the location of food on the map.
The bot manages the ants by responding to HTTP requests from **simulation** that it "listens" on the port. 
Based on the data from the request, **bot** decides the next **step** for **every** ant and sends it to the simulation. Each bot's response is an array with orders as to which action to take **ever ants** and in which direction.
Ants can only **interact** with those **cells** on the map that are around them-left, right, top, bottom, and diagonally.

The order contains a unique identifier for the ant (`antId`), action (`act`) and direction (`dir`), for example:

`{ "antId": 1, "act": "unload", "dir": "up" } }`,

After receiving an order, the simulation will process it and generate a new game state. 
The complete cycle from receiving the order to generating a new game state is called **tic**.



### Ant

Each ant has a unique identifier and never repeats itself within the same nest. 
To get a new ant you need to put 9 food in the nest and then the food in the nest is replaced by a new ant.
Each ant has 9 health points. Every 10 ticks of the server takes away 1 health point from all ants on the map - they starve. In order to make up for your health, an ant must eat. 1 meal restores 1 health point for ants, but no more than 3. 
Possible actions of ants :
* <span style="background:black;color:red;">STAY</span> - stay in the cell
* <span style="background:black;color:yellow;">MOVE</span> - move in the specified direction to **one cell**.
* <span style="background:black;color:green;">EAT</span>- there is food **from the adjacent specified cell**.
* <span style="background:black;color:blue;">TAKE</span> - take food **from the next specified cell**
* <span style="background:black;color:orange;">PUT</span> - put food **on the adjacent specified cell**.

Possible directions:
Ants can move in any direction on the adjacent cell, including the diagonal. 
* Up
* Up-Right - diagonally up-right
* Up-Left - diagonally up-left
* Down
* Down-Right - diagonally down to the right
* Down-Left - diagonally down to left
* Left
* Right