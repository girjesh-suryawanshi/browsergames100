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
    title: 'Play HTML5 Games Unblocked',
    description: 'Play the best high-quality HTML5 games unblocked directly in your browser. No download required. Experience fast, seamless cloud gaming today.',
    keywords: 'play HTML5 games, HTML5 games unblocked, premium browser games, no download games',
    collectionTitle: 'Top Rated HTML5 Games',
    content: `
      <h2>The Ultimate Destination for HTML5 Gaming</h2>
      <p>Welcome to CloudPlayHub, the premier portal to <strong>play HTML5 games unblocked</strong>. We utilize cutting-edge web technology to bring you high-fidelity gaming experiences right in your browser. Whether you're on a high-end PC or a standard Chromebook, our platform ensures maximum performance and zero lag.</p>
      
      <h3>Why HTML5?</h3>
      <p>HTML5 represents the pinnacle of modern web development, allowing us to bypass the need for third-party plugins or cumbersome app downloads. Every title in our library runs natively, meaning you get faster load times, better graphics, and enhanced security compared to older Flash-based sites.</p>
    `
  },
  'free-browser-games': {
    slug: 'free-browser-games',
    title: 'Free Browser Games No Download',
    description: 'Discover thousands of free browser games with no download. Enjoy premium cloud gaming experiences instantly on any device.',
    keywords: 'free browser games, no download games, instant play games, cloud gaming free',
    collectionTitle: 'Instant Play Browser Games',
    content: `
      <h2>Instant Gaming Without Limits</h2>
      <p>In a digital landscape filled with massive install files and constant updates, CloudPlayHub champions the power of <strong>free browser games</strong>. Our mission is to provide you with instant access to thousands of premium titles with absolutely no downloads or installations required.</p>
      
      <h3>Cloud Gaming Redefined</h3>
      <p>We leverage advanced cloud infrastructure to stream lightweight game assets directly to your device. From expansive multiplayer arenas to complex puzzle games, experience the thrill of next-generation cloud gaming directly through your favorite web browser.</p>
    `
  },
  'cloud-gaming-unblocked': {
    slug: 'cloud-gaming-unblocked',
    title: 'Cloud Gaming Unblocked for PC & Chromebook',
    description: 'Access the best cloud gaming unblocked library. Play top-tier games smoothly on restricted networks and school Chromebooks.',
    keywords: 'cloud gaming unblocked, cloud games for school, chromebook cloud gaming, unblocked cloud platforms',
    collectionTitle: 'Premium Cloud Gaming',
    content: `
      <h2>Seamless Cloud Gaming on Any Network</h2>
      <p>Network restrictions shouldn't stop you from enjoying high-quality entertainment. CloudPlayHub is engineered to deliver <strong>cloud gaming unblocked</strong> experiences even on highly restricted networks, such as school or corporate WiFi setups. Our platform is fully optimized for ChromeOS and low-end hardware.</p>
      
      <h3>Safe, Secure, and Blazing Fast</h3>
      <p>By shifting the heavy lifting from your device's processor to our optimized servers, we ensure that every game runs at maximum frame rates. Play intensive 3D games and massive multiplayer titles without ever seeing a "blocked" or "insufficient storage" warning again.</p>
    `
  },
  'poki-alternative': {
    slug: 'poki-alternative',
    title: 'Best Poki Alternative for Free Games',
    description: 'Looking for a Poki alternative? CloudPlayHub offers a curated selection of premium, ad-free-feeling browser games without annoying pop-ups.',
    keywords: 'poki alternative, crazygames alternative, sites like poki, better than poki, free games like crazygames',
    collectionTitle: 'Curated Premium Games',
    content: `
      <h2>The Premium Alternative to Mainstream Portals</h2>
      <p>If you're tired of intrusive ads, slow load times, and overwhelming layouts, you've found the perfect <strong>Poki alternative</strong>. CloudPlayHub prioritizes user experience above all else. We provide a clean, modern interface where the games take center stage.</p>
      
      <h3>A Hand-Picked Library</h3>
      <p>We believe in quality over quantity. Instead of overwhelming you with thousands of broken links, we manually test and curate every single title. Discover why gamers globally are making the switch to our cleaner, faster gaming ecosystem.</p>
    `
  },
  'unblocked-racing-games': {
    slug: 'unblocked-racing-games',
    title: 'Unblocked Racing Games - High Speed Fun',
    description: 'Burn rubber with the best unblocked racing games. Play high-octane 3D car and bike games directly in your browser.',
    keywords: 'unblocked racing games, racing games no download, 3d car games unblocked, drift games browser',
    collectionTitle: 'High Speed Racing Collection',
    content: `
      <h2>Experience Next-Gen Browser Racing</h2>
      <p>Get behind the wheel with our elite collection of <strong>unblocked racing games</strong>. Utilizing modern WebGL technology, we bring console-quality physics, realistic drifting mechanics, and competitive multiplayer races straight to your browser. No steering wheel required!</p>
      
      <h3>Compete on the Global Leaderboards</h3>
      <p>Challenge players from around the world in real-time multiplayer lobbies. Whether you prefer aggressive street racing or precision track drifting, our servers are optimized to ensure low-latency, lag-free competition.</p>
    `
  }
};
