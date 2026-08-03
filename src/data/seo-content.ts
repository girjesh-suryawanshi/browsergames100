export interface SEOContent {
  slug: string;
  title: string;
  description: string;
  keywords: string;
  content: string;
  collectionTitle: string;
}

export const landingPages: Record<string, SEOContent> = {
  'play-html5-games': {
    slug: 'play-html5-games',
    title: 'Play HTML5 Games Free — No Download, No Install',
    description: 'Play the best HTML5 games free in your browser. No download, no Flash plugin. Thousands of action, puzzle, and racing games ready to play instantly on any device.',
    keywords: 'play HTML5 games, HTML5 games unblocked, free browser games, no download games, HTML5 game site',
    collectionTitle: 'Top Rated HTML5 Games',
    content: `
      <h2>What Are HTML5 Games and Why Are They Better?</h2>
      <p>HTML5 games run entirely in your web browser using modern web standards — no Flash, no Unity plugin, no app store. That means you can go from "I want to play a game" to actually playing one in under ten seconds, on any device you happen to be using.</p>

      <p>BrowserGames100 hosts over 28,000 HTML5 games across every genre imaginable. Whether you're into fast-paced action, brain-teasing puzzles, high-speed racing, or relaxing idle games, you'll find something that clicks within minutes of visiting the site.</p>

      <h3>Why HTML5 Games Work Where Others Don't</h3>
      <p>The old days of browser gaming required Flash Player, which is now permanently discontinued. HTML5 games replaced Flash entirely and work better in every way: they load faster, work on mobile devices, don't crash browsers, and run on Chromebooks without any special setup. If your browser can load a website, it can play an HTML5 game.</p>

      <p>BrowserGames100 is built specifically around HTML5 performance. Every game in our catalog is tested for load speed, visual quality, and control responsiveness. If a game doesn't meet our standards, it doesn't go in the catalog — simple as that.</p>

      <h3>Common Questions About HTML5 Games</h3>
      <p><strong>Do HTML5 games require internet?</strong> Yes, they load over the internet the first time. But many HTML5 games continue running even if your connection drops briefly, since the game logic runs in your browser.</p>

      <p><strong>Are HTML5 games safe?</strong> HTML5 games on BrowserGames100 are embedded from trusted game networks and are reviewed for content. They cannot install software on your device or access your files.</p>

      <p><strong>Do they work on phones?</strong> Yes. Most HTML5 games on BrowserGames100 are mobile-compatible and include touch controls.</p>
    `
  },
  'free-browser-games': {
    slug: 'free-browser-games',
    title: 'Free Browser Games — Play Instantly, No Download',
    description: 'Discover thousands of free browser games you can play right now with no download, no login, and no cost. Works on any device with a web browser.',
    keywords: 'free browser games, no download games, instant play games, free online games, games no install',
    collectionTitle: 'Instant Play Browser Games',
    content: `
      <h2>Free Browser Games: Play Right Now, No Strings Attached</h2>
      <p>There was a time when playing a decent game meant a long download, a multi-GB installation, and a restart. Those days are gone. Modern browser games give you the same quality of entertainment without any of that friction — and on BrowserGames100, they're completely free.</p>

      <p>Every game on our platform loads directly in your browser tab. Click play, and you're in. No account creation, no credit card, no "free trial" with hidden costs. Just games, available to anyone with a browser.</p>

      <h3>What Kinds of Free Browser Games Are Available?</h3>
      <p>BrowserGames100's catalog covers more than 20 genres:</p>
      <p><strong>Action games</strong> like Slope, 1v1.LOL, and Shell Shockers for players who want fast-paced competition. <strong>Puzzle games</strong> like 2048 and physics puzzlers for players who prefer to think before they act. <strong>Racing games</strong> like Drift Hunters for speed enthusiasts who want realistic driving physics in a browser. <strong>Strategy games</strong> for players who enjoy building, planning, and commanding. <strong>Multiplayer .io games</strong> for real-time competition against players around the world.</p>

      <p>All of these are free. All of them work in your browser right now.</p>

      <h3>Why BrowserGames100 Is Different</h3>
      <p>Most game sites list every HTML5 game they can find, regardless of quality. BrowserGames100 takes a different approach: we manually test every game before it goes into the catalog. If it's slow, broken, or just not fun, it doesn't make the cut. The result is a library of games that actually work and are worth your time.</p>
    `
  },
  'cloud-gaming-unblocked': {
    slug: 'cloud-gaming-unblocked',
    title: 'Unblocked Cloud Gaming — Play on School or Work Networks',
    description: 'Play free unblocked games that work on school Chromebooks, restricted networks, and office Wi-Fi. No VPN needed. Fast loading on any connection.',
    keywords: 'cloud gaming unblocked, unblocked games school, chromebook games, games for school, play games on school wifi',
    collectionTitle: 'Unblocked Games for School',
    content: `
      <h2>Unblocked Games That Work on School and Work Networks</h2>
      <p>If you've ever tried to play a game on a school Chromebook only to hit a firewall or a "site blocked" message, you know how frustrating it is. BrowserGames100 is built specifically to work on the kinds of restricted networks you find in schools, universities, and offices.</p>

      <p>Our games are browser-based HTML5 titles that don't trigger content filters the way dedicated gaming sites or game launchers sometimes do. They load quickly over standard HTTPS connections and don't require any special ports or network permissions.</p>

      <h3>Why Our Games Work on Chromebooks</h3>
      <p>ChromeOS doesn't support Windows applications or Flash, which rules out most traditional games. But HTML5 games run natively in the Chrome browser — the same browser that comes with every Chromebook from day one. No extensions, no developer mode, no workarounds needed.</p>

      <p>BrowserGames100 games are also optimized for lower-bandwidth connections. We use efficient image loading and lightweight game assets so that games perform well even on shared school Wi-Fi where 30 students might be connected at once.</p>

      <h3>Is It Okay to Play Games at School?</h3>
      <p>That depends on your school's policies and when you're playing. Many students use BrowserGames100 during lunch, free periods, or after school using school equipment. The platform has no chat features, no social elements that could distract others, and no content that violates typical school acceptable use policies. We host only general-audience games.</p>

      <p>Always respect your school's rules. BrowserGames100 isn't responsible for how or when you choose to access the platform.</p>
    `
  },
  'poki-alternative': {
    slug: 'poki-alternative',
    title: 'Best Poki Alternative — Free Browser Games Without the Clutter',
    description: 'Looking for a Poki alternative? BrowserGames100 offers thousands of free browser games with a cleaner interface, faster loading, and better curation. Try it free.',
    keywords: 'poki alternative, games like poki, crazygames alternative, best free game sites, sites like poki',
    collectionTitle: 'Top Free Browser Games',
    content: `
      <h2>Looking for a Poki Alternative? Here's What BrowserGames100 Offers</h2>
      <p>Poki and CrazyGames are well-known browser gaming platforms, and they have huge catalogs. But bigger doesn't always mean better. If you've found those sites overwhelming, slow to load, or frustrating to navigate, BrowserGames100 was built as a cleaner, faster alternative.</p>

      <p>We focus on three things: game quality, page performance, and a straightforward browsing experience. You won't find endless category pages that lead to dead links, games that don't load, or confusing navigation that makes it hard to find what you actually want to play.</p>

      <h3>What Makes BrowserGames100 Different From Poki?</h3>
      <p><strong>Manual curation:</strong> Every game in our catalog is tested before it goes live. We remove games that don't work, load too slowly, or deliver a poor experience. Poki and similar sites often auto-import thousands of games without this level of review.</p>

      <p><strong>Performance focus:</strong> BrowserGames100 is optimized for fast load times, especially on Chromebooks and school networks. We use CDN delivery, lazy loading, and compressed assets to get games in front of you as quickly as possible.</p>

      <p><strong>Clean interface:</strong> Our site is designed to put games front and center. The layout is straightforward — browse by category, search by title, or check trending games. No confusing menus, no mandatory account creation pop-ups.</p>

      <h3>Does BrowserGames100 Have the Same Games as Poki?</h3>
      <p>Many popular HTML5 games appear on multiple platforms since developers license their games to various portals. You'll find many titles on BrowserGames100 that also appear on Poki, including popular action, puzzle, and racing games. You'll also find games exclusive to our platform and sourced from game networks that Poki doesn't work with.</p>
    `
  },
  'unblocked-racing-games': {
    slug: 'unblocked-racing-games',
    title: 'Unblocked Racing Games — Free Browser Racing, No Download',
    description: 'Play the best unblocked racing games free in your browser. Drift simulators, kart racers, and motorbike games that work on Chromebooks with no download.',
    keywords: 'unblocked racing games, racing games no download, 3d car games browser, drift games unblocked, car games school',
    collectionTitle: 'Free Racing Games',
    content: `
      <h2>Unblocked Racing Games: Full-Speed Fun in Your Browser</h2>
      <p>Racing games are one of the most popular categories on BrowserGames100, and it's easy to understand why. There's something universally satisfying about pushing a car to its limits through a tight corner, executing a perfect drift, or edging out a competitor at the finish line.</p>

      <p>Our collection of unblocked racing games covers every style of speed-based gameplay: realistic drift simulators, kart racers, motorbike stunt games, formula racing, demolition derbies, and more. All of them work in your browser without a download, and most of them run perfectly on Chromebooks.</p>

      <h3>Types of Racing Games on BrowserGames100</h3>
      <p><strong>Drift simulators</strong> like Drift Hunters use physics engines that simulate real weight transfer, tire grip, and throttle control. They reward precise technique and are endlessly satisfying once you learn the mechanics.</p>

      <p><strong>Kart racers</strong> are more accessible and fun for casual players. They feature power-ups, animated tracks, and the kind of chaotic multiplayer action that makes them great for short sessions.</p>

      <p><strong>3D road racers</strong> put you in a cockpit or behind the wheel for high-speed highway or circuit races with traffic, upgrades, and leaderboard competition.</p>

      <h3>Do Racing Games Work on Chromebooks?</h3>
      <p>Yes. All racing games in our catalog are HTML5-based. Even our most graphically impressive titles like Drift Hunters (which uses WebGL for 3D rendering) run smoothly on mid-range Chromebooks. We test every racing game on Chromebook hardware before listing it, so you won't waste time clicking on a game that just shows a blank screen.</p>
    `
  }
};
