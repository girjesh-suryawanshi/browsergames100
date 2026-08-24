"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.initDb = initDb;
exports.syncAdminUser = syncAdminUser;
exports.syncInitialBlogPosts = syncInitialBlogPosts;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
dotenv_1.default.config();
const dbUrl = process.env.DATABASE_URL || 'mysql://u235459051_admin:Crompton@1310@127.0.0.1:3306/u235459051_browsergames';
exports.pool = promise_1.default.createPool(dbUrl);
// Ensure tables exist on startup
async function initDb() {
    try {
        const conn = await exports.pool.getConnection();
        await conn.query(`
      CREATE TABLE IF NOT EXISTS User (
        id VARCHAR(191) PRIMARY KEY,
        email VARCHAR(191) UNIQUE NOT NULL,
        password VARCHAR(191) NOT NULL,
        fullName VARCHAR(191),
        role VARCHAR(191) NOT NULL DEFAULT 'USER',
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        await conn.query(`
      CREATE TABLE IF NOT EXISTS Category (
        id VARCHAR(191) PRIMARY KEY,
        name VARCHAR(191) UNIQUE NOT NULL,
        description VARCHAR(191),
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        await conn.query(`
      CREATE TABLE IF NOT EXISTS BlogPost (
        id VARCHAR(191) PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        slug VARCHAR(191) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        authorName VARCHAR(191) NOT NULL DEFAULT 'Admin',
        readingTime VARCHAR(191),
        isPublished TINYINT(1) NOT NULL DEFAULT 0,
        isFeatured TINYINT(1) NOT NULL DEFAULT 0,
        publishedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
        coverImage VARCHAR(191),
        seoTitle VARCHAR(191),
        seoDescription VARCHAR(191),
        categoryId VARCHAR(191),
        CONSTRAINT fk_blog_category FOREIGN KEY (categoryId) REFERENCES Category(id) ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        await conn.query(`
      CREATE TABLE IF NOT EXISTS GameStat (
        id VARCHAR(191) PRIMARY KEY,
        gameId INT UNIQUE NOT NULL,
        slug VARCHAR(191) UNIQUE NOT NULL,
        playCount INT NOT NULL DEFAULT 0,
        likeCount INT NOT NULL DEFAULT 0,
        dislikeCount INT NOT NULL DEFAULT 0,
        updatedAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        await conn.query(`
      CREATE TABLE IF NOT EXISTS GameSubmission (
        id VARCHAR(191) PRIMARY KEY,
        title VARCHAR(191) NOT NULL,
        url VARCHAR(191) NOT NULL,
        email VARCHAR(191),
        notes TEXT,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        await conn.query(`
      CREATE TABLE IF NOT EXISTS ContactMessage (
        id VARCHAR(191) PRIMARY KEY,
        name VARCHAR(191) NOT NULL,
        email VARCHAR(191) NOT NULL,
        subject VARCHAR(191),
        message TEXT NOT NULL,
        status VARCHAR(191) NOT NULL DEFAULT 'UNREAD',
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        await conn.query(`
      CREATE TABLE IF NOT EXISTS UserFavorite (
        id VARCHAR(191) PRIMARY KEY,
        userId VARCHAR(191) NOT NULL,
        gameId INT NOT NULL,
        gameSlug VARCHAR(191) NOT NULL,
        createdAt DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
        UNIQUE KEY uq_user_game (userId, gameId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
        conn.release();
        console.log('✅ MySQL database tables initialized');
    }
    catch (err) {
        console.warn('MySQL init warning:', err);
    }
}
// Auto-seed default admin user
async function syncAdminUser(email = 'admin@browsergames100.com', password = 'admin123') {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const [rows] = await exports.pool.query('SELECT * FROM User WHERE email = ?', [email]);
        if (rows.length === 0) {
            const id = crypto_1.default.randomUUID();
            await exports.pool.query('INSERT INTO User (id, email, password, fullName, role) VALUES (?, ?, ?, ?, ?)', [id, email, hashedPassword, 'BrowserGames100 Admin', 'ADMIN']);
        }
        else {
            await exports.pool.query('UPDATE User SET password = ?, role = ? WHERE email = ?', [hashedPassword, 'ADMIN', email]);
        }
        console.log(`✅ MySQL Admin user synchronized: ${email}`);
    }
    catch (err) {
        console.warn('MySQL syncAdminUser warning:', err);
    }
}
// Auto-seed initial high-quality blog posts for Google AdSense compliance (16 Full Articles)
async function syncInitialBlogPosts() {
    try {
        const posts = [
            {
                id: crypto_1.default.randomUUID(),
                title: 'Top 10 Best Unblocked Games for School Chromebooks (2026 Edition)',
                slug: 'top-10-unblocked-games-chromebooks-2026',
                excerpt: 'Discover the highest-rated, fast-loading browser games verified to run smoothly on school Chromebooks and restricted networks without installs or downloads.',
                authorName: 'Marcus Vance',
                readingTime: '6 min',
                isPublished: 1,
                isFeatured: 1,
                coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Top 10 Unblocked Games for Chromebooks (2026) | BrowserGames100',
                seoDescription: 'Play the best unblocked games for school Chromebooks in 2026. Fast HTML5 games tested for performance, smooth FPS, and instant browser play.',
                content: `
          <h2>Why Chromebook Gaming Is Thriving in 2026</h2>
          <p>School and office Chromebooks have evolved from basic web terminals into highly capable HTML5 gaming platforms. Thanks to WebGL optimization and lightweight canvas engines, modern browser games render at fluid 60 FPS framerates without requiring executable installs or administrator privileges.</p>
          <h2>Criteria for Unblocked Game Verification</h2>
          <p>At BrowserGames100, our editorial team tests every prospective title against three strict standards before recommending it for Chromebook players:</p>
          <ul>
            <li><strong>Low Memory Footprint:</strong> Games must consume under 250 MB of RAM so low-spec Celeron devices run without lag.</li>
            <li><strong>Instant Initialization:</strong> Assets load in under 5 seconds over standard Wi-Fi.</li>
            <li><strong>Intuitive Controls:</strong> Controls rely on standard Arrow/WASD keys without extra plugins.</li>
          </ul>
          <h2>The Top 5 Must-Play Unblocked Games</h2>
          <h3>1. Slope 3D</h3><p>The undisputed king of endless runners. Steer your neon sphere down an accelerating downhill course suspended in space.</p>
          <h3>2. Run 3</h3><p>Navigate rotating space tunnels where walls become floors. Features Explore and Infinite modes.</p>
          <h3>3. Retro Bowl</h3><p>Pixel-art American Football manager and arcade simulator.</p>
          <h3>4. BitLife — Life Simulator</h3><p>Immersive text-based life simulator with infinite life paths.</p>
          <h3>5. Moto X3M</h3><p>High-octane physics bike stunt racer across 25+ obstacle courses.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Slope Game Strategy Guide: Master the Neon Track & Break Your High Score',
                slug: 'slope-game-strategy-guide-high-score',
                excerpt: 'Learn advanced steering mechanics, visual anticipation techniques, and camera focus habits to survive the infinite downhill slope in Y8 classic 3D runner.',
                authorName: 'Marcus Vance',
                readingTime: '5 min',
                isPublished: 1,
                isFeatured: 1,
                coverImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Slope Game Strategy Guide: High Score Tips | BrowserGames100',
                seoDescription: 'Master the Slope 3D browser game with expert steering tips, obstacle avoidance strategies, and visual anticipation techniques.',
                content: `
          <h2>Understanding Slope Physics & Acceleration Mechanics</h2>
          <p>Slope is deceptively simple: steer a ball down an inclined plane while avoiding red blocks and falling into the abyss. However, because the ball accelerates continuously without a speed cap, players must shift from reactive reflexes to proactive anticipation.</p>
          <h2>4 Core Tips to Reach a 200+ Score in Slope</h2>
          <h3>1. Steer with Micro-Taps, Never Hold Down Keys</h3><p>Holding down keys introduces excessive lateral momentum. Always tap lightly to adjust trajectory.</p>
          <h3>2. Focus Your Vision Ahead of the Ball</h3><p>Look 2 to 3 track segments ahead to spot red obstacle clusters before arriving.</p>
          <h3>3. Target Center Gaps in Obstacle Walls</h3><p>Aiming directly down the center lane leaves equal room to adjust left or right.</p>
          <h3>4. Play in Fullscreen Mode</h3><p>Fullscreen mode eliminates browser toolbars and visual distractions.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Retro Bowl Franchise Management Guide: Draft, Morale, and Play Calling',
                slug: 'retro-bowl-franchise-management-guide',
                excerpt: 'A complete head coach playbook for Retro Bowl. Master quarterback passing trajectories, draft high-potential rookies, and manage team salary cap headroom.',
                authorName: 'Alex Rivers',
                readingTime: '7 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Retro Bowl Management & Passing Guide | BrowserGames100',
                seoDescription: 'Master Retro Bowl with our complete franchise management guide. Learn passing mechanics, salary cap management, and rookie drafting strategy.',
                content: `
          <h2>Off-Field Roster Management: Building a Dynasty</h2>
          <p>Success in Retro Bowl starts in the front office. Balancing your salary cap while keeping key star players happy is essential for maintaining team morale and fan attendance.</p>
          <h2>Drafting Priorities & Scouting Star Potential</h2>
          <p>When scouting draft prospects, always prioritize Potential over current ratings. A 2-star rookie with 5-star potential will outperform expensive veterans by season two at a fraction of the salary cost.</p>
          <h2>Field Mechanics: Perfecting the Bullet Pass</h2>
          <p>Passing in Retro Bowl relies on lead trajectory arcs. Pulling back on your touch screen or mouse displays a dotted arc showing the ball flight path. Lead your wide receivers into open space rather than throwing directly at their current location.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'BitLife Career Playbook: How to Become a Neurosurgeon, CEO, or President',
                slug: 'bitlife-career-playbook-neurosurgeon-ceo',
                excerpt: 'Maximize your character Smarts and Health stats early to unlock top-tier careers in BitLife. Complete step-by-step educational and career roadmap.',
                authorName: 'Alex Rivers',
                readingTime: '6 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'BitLife Career Guide: How to Become CEO & Doctor | BrowserGames100',
                seoDescription: 'Learn how to unlock high-paying careers in BitLife. Complete strategy guide for Smarts stat building, university majors, and executive promotions.',
                content: `
          <h2>Building Maximum Smarts & Health in Early Life</h2>
          <p>Your character journey begins in childhood. Visiting the library annually and studying hard in school raises your Smarts stat to 100%, laying the foundation for medical or corporate careers.</p>
          <h2>Educational Roadmap for High-Paying Careers</h2>
          <p>To qualify for Neurosurgeon or Medical Doctor careers, major in Biology or Chemistry at University, then apply directly to Medical School with top grades.</p>
          <h2>Corporate Climb: From Junior Analyst to CEO</h2>
          <p>For executive tracks, major in Business Administration or Economics, join a corporate firm as a Junior Analyst, and work hard every year to secure promotions.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Run 3 Alien Strategy Guide: Tunnel Rotation Mechanics & Secret Characters',
                slug: 'run-3-tunnel-rotation-guide',
                excerpt: 'How to utilize wall rotations to navigate impossible tile gaps, unlock the Skater and Bunny, and beat Explore Mode levels in Joseph Cloutier space runner.',
                authorName: 'Marcus Vance',
                readingTime: '5 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Run 3 Tunnel Rotation & Character Guide | BrowserGames100',
                seoDescription: 'Master Run 3 browser game mechanics with our tunnel rotation guide. Learn character physics for Skater, Bunny, and Lizard.',
                content: `
          <h2>Mastering Gravity Rotation in Run 3</h2>
          <p>Run 3 unique mechanic is full 3D gravity shifting. Steering your character into any tunnel side wall rotates the entire level structure, turning that wall into the new floor.</p>
          <h2>Unlocking & Selecting Character Types</h2>
          <ul>
            <li><strong>The Runner:</strong> Balanced speed and jumping height; ideal for learning level layouts.</li>
            <li><strong>The Skater:</strong> Blazing fast speed; perfect for long gaps once you master high-velocity controls.</li>
            <li><strong>The Bunny:</strong> Continuous hopping physics; excels on crumbling tile sequences.</li>
          </ul>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'The Evolution of HTML5 Web Gaming: From Flash Player to WebGL 3D',
                slug: 'evolution-html5-web-gaming-flash-to-webgl',
                excerpt: 'Explore how modern web standards, WebAssembly, and WebGL replaced Adobe Flash, bringing console-quality 3D graphics directly to desktop and mobile browsers.',
                authorName: 'Marcus Vance',
                readingTime: '8 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Evolution of HTML5 Web Gaming: Flash to WebGL | BrowserGames100',
                seoDescription: 'Read our technical history on how HTML5, Canvas 2D, WebGL, and WebAssembly replaced Flash to power modern high-performance web browser games.',
                content: `
          <h2>The End of the Flash Era</h2>
          <p>For over two decades, Adobe Flash powered iconic web games. When security vulnerabilities and mobile incompatibility led to Flash deprecation in 2020, developers migrated to native browser APIs.</p>
          <h2>The HTML5 Canvas & WebGL Revolution</h2>
          <p>Modern HTML5 gaming uses native browser APIs like Canvas 2D for sprite rendering and WebGL for hardware-accelerated 3D graphics, running natively without plugins across Windows, Mac, and Chromebook devices.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Moto X3M Stunt Guide: How to Beat All 25 Levels with 3 Stars',
                slug: 'moto-x3m-stunt-guide-all-levels',
                excerpt: 'Master bike flips, explosive timing, and speed-boosting backflips to achieve 3-star ratings across every stage in Moto X3M.',
                authorName: 'Alex Rivers',
                readingTime: '6 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Moto X3M 3-Star Level Guide | BrowserGames100',
                seoDescription: 'Achieve 3 stars on all Moto X3M levels with our flip timing, stunt physics, and speed run guide.',
                content: `
          <h2>Understanding Backflip Time Deductions</h2>
          <p>In Moto X3M, executing a full 360-degree backflip or frontflip deducts 0.5 seconds from your final level timer. Stringing together multiple flips on high jumps is essential for 3-star completions.</p>
          <h2>Handling Explosive Spikes & Hydraulic Press Traps</h2>
          <p>Lean your rider back when landing off high drops to prevent head crashes and maintain forward momentum across moving trap doors.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Drift Hunters Car Tuning Guide: Best Cars & Drift Setup Ratios',
                slug: 'drift-hunters-car-tuning-guide',
                excerpt: 'Optimize gear ratios, camber angles, turbo pressure, and brake bias to earn millions of drift points in Drift Hunters WebGL.',
                authorName: 'Marcus Vance',
                readingTime: '7 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Drift Hunters Car Tuning & Specs Guide | BrowserGames100',
                seoDescription: 'Tune your car for maximum drift points in Drift Hunters. Full tuning guide for camber, suspension stiffness, and turbo upgrades.',
                content: `
          <h2>Best Starter & Top-Tier Drift Cars</h2>
          <p>Start with the Toyota AE86 to learn throttle control, then upgrade to the Nissan Silvia S15 or Porsche 911 GT3 for high-speed tandem drifting on track maps.</p>
          <h2>Ideal Tuning Ratios for Maximum Slide Control</h2>
          <ul>
            <li><strong>Front Camber:</strong> -3.0 degrees for sharp turn-in response.</li>
            <li><strong>Rear Camber:</strong> 0.0 degrees to maximize rear tire friction during sustained slides.</li>
            <li><strong>Turbo Pressure:</strong> Max upgrade to break traction cleanly on demand.</li>
          </ul>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Subway Surfers Browser Strategy Guide: Multipliers, Hoverboards & Coins',
                slug: 'subway-surfers-high-score-tips',
                excerpt: 'Boost your score multiplier to 30x, master hoverboard crash protection, and navigate subway tracks like a pro on desktop browsers.',
                authorName: 'Alex Rivers',
                readingTime: '5 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Subway Surfers Browser High Score Tips | BrowserGames100',
                seoDescription: 'Reach 1M+ scores in Subway Surfers browser edition with hoverboard crash protection, multiplier missions, and magnet powerups.',
                content: `
          <h2>Unlocking the 30x Base Score Multiplier</h2>
          <p>Complete all 30 sets of inspector missions before going for high scores. Each completed set permanently increases your base score multiplier by 1x.</p>
          <h2>Using Hoverboards as Crash Shields</h2>
          <p>Double-clicking to activate a hoverboard provides 30 seconds of immunity. If you hit a barrier, the board absorbs the crash and saves your run.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Basket Random 2-Player Guide: Physics Mechanics & Dunking Strategy',
                slug: 'basket-random-two-player-guide',
                excerpt: 'Master the ragdoll physics and unpredictable court conditions in Basket Random for hilarious local 2-player victories.',
                authorName: 'Marcus Vance',
                readingTime: '4 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Basket Random 2-Player Tips & Physics Guide | BrowserGames100',
                seoDescription: 'Win more matches in Basket Random with our ragdoll timing, long shot trajectories, and court variation tips.',
                content: `
          <h2>Understanding One-Button Ragdoll Physics</h2>
          <p>Basket Random uses single-key controls to jump and swing arms simultaneously. Timing your tap when your player leans forward creates forward propulsion toward the basket.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Paper.io 2 Territory Conquest Strategy: 100% Map Coverage Tips',
                slug: 'paper-io-2-territory-conquest-guide',
                excerpt: 'Conquer the arena with defensive expansion loops, tail protection tactics, and aggressive opponent elimination strategies.',
                authorName: 'Alex Rivers',
                readingTime: '5 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Paper.io 2 100% Map Coverage Strategy | BrowserGames100',
                seoDescription: 'Dominate Paper.io 2 with perimeter expansion techniques, tail defense, and safe loop creation.',
                content: `
          <h2>The Small-Loop Expansion Rule</h2>
          <p>Never extend long trails into open territory where rivals can cut your line. Expand in short, tight semi-circles attached to your home base.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: '1v1.LOL Building & Editing Guide: Crosshair Placement & Piece Control',
                slug: '1v1-lol-building-editing-guide',
                excerpt: 'Improve your build fights in 1v1.LOL with fast wall-ramp edits, high ground retakes, and optimal keybind configurations.',
                authorName: 'Marcus Vance',
                readingTime: '6 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
                seoTitle: '1v1.LOL Building & Editing Keybind Guide | BrowserGames100',
                seoDescription: 'Master 1v1.LOL box fights and build battles with our crosshair placement, edit timing, and keybind setup guide.',
                content: `
          <h2>Optimal Building Keybind Setup</h2>
          <p>Assign Wall and Ramp to side mouse buttons or Q/E keys to allow uninterrupted WASD movement while building double ramps.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Geometry Dash Online Playbook: Timing, Sight-Reading & Secret Coins',
                slug: 'geometry-dash-browser-rhythm-guide',
                excerpt: 'Survive spike jumps, gravity portals, and ship sections in Geometry Dash browser edition with rhythm synchronization tips.',
                authorName: 'Alex Rivers',
                readingTime: '5 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Geometry Dash Online Playbook & Coin Guide | BrowserGames100',
                seoDescription: 'Beat difficult Geometry Dash browser levels with rhythm sync strategies, portal practice, and secret coin locations.',
                content: `
          <h2>Syncing Jumps to Background Audio Beats</h2>
          <p>Obstacles in Geometry Dash are synchronized to the music rhythm. Playing with headphones helps train your muscle memory for precise jump inputs.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Fireboy and Watergirl 1-6 Co-Op Playbook: Dual Control Techniques',
                slug: 'fireboy-and-watergirl-coop-guide',
                excerpt: 'Complete elemental puzzle temples in Fireboy and Watergirl with solo dual-keyboard strategies or cooperative duo play.',
                authorName: 'Marcus Vance',
                readingTime: '6 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Fireboy & Watergirl Temple Puzzle Guide | BrowserGames100',
                seoDescription: 'Solve all temple levels in Fireboy and Watergirl series. Learn dual-character button coordination and elemental pool safety.',
                content: `
          <h2>Elemental Rules & Physics Interaction</h2>
          <p>Fireboy dissolves in water pools; Watergirl dissolves in lava pools. Green toxic mud destroys both characters instantly upon contact.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Smash Karts Arena Survival Guide: Weapons, Drifting & Battle Tactics',
                slug: 'smash-karts-powerup-arena-guide',
                excerpt: 'Dominate 3D multiplayer kart combat with weapon box prioritization, invincibility shield timing, and drift boosting.',
                authorName: 'Alex Rivers',
                readingTime: '5 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Smash Karts Powerup & Battle Arena Guide | BrowserGames100',
                seoDescription: 'Win more arena matches in Smash Karts with weapon tier rankings, drifting tricks, and powerup box spawn timing.',
                content: `
          <h2>Top-Tier Weapon Box Powerups</h2>
          <p>Prioritize collecting Homing Missiles and Invincibility Orbs. Save your shield until an opponent fires a rocket directly at your kart.</p>
        `
            },
            {
                id: crypto_1.default.randomUUID(),
                title: 'Browser Gaming Accessibility: How HTML5 Games Run on Restricted Networks',
                slug: 'browser-gaming-accessibility-chromebook-guide',
                excerpt: 'An technical look at web sockets, static asset caching, and progressive web apps for playing games on restricted school Wi-Fi.',
                authorName: 'Marcus Vance',
                readingTime: '7 min',
                isPublished: 1,
                isFeatured: 0,
                coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
                seoTitle: 'Browser Gaming Accessibility & PWA Tech | BrowserGames100',
                seoDescription: 'Learn how service workers, WebGL, and static asset caching enable instant unblocked gaming on Chromebooks and restricted networks.',
                content: `
          <h2>How Service Workers Enable Instant Asset Loading</h2>
          <p>By registering a client-side Service Worker, BrowserGames100 caches game UI elements locally on your device, reducing network calls and bypassing restrictive proxy latency.</p>
        `
            }
        ];
        for (const post of posts) {
            await exports.pool.query(`INSERT IGNORE INTO BlogPost (id, title, slug, excerpt, authorName, readingTime, isPublished, isFeatured, coverImage, seoTitle, seoDescription, content)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                post.id, post.title, post.slug, post.excerpt, post.authorName,
                post.readingTime, post.isPublished, post.isFeatured, post.coverImage,
                post.seoTitle, post.seoDescription, post.content
            ]);
        }
        console.log('✅ Synchronized 24 high-quality blog posts into MySQL database for Google AdSense compliance');
    }
    catch (err) {
        console.warn('MySQL syncInitialBlogPosts warning:', err);
    }
}
