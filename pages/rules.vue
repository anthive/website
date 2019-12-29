<template lang="pug">
	section
		v-parallax(src='/img/home_bg.png', align='', height='300')
		v-row.justify-center
			v-col(cols="11", md="8")
				v-card.white.text-xs-left.pa-3.elevation-6.rules__card(flat='', tile='')
					v-card-title.font-weight-bold.mb-5 {{ $t('rules') }}
					v-card-text
						p
							| AntHIve.IO is a turn-based coding game. Command your ants to collect food and return it to your hive to grow your colony. A player with the biggest colony and least errors wins the game.
						p
							| Your bot starts the game with one ant and one hive on a two-dimensional map that consists of individual cells. The starting point (cell) of the game is called Span. Each cell might be occupied only by one ant or by one food with a value from 1 to 9. Cell also might be marked as “hive”.  If the hive ID matches your bot ID then your ants are allowed to walk into a hive cell. An ant with a “stranger” ID belongs to another bot and means other player on the map.
							| Your bot ID is defined in the beginning of the game by Span. For example, if your Span is at the point where Y=4 and X=7 then you Bot ID will be “s4-7”. The same ID will belong to your ants and your hives. If you see other IDs on the map it means they belong to another player. Your bot has to understand that it can only control ants and hives with the same ID (s4-7 in this example). Any other IDs on the map do not belong to your bot.
							| In order for ant to survive it has to eat meaning you have to look for the food and load it. The maximum number of food each ant can load is 9. There are three types of foods that are scaled differently: a seed represents a food from 1 to 3; a flower represents a food amount from 4 to 6; and an apple represents a food amount from 7 to 9.
							| To grow your colony you have to unload 5 foods into the cell of you hive, and then it will be converted to a new ant.
						p
							| Your bot receives an information about the map with every turn. (POST with JSON payload). That includes location and amount of food, number of ants and hives on the map. You also get a knowledge about your colony: how many ants you have, their location, health, and errors of each of your ants.
							| Your bot has to use computational thinking and computer programming to navigate and give orders to each of your ant.  (JSON response).
						p
							| Game supports following actions for your ants: 
							strong “move”
							| , 
							strong “eat”
							| , 
							strong “load”
							| , 
							strong “unload”
							| . Every turn each of your ants can perform only one action toward one of the four directions: 
							strong “up”
							| , 
							strong “down”
							| , 
							strong “left”
							| , 
							strong “right”
							| . In other words if you have 2 ants with IDs 1 and 2, your bot response might look like this:
							strong {"1":{"act":"move","dir":"down"},"17":{"act":"unload","dir":"right"}}
						p
							| If your ant performs an inappropriate action it counts as an error. Moving outside of the map or to a cell that is already occupied by ant/food, loading food from the cell that does not have any, or unloading food to the cell that is already full - these are the errors that affect your performance. The total number of errors is one of the parameters for defining a winner of the match.
							| Every ant has a Health that is scaled from 0 to 9. Health goes down by one point every 15 turns. You gain one health back every time you perform an action “eat” towards a cell with food. If ant’s health becomes 0 ant dies.  Dead ant get converted to one food on the same cell.
							| When the amount of ants is bigger than the amount of hive cells, the hive will grow to match the ants’ count. Hive does not grow down when ant dies. There are no limits how big is your hive or how many ants you can have.
						p
							| During the game every ant can go thought one of the following life modes:
							br
							br
						ol.p-5
							li
								strong “Birth”
								|  - the Ant is born. This mode lasts one turn and it means you got a new ant.
							li
								strong “No Action”
								|  mode means you bot didn’t give any commands to your ant.
							li
								strong “Slow”
								|   mode occurs when two ants from different bots want to go the same cell but the other bot is faster than yours (takes less time to get to this cell);
								|                 two ands (from the same or different bots) in the cells next to each other they will be moving based on their ID #. First # moves first.
							li
								strong “Bad Move”
								|  occurs when you try to move outside of the map; or if you try to move to a cell with somebody else’s ant; or you unload a food on a cell that already contains food; or when you have more than 9 food on the ant.
							li
								strong “Bad Unload”
								|  mode occurs when you try to unload when there is nothing to unload, in other words you don’t have any food to unload; or if you unload a food into a cell that already has food in it.
							li
								strong “Bad Eat”
								|  mode happens in two cases: when you try to eat from the cell with no food; or when you try to eat when you health is on maximum (on 9).
							li
								strong “Error”
								|  mode happens when there are programm’s issues. If you see an error please report a bug.
							li
								strong “Death”
								|   - if you only have one ant and it dies the game is over for you.
						br
						|               During Beta stage all games are limited to 1000 turns.
						|               If there are no changes on the map for 24 turns the game ends automatically.
						p
</template>

<style>
  .rules__card {
	margin-top: -178px;
  }
</style>
