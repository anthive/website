# Terminology and how AntHive works
##  `

## Golas
The general goal is to collect food and grow your colony. Making as few errors as possible. A [carrier](https://profile.anthive.io/career) mode has more specialized goals like find the shortest path, overcome limited food, tunnels management, performance, etc.

## Bot
Bot is your code that can be written in any language. It's listening on port `:7070` for *HTTP* calls/requests from [Sim](#sim). It is responsible to analyze the current state of the [map](#map) and assign orders to ants. Response with *JSON* like: 

```
{
  "orders": [
    {
      "antId": 1,
      "act": "unload",
      "dir": "up"
    },
    {
      "antId": 2,
      "act": "stay",
      "dir": "down"
    },
    {
      "antId": 3,
      "act": "move",
      "dir": "up"
    }
  ]
}
```

## Green note
``` green-note
Note
Discover is Sentry’s powerful query builder for aggregating raw event data and has its own unique syntax not covered here. For more information, see full Discover documentation.
}
```

## Orange note
``` orange-note
Note
Discover is Sentry’s powerful query builder for aggregating raw event data and has its own unique syntax not covered here. For more information, see full Discover documentation.
}
```

## Sim
Sim is a virtual environment that keeps a state of the game. It enforces rules and collects statistics. Sim sends *HTTP* request to each [Bot](#bot) of current game with *JSON* payload that represents the state of the [map](#map).

## Tick
Tick is a life cycle or turn. Visually each tick represented as a frame on video replay. Amount of ticks in the game called age. Each tick is a cycle of:
* Sim sends a request to bots with the current state of the game.
* Bots respond to Sim with orders.
* Sim applying orders to the virtual environment and generating a new state of the game.

## Map
Map is a *JSON* object that represents basic settings of the map like `width`, `height`, etc. Property `canvas` is a two-dimensional array of map cells. A `cell` is an object that has the following property:
* `Food` - amount of food in the cell. The number can range from 0-9.
* `Terrain` - type of the cell. Could be "fog", "empty", "stone", "water", etc.
* `Ant` - whether or not the cell is occupied by an ant. Id used to determine if it's your ant or your opponent.
* `Hive` - whether or not it has a hive. Id used to determine if hive belongs to you or your opponent.

## Order
Order is a *JSON* object that contains only two property `act` and `dir`. Act of the order always applies to the cell next to the ant current positon. It could take one of five values `stay`, `move`,  `eat`, `load`, `unload`.
dir is direction of the order specifying to which cell exactly you want to apply an action.

## Error
Your ants can receive an error if the performed illegal action or had a collision. Following is the list of situations that result in an error:
* 
*
*

## Event