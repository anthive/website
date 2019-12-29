export default {
	// header
    games: 'Games',
    leaderboard: 'Leaderboard',
    rules: 'Rules',
    login: 'Login',
    en: 'En',
    ru: 'Ru',

    // footer
    issueOnGithub: 'Issue on GitHub',

    // ----------------------------- HOME PAGE

    // parallax section
    slogan1: 'You are not playing a game',
    slogan2: 'Turn-based strategy game for your AI',
    slogan3: 'Start your new coding adventure with 3 simple steps',
    loading: 'Loading...',

    // steps section
    step1Title: 'Get a sample bot',
    step1Text1: 'Choose coding language that you prefer. Git clone sample repository or',
    import: 'import',
    step1Text2: 'it. You can choose sample from next languages.',
    step2Title: 'Link your repo',
    step2Text: 'In your repository set your username in ANTHIVE file. Link your repository in profile settings page.',
    profile: 'Profile',
    step3Title: 'Code strategies code',
    step3Text: 'Refactor code with your own strategies. Git push to origin. Start games, compete and climb the',
    step3leaderboard: 'leaderboard.',

    // feature section
    feature1Title: 'Learn',
    feature1Text: 'Always wanted to learn coding but didn’t know what to start with? Start right here. This turn-based strategy game is the most engaging way to learn real code. PIck a language, read the rules link to the rules and start learning right now.',
    feature2Title: 'Practice',
    feature2Text: 'Keep practicing and improving your coding skills by playing this game. This game is a great way to advance your programming skills while having fun and getting noticed. Master your current language of choice; or expand your understanding of a new one. By completing the levels you get trophies and certificates which will benefit you not only in the game but in real life.',
    feature3Title: 'Compete',
    feature3Text: 'Demonstrate your skills by competing with other developers in your language of choice. This platform allows you to battle not just against other software engineers around the world, but also against bots written in different languages on the same map and on your own time. Demonstrate to everyone that your strategy is superior, your code is the most efficient and has no errors. Climb the leaderboard, improving your strategy. Let your bot dominate the tournaments.',

    // video section
    videoTitle: 'Get Started!',
    videoText1: 'This is a turn-based strategy game for your Bot.',
    videoText2: 'Compute, contemplate and plan each step of your ants. Send commands to your ants in order for them to collect food, bring it to your hive, and to grow your colony. ',
    videoText3: 'A player with the biggest colony and least errors wins the game. To start the game please follow three steps below.',
    videoText4: 'For detailed rules please visit link',

    // badges section
    badgesTitle: 'Badges and Ranking',
    badgesText1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sapien velit, sodales in elementum sed, facilisis suscipit massa.',
    badgesText2: 'Maecenas efficitur lectus non ligula accumsan euismod in a quam. Vivamus finibus tincidunt tellus vitae aliquet. Suspendisse justo ipsum, pharetra non pretium ut, scelerisque ac mi.',
    badgesText3: 'Pellentesque hendrerit sodales tortor, in faucibus diam tempus ac. Donec convallis fringilla mauris vitae tristique.',

    // feedback section
    subscribe: 'Subscribe',
    feedbackText1: 'Stay in touch and get latest news first!',
    feedbackTitle2: 'Found an issue?',
    feedbackText2: 'Tell us on our github repo and we will fix it!',
    feedbackBtn2: 'Report issue',

    // ----------------------------- GAMES PAGE
    gamesTitle1: 'All battles:',
    gamesTitle2: 'Explore, watch, replay, learn strategies',

    // table
    gamesLoading: 'Loading... Please wait',
    gamesPlayer: 'Player',
    gamesTicks: 'Ticks',
    gamesWealth: 'Wealth',
    gamesDate: 'Date',

    // ----------------------------- LEADERBOARD PAGE
    leadGames: 'games',
    leadWealth: 'wealth',

    // ----------------------------- USER PAGE
    userGames: 'User games:',
    userTitle: 'Bot performance in the last 10 days',

    // chart
    chartPerfomance: 'Dayly performance',

    // ----------------------------- RULES PAGE
    rulesText: '\n AntHIve.IO is a turn-based coding game. Command your ants to collect food and return it to your hive to grow your colony. A player with the biggest colony and least errors wins the game. \n\nYour bot starts the game with one ant and one hive on a two-dimensional map that consists of individual cells. The starting point (cell) of the game is called Span. Each cell might be occupied only by one ant or by one food with a value from 1 to 9. Cell also might be marked as “hive”.  If the hive ID matches your bot ID then your ants are allowed to walk into a hive cell. An ant with a “stranger” ID belongs to another bot and means other player on the map.Your bot ID is defined in the beginning of the game by Span. For example, if your Span is at the point where Y=4 and X=7 then you Bot ID will be “s4-7”. The same ID will belong to your ants and your hives. If you see other IDs on the map it means they belong to another player. Your bot has to understand that it can only control ants and hives with the same ID (s4-7 in this example). Any other IDs on the map do not belong to your bot. In order for ant to survive it has to eat meaning you have to look for the food and load it. The maximum number of food each ant can load is 9. There are three types of foods that are scaled differently: a seed represents a food from 1 to 3; a flower represents a food amount from 4 to 6; and an apple represents a food amount from 7 to 9. To grow your colony you have to unload 5 foods into the cell of you hive, and then it will be converted to a new ant.\n\n Your bot receives an information about the map with every turn. (POST with JSON payload). That includes location and amount of food, number of ants and hives on the map. You also get a knowledge about your colony: how many ants you have, their location, health, and errors of each of your ants. Your bot has to use computational thinking and computer programming to navigate and give orders to each of your ant.  (JSON response).\n\n Game supports following actions for your ants: "move", "eat", "load", "unload". Every turn each of your ants can perform only one action toward one of the four directions: "up", "down", "left", "right". In other words if you have 2 ants with IDs 1 and 2, your bot response might look like this: {"1":{"act":"move","dir":"down"},"17":{"act":"unload","dir":"right"}}\n\n If your ant performs an inappropriate action it counts as an error. Moving outside of the map or to a cell that is already occupied by ant/food, loading food from the cell that does not have any, or unloading food to the cell that is already full - these are the errors that affect your performance. The total number of errors is one of the parameters for defining a winner of the match. Every ant has a Health that is scaled from 0 to 9. Health goes down by one point every 15 turns. You gain one health back every time you perform an action “eat” towards a cell with food. If ant’s health becomes 0 ant dies.  Dead ant get converted to one food on the same cell. When the amount of ants is bigger than the amount of hive cells, the hive will grow to match the ants’ count. Hive does not grow down when ant dies. There are no limits how big is your hive or how many ants you can have.\n\n During the game every ant can go thought one of the following life modes:\n\n 1. "Birth" - the Ant is born. This mode lasts one turn and it means you got a new ant.\n 2. "No Action" mode means you bot didn’t give any commands to your ant.\n 3. "Slow" mode occurs when two ants from different bots want to go the same cell but the other bot is faster than yours (takes less time to get to this cell); two ands (from the same or different bots) in the cells next to each other they will be moving based on their ID #. First # moves first.\n 4. "Bad Move" occurs when you try to move outside of the map; or if you try to move to a cell with somebody else’s ant; or you unload a food on a cell that already contains food; or when you have more than 9 food on the ant.\n 5. "Bad Unload" mode occurs when you try to unload when there is nothing to unload, in other words you don’t have any food to unload; or if you unload a food into a cell that already has food in it.\n 6. "Bad Eat" mode happens in two cases: when you try to eat from the cell with no food; or when you try to eat when you health is on maximum (on 9).\n 7. "Error" mode happens when there are programm’s issues. If you see an error please report a bug.\n 8. "Death" - if you only have one ant and it dies the game is over for you.\n During Beta stage all games are limited to 1000 turns. If there are no changes on the map for 24 turns the game ends automatically.\n',
}