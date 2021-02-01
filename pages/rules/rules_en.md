<h2 id="introduction">Introduction</h2>

The idea came from watching ants and wondering if it possible to reproduce ants movements and hive mind with code. If statements; Algorithms;  Goals; Strategies; and eventually Machine Learning ML. AntHive platform is made for you to test your codding skills, explore new strategies, benchmark algorithms and conducts science experiments with hive mind.

AnthHive.IO platform is free and the majority of it is open source. <a href="https://github.com/anthive/website/projects/15" target="_blank">Ideas</a>, <a href="https://github.com/anthive/website/issues/new" target="_blank">suggestions</a> and <a href="https://github.com/anthive/website/issues" target="_blank">contributions</a> are welcomed! <a href="https://github.com/anthive" target="_blank">GitHub page</a>.

**Platform capability:**
- Language agnostic - Bots written in different programming languages battle against each other in one map with fair resource allocation.
- ML/AI training ground. Ability for bot to play against itself or different versions of itself to identify and learn effective strategies.
- Leaderboards and ranking - Each active bot battle against others offline to gain rank and climb leaderboard.
- Tournaments - Joining one of our regional tournaments or create your own custom one.
- License your ML/AI - Submitting your trained model to marketplace.

---

<h3 id="beginners">Beginners</h3>

You never coded before but eager to try. It’s going to be a bit hard to get started, don’t let it stop you. The learning curve is steep, but results will yelled understanding of main tool in programming like if statement; loop; function; object. Levels progression will force you to optimize your code for performance. Most importantly this platform will teach you to **think ahead and predict your program behavior** - which is the most important skill for Software Engineer.


<h3 id="professionals">Professionals</h3>

You know your way around 1s and 0s. Want to try a new codding language that you heard so much about it. Maybe you want to demonstrate how well you can optimize your code. Battles between codding languages become more vivid like. JS vs Golang vs PHP in one map with equal rules.
Have multiple versions of your bot battle against each other on one map will identify which strategy is superior. Or could be used and training ground for your ML/AI bot.

<h3 id="scientist">Scientist</h3>

We love since and here to support it at no cost. Famous experiments like <a href="https://en.wikipedia.org/wiki/Prisoner%27s_dilemma" target="_blank">prisoner's dilemma</a> or <a href="https://en.wikipedia.org/wiki/Chicken_(game)" target="_blank">hawk–dove</a> game motivates us to explore and learn from Hive Mind. If you want to propose an experiment contact us at <a href="mailto:science@anthive.io" target="_blank">science@anthive.io</a> We can customize parameters and create any virtual environment that suits your needs.


---

<h2 id="terminology">Terminology</h2>

<h3 id="sim">Sim</h3>

Sim or Simulation is a game engine that responsible for controlling virtual environment. Sim runs in docker container and makes web request to your [bot](#bot) with **JSON**** payload. Expecting response with orders for each ant. Web request made over **HTTP** protocol as **POST** request on port **:7070**. Each request times out in **500 ms**. Therefore, your bot has limited amount of time to calculate [order](#order) for each ant. When Sim receive response from your bot it validates and applies orders according to [Rules](#rules). Then Sim generates a new state of the [map](#map). That way the cycle (tick) continues until the limit of the game is reach.


<h3 id="bot">Bot</h3>

[<img src="/img/bot-rules.jpg" title="anthive map" alt="anthive map" width="200px" style="margin-left: 20px;" align="right"/>](/img/bot-rules.jpg)

Bot is your code that runs in docker container on private network.

Your bot must listen for calls from [Sim](#sim). When creating a bot you specify a coding language. If you want to switch or try another codding language, you should create a new bot. Bot can be created from git repository or from <a href="https://anthive.io/sandbox" target="_blank">Sandbox</a>

Calculate orders for each ant - is the main responsibility of your bot. You have full freedom to do it your way applying strategies; algorithm; or random action. Each bot have versions (commits). For each game you can choose which version of your bot will battle. Each version accumulate statistic from battles. Error percentage; Average response time;  You can choose a name and avatar for your bot. When your bot is active it’s plays robin round with other bots to determining rank in leaderboard.
<br><br><br><br>

<h3 id="map">Map</h3>

The JSON payload of each request to your bot contains information about current state of the map: **width**; **height**; and **cells** (array of cells). The map visually represented as two-dimensional Canvas. With coordinates **x** and **y** starts from **0** from the **top left corner**. In code, it’s a 2d array of [cell](#cell) objects with **x** and **y** are indexes of the array. 

[<img src="/img/map-rules.jpg" title="anthive map" alt="anthive map" width="500px" style="margin: 0 auto; display: block;" />](/img/map-rules.jpg)

As an example the cell marked green on the image with coordinates `x=2` and `y=3` could be accessed by index `canvas.cells[y][x]` or `canvas.cells[3][2] `

```
Note: For empty cells in JSON object properties are omitted and represented as '{}'
```
<br>


<h3 id="cell">Cell</h3>

Cell is an object with three properties: **ant**; **hive**; **food**. Properties `canvas.cells[y][x].ant` and `canvas.cells[y][x].hive` simply represent **id** of bot for current game. So you can identify your ants and hive on the map. Property canvas.`cells[y][x].food` represent amount of food in the cell. It can vary from 0-9.

Note in near future cell will also have property **terrain** of the tile like: water; stone; fog of war. 
If you have suggestions or would like to be involved in game development, join our Discord.

<h3 id="ant">Ant</h3>

Image on the left of JSON object: Ant is an object with six properties: **id**; **event**; **age**; **health**; **cargo**; **point**. 
- Property **and.id** is your bot id for current game.
- Property **ant.event** describe what happened with ant in prior tick. Possible options are: (list of event) link to the order with bad move
- Property **ant.health** represent amount of HP of your ant. When Ant is born it get 9hp, every 15 ticks - (based on game style) ant loses 1hp. When the health of the ant drops to 0 hp it will die and become 1 food. To gain health ant must eat. Each food eaten by the ant will recover 1hp. (link to order example)
- Property **ant.cargo** represent amount of food that has been carried by ant. Each ant can carry from 0 to 9 food. In order to carry food and should give order with action=“take” and point the direction of the cell that located next to the ant location and has food property more than 1. (link to order example)
- Property **ant.point** is an object with X and Y coordinates that represent ant current location on the map.
For example if  ant tried to move to  an error ant.event = “badmove”. 

<h3 id="order">Order</h3>

Order is a json object with three properties

---

<h2 id="rules">Rules</h2>

The main goal of the game is to collect food on the map and bring it to the hive. When you collect 7 food in one cell of your hive it will be converted to a new ant for your colony. The size of your hive will grow as well to match the amount of ants. It will not shrink when your ant die. The game ends when a limit of ticks is reached or no hives left on the map. The Bot with the highest score is a winner.

- Each tick your ant can do only one action to the cell next to it.
- Ant can’t can not skip cells.
- Ant can’t move outside the map.
- Ant can’t move to the other bots hive.
- Ant can’t move to the cell that contain food.
- Ant can’t move to the cell that occupied by another ant.
- If two ants moved to the same cell. The Bot with slower RT (response time) will get collision error.
- Ant can’t “take” from the cell that does not contain food
- Ant can’t “take” from another ant. 
- Ant can’t “put” to the cell that already has 9 food
- Ant can’t “put” to the cell that occupied by ant

	
<h3 id="score">Score</h3>

Within a game your bot have parameters that represent it performance **for each tick**.
- RT 34.56ms - is response time in milliseconds. Howling it took for your bot to calculate orders and send back response.
- Size 12/10 - the size of your hive and amount of live ants.
- Errors 3 - amount of errors made.
- Score - amount of points earned.

```
VALID ORDER: your bot can not give orders in advance. Only for the next move. Orders will apply only to the cell next to your ant current position.
```

---

<h2 id="errors">Possible errors</h2>

- **food taking error** is an attempt to take food from a cell where there is no food.
- **feedback error** - an attempt to take food from a cell where there is no food.
- **wrong eating** - an attempt to eat food from an adjacent cell where there is no food.
- **collision** - occurs when you illegally move into a cage with another ant, food, out of the map. Each error reduces the number of final points per game.

---

<h2 id="faq">FAQ</h2>:

**Question**: What happens when ants from different bots try to move to the same cell during the same tick?
**Answer**: In this case, the bot that first passes to the simulation the order to move the ants into the cell will perform the movement, and the ants of the other bots will get an error with the deceleration parameter.

**Question**: What programming language can I write my bot in ?
**Answer**: The current version supports Go, PHP, Javascript, C++, C#, Python, Rust.

**Question**: Where is the code stored ?
**Answer**: The code is stored in Git repository. Supported by Github, Gitlab and Bitbucket.

**Question**: Where does the food appear ?
**Answer**: The food appears in quantity from 1 to 9 in random points of the map.
