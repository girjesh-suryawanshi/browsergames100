export const gameDescriptions: Record<string, { about: string; howToPlay: string; tips?: string[] }> = {
  // ─── SLOPE ───────────────────────────────────────────────────────────────────
  slope: {
    about: `<p><strong>Slope</strong> is a fast-paced, minimalist 3D endless runner and one of the most iconic browser games of the decade. You guide a glowing neon ball down a steep, randomly generated track suspended in a deep-space void. The track twists, narrows, and drops without warning — and the longer you survive, the faster everything gets.</p>
    <p>Unlike traditional platformers, Slope has no levels, no checkpoints, and no second chances. Every run is a unique challenge generated in real time, which is why the game has near-infinite replayability. It has become a staple in the cloud gaming community due to its lightweight engine, which runs flawlessly on any modern browser — including school Chromebooks.</p>`,
    howToPlay: `Use the Left/Right Arrow keys (or A/D keys) to steer the ball. The goal is to stay on the neon track for as long as possible without falling off the edges or crashing into the red obstacle blocks. The ball accelerates continuously — there is no way to slow down, so every decision must be instant.`,
    tips: [
      "Steer with light, short taps rather than holding the key down — oversteering causes most crashes.",
      "Look ahead of the ball, not directly at it. Anticipate bends before they arrive.",
      "Red blocks often appear in clusters — plan your path through the gap, not around the edges.",
      "Play in full-screen mode (F11) for better visual clarity and reduced distractions.",
    ],
  },

  // ─── RUN 3 ────────────────────────────────────────────────────────────────────
  "run-3": {
    about: `<p><strong>Run 3</strong> is a beloved sci-fi endless runner set in the outer reaches of the galaxy. You play as a small grey alien navigating a series of dark, rotating tunnels that spiral through space. The game's signature mechanic is gravity rotation — when you run into a side wall, the tunnel physically rotates and that wall becomes the new floor.</p>
    <p>Run 3 features two core modes: <em>Explore Mode</em>, where you follow a non-linear map with hundreds of unique hand-designed levels, and <em>Infinite Mode</em>, a procedurally generated endless run. Multiple unlockable characters each have unique physics — the Skater is blazing fast, the Lizard can climb walls, and the Bunny jumps exceptionally high.</p>`,
    howToPlay: `Use the Arrow keys or WASD to move and jump. The Spacebar also jumps. Your primary goal is to avoid the gaps in the tunnel tiles. Running into a wall will rotate the tunnel — use this mechanic intentionally to find safer paths. In Explore Mode, reaching the end of a tunnel advances you to the next level.`,
    tips: [
      "The Skater has the highest speed but the least control — master the basic Runner character first.",
      "When a path looks completely blocked, check the walls — you can always rotate onto them.",
      "In Infinite Mode, prioritize staying near the center of the tunnel to give yourself reaction time.",
      "Earned power cells in levels can unlock new characters — prioritize the ones that match your playstyle.",
    ],
  },

  // ─── RETRO BOWL ──────────────────────────────────────────────────────────────
  "retro-bowl": {
    about: `<p><strong>Retro Bowl</strong> is a pixel-art American Football game that brilliantly blends the nostalgia of classic 8-bit sports games with modern management mechanics. You take the role of both head coach and general manager of a struggling NFL-style franchise. Your mission: draft the right players, manage morale, balance the salary cap, and lead your team to championship glory.</p>
    <p>On the field, Retro Bowl uses a simple but deeply satisfying passing system that rewards timing and spatial awareness. Off the field, every decision you make — from handling press conferences to trading players — affects team chemistry and performance. It's widely regarded as one of the best sports games ever made for browsers.</p>`,
    howToPlay: `On offense: drag your mouse backward from the quarterback to aim (a trajectory arc appears), then release to throw. Tap a running back to hand off for a rushing play. On defense: the AI simulates outcomes based on your roster stats — upgrade your defense to stop the opponent. Manage your team between games from the front office screen.`,
    tips: [
      "Fan tokens are precious — spend them on dedicated fans first to boost your team's morale and salary cap headroom.",
      "Always prioritize offensive upgrades early; scoring points wins games, and offense is easier to develop.",
      "In press conferences, choose balanced answers — overly aggressive responses tank your team morale.",
      "When drafting, look for players with high potential ratings (shown as stars) even if their current stats are low.",
    ],
  },

  // ─── BITLIFE ─────────────────────────────────────────────────────────────────
  bitlife: {
    about: `<p><strong>BitLife — Life Simulator</strong> is a wildly popular text-based life simulation game that lets you live out countless virtual lifetimes. From birth to death, every choice you make shapes your character's story. Will you become a respected neurosurgeon, a chart-topping pop star, a ruthless crime lord, or a homeless drifter?</p>
    <p>BitLife is famous for its irreverent humor, deeply branching narrative paths, and shocking realism — your character can face illness, family drama, career setbacks, legal trouble, and unexpected windfalls. The game runs entirely in text, making it incredibly lightweight and ideal for browser play. No two lives are ever the same.</p>`,
    howToPlay: `Click the "Age +" button to advance your character one year at a time. Random life events will pop up — click your response to make a choice. Use the Activity menu to study, work, date, exercise, and more. Manage your four core stats (Happiness, Health, Smarts, Looks) to unlock better life outcomes. Your goal is to live a full, successful life — or at least an interesting one.`,
    tips: [
      "Studying hard in school significantly boosts your Smarts stat, unlocking higher-education options like medical school and law school.",
      "Exercising regularly from a young age keeps your Health stat high, helping you live longer.",
      "Inherit a fortune by building strong relationships with wealthy relatives and staying on their good side.",
      "If your character gets into legal trouble, always hire a lawyer — the AI defense attorney almost always loses.",
    ],
  },

  // ─── MONKEY MART ─────────────────────────────────────────────────────────────
  "monkey-mart": {
    about: `<p><strong>Monkey Mart</strong> is an adorable and wildly addictive idle management game in which you build a supermarket empire — as a monkey. Starting with a single banana plantation, you expand your store by adding new product stations: corn, eggs, milk, chocolate, popcorn, and more processed goods that combine raw materials into higher-value items.</p>
    <p>The core loop is brilliantly satisfying: harvest crops from your stations, stock the shelves, check out customers at the register, and reinvest your earnings into upgrades and new monkey employees. As your empire grows, efficient routing becomes a strategic puzzle. Monkey Mart is one of the highest-rated casual browser games of 2024-2025.</p>`,
    howToPlay: `Use WASD or Arrow keys to move your monkey. Stand next to a crop station to automatically harvest it. Walk to empty store shelves to stock them with your harvested goods. Stand at a cash register to check out waiting customers. Use earned coins in the upgrade shop to increase your movement speed, hire employee monkeys, and unlock new product departments.`,
    tips: [
      "Prioritize upgrading your movement speed first — a faster monkey is more efficient than any other upgrade.",
      "Hire employee monkeys as soon as possible to man the cash registers, freeing you to focus on harvesting.",
      "Place yourself near the product station that generates your highest-value items for maximum income per minute.",
      "Don't let shelves run empty — customers leave without buying if they wait too long, which slows your income.",
    ],
  },

  // ─── SUBWAY SURFERS ──────────────────────────────────────────────────────────
  "subway-surfers": {
    about: `<p><strong>Subway Surfers Online</strong> brings the world-famous endless runner experience directly to your web browser. Play as Jake and his colorful crew as they dash through vibrant subway systems set in iconic global cities — from New York and London to Tokyo and Mumbai. Escape the relentless pursuit of the grumpy Inspector and his dog.</p>
    <p>This HTML5 version delivers the complete Subway Surfers experience without any app download. Collect gold coins, grab magnetic powerups, activate Jetpacks for massive score multipliers, and slide through oncoming trains with inch-perfect timing. The game's seasonal world tours constantly introduce new characters, hoverboards, and city themes.</p>`,
    howToPlay: `Use Arrow keys or WASD to navigate: Up to jump, Down to roll under barriers, Left/Right to switch lanes. Press Space or double-tap Up to activate a hoverboard for temporary crash protection. Collect yellow coins during your run — you can spend them between runs to unlock new characters and upgrade your powerups.`,
    tips: [
      "Always upgrade the Score Multiplier powerup first — it stacks with other powerups for exponential score gains.",
      "The Coin Magnet is the most valuable powerup for casual play — it vacuums coins from all three lanes.",
      "Hoverboards save you from one crash — always keep one equipped and activate it the moment you're about to hit something.",
      "Look for 'Daily Challenges' at the start of each session — completing three per day earns bonus keys.",
    ],
  },

  // ─── 1V1.LOL ─────────────────────────────────────────────────────────────────
  "1v1-lol": {
    about: `<p><strong>1v1.LOL</strong> is a third-person multiplayer building and shooting game that directly blends the battle royale genre with real-time construction mechanics reminiscent of Fortnite. You compete against real opponents online, using a combination of precise gunplay and lightning-fast structure building to outmaneuver and eliminate your enemies.</p>
    <p>The game's appeal is its skill-based ceiling — masters can build fully-enclosed forts in under a second, completely dominating opponents who only know how to shoot. It features multiple modes including 1v1 (head-to-head duels), 2v2 team battles, Box Fights, and a full Battle Royale mode. It runs seamlessly in browsers as a free HTML5 game.</p>`,
    howToPlay: `Use WASD to move, mouse to aim, and left-click to shoot. Press Q to switch between your weapon and building mode. In building mode, use Z (wall), X (floor), C (ramp), V (roof) to place structures. Building platforms and ramps above your opponent gives you a significant height advantage. Press E or F to open doors in your structures.`,
    tips: [
      "Practice 'box fighting' — building a quick 4-wall enclosure forces your opponent into close quarters where you have control.",
      "Always build a ramp when engaging an opponent. High ground = more favorable shot angles and damage output.",
      "The shotgun is the dominant weapon in close range — switch to an SMG for spraying while moving.",
      "Play 1v1 Practice mode extensively before entering ranked lobbies to develop muscle memory for building.",
    ],
  },

  // ─── SHELL SHOCKERS ──────────────────────────────────────────────────────────
  "shell-shockers": {
    about: `<p><strong>Shell Shockers</strong> is a wildly entertaining first-person multiplayer shooter where every character is a gun-toting egg. You compete in fast-paced arena matches against real players worldwide, using a variety of egg-themed weapons — from shotguns and sniper rifles to SMGs and rocket launchers — to scramble your opponents.</p>
    <p>The game features multiple class types (Scrambler, Free Ranger, Soldier, Ranger, Whipper) each with a unique primary weapon loadout. Shell Shockers stands out in the browser gaming space for its smooth netcode, frequent content updates, and surprisingly deep competitive meta. It's one of the most-played .io-style shooters ever made.</p>`,
    howToPlay: `Use WASD to move, mouse to aim, and left-click to shoot. Press E to change weapons, R to reload, Q to throw grenades, and F to smash an enemy with your egg. Different class weapons suit different situations — the EggK-47 (automatic) is versatile for beginners, while the RPEGG (rocket launcher) delivers devastating area damage.`,
    tips: [
      "Always strafe (move sideways) while shooting — a stationary egg is an easy target for experienced players.",
      "Learn to aim for the head — headshots deal significantly more damage and kill faster.",
      "The Free Ranger class with a sniper rifle can dominate open maps by holding power positions and picking off enemies.",
      "Reload between engagements, not during — running out of ammo mid-fight is a death sentence.",
    ],
  },

  // ─── DRIFT HUNTERS ───────────────────────────────────────────────────────────
  "drift-hunters": {
    about: `<p><strong>Drift Hunters</strong> is arguably the most realistic and visually impressive drifting game available as a free browser experience. Built on Unity WebGL, it features authentic drift physics, a massive garage of 25+ real-world-inspired cars, and multiple beautifully rendered tracks including a mountain pass, a stadium, and a car park.</p>
    <p>The game's physics engine simulates weight transfer, tire grip, smoke intensity, and engine torque with remarkable accuracy. You earn in-game currency for drifting — the longer your drift angle and chain, the more points and money you accumulate. Cars can be upgraded with turbochargers, suspension kits, brake upgrades, and custom paint jobs.</p>`,
    howToPlay: `Use Arrow keys or WASD to drive, and Spacebar for the handbrake (essential for initiating drifts). To drift: approach a corner at speed, tap the handbrake to break rear traction, then counter-steer (turn opposite to the direction of the slide) to maintain the drift. Manage throttle input to control drift angle — too much gas spins you out, too little kills the drift.`,
    tips: [
      "Invest in the Turbocharger upgrade first — more power means it's easier to break traction and initiate drifts.",
      "The drift angle score multiplier rewards longer, more aggressive drifts — aim for 70°+ angles consistently.",
      "Lowering the suspension in the tuning menu gives better handling but reduces comfort on bumpy tracks.",
      "Mountain tracks reward precise tandem-style drifting around corners — mastering them yields the highest points.",
    ],
  },

  // ─── GEOMETRY DASH ───────────────────────────────────────────────────────────
  "geometry-dash": {
    about: `<p><strong>Geometry Dash</strong> is an iconic rhythm-based platformer that has captivated millions of players worldwide. You control a customizable icon (cube, ship, ball, UFO, wave, robot) that moves automatically through obstacle-filled courses perfectly synchronized to high-energy electronic music. The core challenge is tapping at precisely the right millisecond to jump, fly, or transform.</p>
    <p>The game features officially designed levels across multiple difficulty tiers (Easy, Normal, Hard, Insane, Demon) as well as an enormous catalog of player-created levels shared through the online level editor. The community has produced some of the most technically demanding and visually stunning game levels ever designed by hobbyists.</p>`,
    howToPlay: `Click or press Spacebar/Up Arrow to make your icon jump. The timing of your clicks must perfectly match the rhythm of the music and the placement of obstacles. In ship mode, hold to fly up, release to drop. In wave mode, hold to go diagonally up, release to go diagonally down. Practice Mode lets you place checkpoints to master individual sections.`,
    tips: [
      "Always use Practice Mode to learn a level section by section before attempting a full clean run.",
      "Listen to the music closely — the beat cues are perfectly aligned with obstacle placement in official levels.",
      "Keep your eyes slightly ahead of your icon, not directly on it, to anticipate upcoming obstacles.",
      "Levels like 'Stereo Madness' and 'Back On Track' are perfect for beginners — master them before moving up in difficulty.",
    ],
  },

  // ─── COOKIE CLICKER ──────────────────────────────────────────────────────────
  "cookie-clicker": {
    about: `<p><strong>Cookie Clicker</strong> is the game that defined the idle/incremental genre. Starting with a single cookie, you click to generate cookies, then purchase increasingly absurd production buildings — Grandmas, Farms, Factories, Banks, Temples, Wizard Towers, Portals, Time Machines, and even Antimatter Condensers — that automatically generate cookies for you.</p>
    <p>The game's satirical humor, constantly escalating numbers, and deeply complex upgrade tree have made it a cult classic since 2013. What appears to be a mindless clicking game reveals itself to be a surprisingly strategic production optimization puzzle as you work toward billions, trillions, and ultimately "googolplex" cookies. The game also features seasonal events with unique content.</p>`,
    howToPlay: `Click the giant cookie on the left side of the screen to earn cookies. Use earned cookies to purchase Buildings on the right panel — each building produces cookies per second automatically. Unlock Upgrades in the middle panel for massive efficiency multipliers. Prestige by ascending when your cookie count is high enough to earn Heavenly Chips, which provide a permanent production bonus.`,
    tips: [
      "Prioritize buying upgrades before buildings — upgrades provide disproportionately large production multipliers.",
      "Golden Cookies appear randomly on screen — always click them for massive bonus bursts of production.",
      "Ascending (Prestiging) at 365 Heavenly Chips is the optimal first ascension point for long-term progress.",
      "The 'Grandmapocalypse' is triggered by certain upgrades and unlocks Wrinklers — let them feed on your cookie aura as they return 110% of consumed cookies when popped.",
    ],
  },

  // ─── MINECRAFT CLASSIC ───────────────────────────────────────────────────────
  "minecraft-classic": {
    about: `<p><strong>Minecraft Classic</strong> is the official free browser version of Minecraft's original 2009 alpha build, released by Mojang to celebrate the game's 10th anniversary. It preserves the raw, unfiltered experience of the very first publicly available Minecraft — a simple but groundbreaking creative sandbox where you can place and destroy 32 types of colorful blocks to build anything imaginable.</p>
    <p>Unlike the modern commercial version of Minecraft, Classic has no survival mechanics, no crafting, no enemies, and no hunger. It's a pure, unlimited creative mode experience. Up to 9 players can join the same world simultaneously, making it a fantastic multiplayer building experience directly from a browser.</p>`,
    howToPlay: `Use WASD to move, mouse to look around, and left-click to destroy blocks. Right-click to place the currently selected block. Press E to open your block inventory and select materials. Press T to open the chat (and invite friends to your multiplayer world). Jump with Space, and double-tap Space to toggle flight mode.`,
    tips: [
      "Double-tap Space to activate creative flight — holding Space goes up, Shift goes down.",
      "Build with a color scheme in mind from the start — Minecraft Classic's limited palette works best with intentional contrast.",
      "Share your world code (visible in the URL) with up to 8 friends to collaborate on massive builds.",
      "Use the number keys 1-9 to quickly switch between your nine hotbar blocks without opening inventory.",
    ],
  },

  // ─── 2048 ─────────────────────────────────────────────────────────────────────
  "2048": {
    about: `<p><strong>2048</strong> is an addictive single-player sliding tile puzzle game. The playing field is a 4×4 grid filled with numbered tiles. You slide all tiles simultaneously in one of four directions (up, down, left, right). When two tiles with the same number collide, they merge into a single tile with their combined value. The goal is to create a tile with the number 2048.</p>
    <p>Created by Gabriele Cirulli in a single weekend in 2014, 2048 became a global phenomenon within days. Its elegant simplicity conceals significant strategic depth — experienced players routinely exceed 32,768 and even 65,536. It's a perfect browser game for training logical thinking and pattern recognition.</p>`,
    howToPlay: `Use Arrow keys (or WASD) to slide all tiles on the board in that direction. Any two tiles with matching numbers that collide during a slide will merge into one tile with double the value. New tiles (value 2 or 4) appear randomly on the board after each move. The game ends when no valid moves remain. Try to keep your highest-value tile in a corner.`,
    tips: [
      "The 'corner strategy' is the most reliable technique: park your highest tile in a bottom-right corner and never move it away.",
      "Prioritize horizontal swipes (left/right) in the early game to build up tile values without scattering them.",
      "Never move up unless absolutely necessary — upward swipes break the corner strategy and scatter high tiles.",
      "Keep your tiles in a snake-like descending pattern (highest to lowest) along the bottom row for clean merges.",
    ],
  },

  // ─── BASKETBALL STARS ────────────────────────────────────────────────────────
  "basketball-stars": {
    about: `<p><strong>Basketball Stars</strong> is a dynamic, physics-based 1v1 and 2v2 basketball game developed by Miniclip. You compete against real opponents online in fast, arcade-style matches that reward precision shooting, smart dribbling, and reading your opponent's movements. The game features licensed NBA player caricatures as unlockable characters.</p>
    <p>Unlike simulation basketball games, Basketball Stars focuses on the pure fun of one-on-one street basketball. Spectacular dunk animations, satisfying net swishes, and real-time multiplayer make it one of the most engaging sports browser games available. Its skill-based matchmaking ensures you always face opponents at your level.</p>`,
    howToPlay: `Use WASD or Arrow keys to move your player. Press the Shoot button (or Space/Up) to shoot — hold to charge for more power and release at the peak of your jump for best accuracy. Use the Dribble button to perform skill moves and shake your defender. In defense mode, position between the ball and basket and time your jump steal attempts carefully.`,
    tips: [
      "Charge your shot to roughly 80% power and release at the top of your jump arc for the highest shooting percentage.",
      "Perform pump fakes (quick partial charge and release) to get your defender off their feet, then drive to the basket.",
      "Stay between your opponent and the basket on defense — don't chase the ball handler, cut off their angles instead.",
      "Unlock and upgrade NBA-player characters — higher-rated characters have better speed, shooting, and block stats.",
    ],
  },

  // ─── TEMPLE RUN ──────────────────────────────────────────────────────────────
  "temple-run": {
    about: `<p><strong>Temple Run Online</strong> is the browser-playable version of the legendary mobile endless runner that pioneered the genre. You play as an explorer who has stolen a cursed idol from an ancient temple and must sprint through treacherous jungle ruins while being chased by a pack of demonic monkeys. The run never ends — you survive for as long as your reflexes hold up.</p>
    <p>Temple Run introduced swiping mechanics (replicated here with keys) that have since become a genre standard. As you run, you collect coins, activate powerups like shields and coin magnets, and unlock new characters with unique abilities. The game features exponentially increasing speed, making later stages intensely challenging.</p>`,
    howToPlay: `Use Arrow keys to respond to obstacles: Left/Right Arrows to turn at junctions, Up Arrow to jump over barriers, and Down Arrow to slide under hanging obstacles. Tilt left and right (A/D keys) to collect coins along the path edges. Time your jumps carefully — jumping too early or too late will clip the obstacle and end your run.`,
    tips: [
      "Focus on upgrading the Coin Value multiplier and Coin Magnet first — they compound your earnings fastest.",
      "Listen for the audio cue before turns — a distinct thud sound signals an upcoming turn in many levels.",
      "Activate powerups immediately when you collect them — the Shield powerup saved from a previous run doesn't carry over.",
      "Run near the inside of curves to automatically collect coins that appear along the path edges.",
    ],
  },

  // ─── FNAF ─────────────────────────────────────────────────────────────────────
  "fnaf": {
    about: `<p><strong>Five Nights at Freddy's (FNAF)</strong> is the iconic horror strategy game that spawned an entire multimedia franchise. You are a new night security guard at Freddy Fazbear's Pizza, tasked with surviving five nights of the 12 AM–6 AM shift. The twist: the restaurant's beloved animatronic animal mascots — Freddy, Bonnie, Chica, and Foxy — become dangerously active at night and will try to reach your office.</p>
    <p>FNAF is a masterclass in tension design. You must monitor security cameras across the restaurant, manage limited door-closing power, and track the movements of all four animatronics simultaneously. Running out of power before 6 AM is catastrophic. The game went viral in 2014 for its unique atmosphere and is considered a landmark indie game.</p>`,
    howToPlay: `Click the camera monitor button at the bottom of your screen to check live camera feeds. Flick through camera angles to locate each animatronic. If Bonnie or Chica approach, close the corresponding door light and check the blind spot — if you see them, close the door. Foxy charges down the hall — close the left door immediately when he moves. Watch your power meter at the bottom left.`,
    tips: [
      "Keep camera checks brief — every second you have the monitor up drains power. Quick peeks are more efficient than long stares.",
      "Foxy is the trickiest animatronic — check Pirate Cove frequently (every 1-2 minutes) to delay his charging.",
      "If you're low on power late in the night, keep the monitor down and only use lights to check blind spots.",
      "Bonnie tends to attack from the left and Chica from the right — prioritize checking those cameras first.",
    ],
  },

  // ─── RAFT WARS ───────────────────────────────────────────────────────────────
  "raft-wars": {
    about: `<p><strong>Raft Wars</strong> is a delightfully charming turn-based artillery game featuring two young brothers who discover buried treasure on the beach, only to have it coveted by pirates, Vikings, and the government. You control the brothers from their raft, firing tennis balls (and eventually explosives) in parabolic arcs at enemy boats while trying to knock the opponents off their vehicles.</p>
    <p>The game's simple physics feel incredibly satisfying — shots ricochet off enemies, the water bounces projectiles, and a well-aimed shot can chain across an entire enemy lineup. Between levels you spend treasure earnings to upgrade your arsenal. Raft Wars remains one of the most beloved casual browser games ever created.</p>`,
    howToPlay: `Click and drag on your brother to set the angle and power of your shot — a trajectory preview is shown. Release to fire. Aim for the head/chest area of enemies for maximum knockback. You get multiple shots per turn based on your squad size. Between rounds, purchase upgrades using your treasure: better ammunition, a grenade launcher, or reinforced raft armor.`,
    tips: [
      "Aim slightly higher than you expect — the parabolic arc means shots always drop; leading your target upward compensates.",
      "The grenade launcher is the best early investment — it deals area damage and can eliminate multiple enemies per shot.",
      "Bouncing shots off the water surface can hit enemies that are shielded by your angle — learn the bounce mechanics.",
      "Protect your brothers by buying armor upgrades — enemies deal more damage per hit in later levels.",
    ],
  },

  // ─── AMONG US ────────────────────────────────────────────────────────────────
  "among-us": {
    about: `<p><strong>Among Us Online</strong> brings the hugely popular social deduction game to your browser. Set aboard a spaceship, space station, or planet base, you and your crewmates must complete maintenance tasks to prepare for departure. However, hidden among the crew are Impostors whose only goal is to sabotage the mission and eliminate crewmates without being caught.</p>
    <p>The tension between crewmates trying to figure out who the Impostor is, and the Impostor's attempts to blend in and gaslight the group, creates uniquely entertaining social drama. Among Us became a global cultural phenomenon in 2020 and its play patterns — from emergency meetings to venting — have entered mainstream internet culture.</p>`,
    howToPlay: `Move with WASD or Arrow keys. As a Crewmate, complete all assigned tasks shown on the task list (top left). Report dead bodies by pressing R or the Report button. In Emergency Meetings, discuss and vote to eject the person you believe is the Impostor. As an Impostor, use vents to travel quickly, create sabotages, and eliminate isolated crewmates.`,
    tips: [
      "As a Crewmate, always do tasks near other players — being seen completing tasks proves your innocence.",
      "As Impostor, fake tasks in highly-visible areas to build trust with crewmates before striking.",
      "Track where each player was during an emergency meeting — an Impostor caught near a death site is a major red flag.",
      "Electrical, Cameras, and Medbay are some of the most strategic rooms — always monitor who passes through them.",
    ],
  },
};
