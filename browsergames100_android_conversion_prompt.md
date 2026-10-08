# 🤖 BrowserGames100 → Native Android App
## Complete Multi-Phase Gemini AI Studio Conversion Prompt
### 🎯 PRIMARY GOAL: Get Google AdMob Approval & Maximize Revenue

> **Author:** Senior Android Developer Analysis (15 years experience)
> **Source App:** BrowserGames100 — React + Vite + TypeScript PWA
> **Target:** Native Android App (Kotlin + Jetpack Compose + Material You)
> **Base URL:** https://browsergames100.com (live data source)
> **Revenue Goal:** Google AdMob approval + maximum CPM/RPM

---

# ⚠️ CRITICAL READ BEFORE ANY CODING — AdMob Approval Guide

## Why Most Game WebView Apps Get REJECTED by Google AdMob

Google AdMob reviewers specifically look for and **reject** these patterns:

| ❌ Rejection Trigger | ✅ What We Must Do Instead |
|---|---|
| App is just a WebView wrapper of a website | All UI (Home, Search, Categories, Favorites) must be **100% native Kotlin/Compose** — only the actual GAME FRAME inside GamePlayerScreen uses WebView |
| Ads placed inside or touching the WebView | AdMob ads ONLY in native Compose UI sections, NEVER inside the WebView container |
| `mixedContentMode = MIXED_CONTENT_ALWAYS_ALLOW` without restriction | Use `MIXED_CONTENT_COMPATIBILITY_MODE` instead — safer and policy-compliant |
| Allowing all WebView permissions blindly | Only grant mic/camera/geo if the specific game requires it, with user permission dialog first |
| Auto-show interstitials immediately on app open | Wait minimum 2 games played before first interstitial; min 60 seconds between subsequent ads |
| App has no Privacy Policy accessible in-app | Privacy Policy screen must be in the app AND linked in Play Store listing |
| No GDPR/CCPA consent for personalized ads | Use Google UMP SDK — mandatory for AdMob approval in EU/UK/California |
| App targets children (under 13) content | Set `TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE` explicitly; games must be rated 10+ |
| Rewarded ads with fake rewards | Only use rewarded ads if there's a genuine reward (e.g., unlock tips, skip wait) |
| Ad clicks accidental due to placement near buttons | Minimum 50dp gap between any AdMob banner and any tappable UI element |
| App crashes or has poor UX during review | AdMob manual reviewers test the app — all screens must work without internet |

## The "Native Value" Test — You MUST Pass This

AdMob policy requires your app to provide **genuine native value** beyond a web wrapper. Here's how BrowserGames100 passes:

✅ **Native game discovery engine** — browsing, filtering, sorting 28,000 games in native Compose UI  
✅ **Native favorites & history system** — DataStore-backed, works offline  
✅ **Native search with autocomplete** — debounced live search in native UI  
✅ **Native rating system** — star rating saved locally + synced to backend  
✅ **Native notifications** — new games, trending alerts  
✅ **Native sharing** — Android Intent.ACTION_SEND  
✅ **Dark/Light theme toggle** — native Material You  
✅ **Native onboarding** — first-launch tutorial screen  
✅ **App shortcuts** — Android launcher quick actions  
✅ **Offline mode** — cached games browsable without internet  
✅ **Native deep links** — browsergames100.com URLs open in-app  

> The WebView is used for **ONE purpose only**: loading the game frame. Everything else is native.

---

## 📋 PRE-PROMPT: App Architecture Summary (Feed This to Gemini First)

Before starting any phase, paste this context block into Gemini AI Studio:

```
I am building a native Android app called "BrowserGames100" — a free HTML5 browser gaming platform with 28,000+ games.

PRIMARY GOAL: Get Google AdMob approval and maximize ad revenue.
The app must pass AdMob's "native value" test — only the game frame itself uses WebView; ALL other screens are 100% native Jetpack Compose.

KEY ARCHITECTURE FACTS:
- Games are NOT hosted locally. Each game is played via a WebView pointing to an external URL stored in game.u field
- All game data is served as static JSON files from: https://browsergames100.com/data/
- Backend REST API at: https://browsergames100.com/api/ (Express + MySQL + Prisma)
- No user accounts required — all user data (favorites, recently played, ratings) stored locally in DataStore
- 28,000+ games across 28+ categories

DATA FILES (served as static JSON):
- /data/categories.json → list of all categories
- /data/games-trending.json → trending games (compact format)
- /data/games-featured.json → featured/hot games
- /data/games-initial.json → first 500 games for homepage
- /data/games-p{N}.json → paginated game pages (p0 to p281)
- /data/cat-{id}.json → games for a specific category
- /data/slug-map.json → {slug: gameId} lookup table
- /data/detail-index.json → {gameId: chunkNumber} lookup
- /data/details-{N}.json → detailed game info chunks (0 to 56)

GAME DATA STRUCTURES:
GameCompact { id, t(title), s(slug), img(thumbnail), c(categoryId), p(plays), r(rating), f(featured) }
GameDetail { id, t, s, d(description), ins(instructions), u(iframeUrl), img, c, tags[], p, r, f }
Category { id, slug, name, image, total_games }

BACKEND API ENDPOINTS:
- POST /api/games/{slug}/play → record play count
- POST /api/games/{slug}/rate → { gameId, type: 'like'|'dislike' }
- POST /api/favorites/toggle → { gameId, gameSlug }
- POST /api/submissions/game → suggest a game
- POST /api/submissions/contact → contact form

LOCAL STORAGE (DataStore):
- favorites → List<Int> of game IDs
- recently_played → List<Int> max 20, most recent first
- rating_{gameId} → Int (1-5)
- dark_mode → Boolean (default true)
- admob_consent → Boolean (GDPR consent given)
- games_played_count → Int (for interstitial timing)

ADMOB RULES (CRITICAL — violating these = rejection):
1. Ads ONLY in native Compose UI — NEVER inside WebView container
2. Banner ads: min 50dp gap from all buttons/navigation
3. Interstitials: first one after 3rd game played, then min 120 seconds between each
4. No ads on screens with Privacy Policy, Terms, or Contact content
5. GDPR consent popup on first launch before any ads shown
6. No ads on GamePlayerScreen while game is actively playing (only in game info section below)

SCREENS:
1. OnboardingScreen (first launch only) — native
2. HomeScreen — native
3. GamePlayerScreen — native scaffold + WebView ONLY for game frame
4. CategoryDetailScreen — native
5. CategoriesScreen — native
6. SearchScreen — native
7. FavoritesScreen — native
8. TrendingScreen — native
9. BlogListScreen — native
10. BlogPostScreen — native
11. AboutScreen, ContactScreen, PrivacyScreen, TermsScreen, DisclaimerScreen, DMCAScreen — native (NO ADS on these)
```

---

# PHASE 0 — ADMOB APPROVAL STRATEGY (DO THIS BEFORE WRITING ANY CODE)

## Prompt 0.1 — AdMob Account Setup Checklist

```
I am building an Android app called BrowserGames100 for Google AdMob monetization.
As a senior Android developer expert in AdMob policy compliance, give me:

1. STEP-BY-STEP AdMob account setup:
   - How to create AdMob account at admob.google.com
   - How to create the app in AdMob BEFORE publishing to Play Store
   - How to get the App ID and Ad Unit IDs (Banner, Interstitial, Rewarded)
   - How to use TEST ad unit IDs during development
   - When to switch to real Ad Unit IDs (only after Play Store approval)

2. PLAY STORE REQUIREMENTS for AdMob approval:
   - App must be published (even in Internal Testing) before AdMob can review
   - Content rating questionnaire answers for a gaming app
   - Data safety form requirements (what data we collect: local only — no personal data)
   - Privacy Policy URL requirement (use: https://browsergames100.com/privacy)

3. ADMOB REVIEW PROCESS:
   - Timeline: typically 1-3 days for new apps
   - What reviewers check: app functionality, ad placement, content quality
   - Common rejection reasons and how we avoid them
   - How to appeal if rejected

4. AD UNIT STRUCTURE to create in AdMob console:
   - Banner: "Home Page Banner" (for HomeScreen)
   - Banner: "Category Page Banner" (for CategoryDetailScreen)
   - Banner: "Game Info Banner" (for below game player)
   - Banner: "Search Results Banner"
   - Interstitial: "Game Launch Interstitial" (shown before game loads, every 3rd game)
   - Rewarded Interstitial: "Tips Unlock Reward" (optional)
   - Native Advanced: "Game Card Native Ad" (optional — for inserting in game grid)

5. REVENUE OPTIMIZATION tips:
   - Best banner sizes for gaming apps (320x50 vs 320x100 vs Adaptive)
   - Interstitial timing best practices for casual gaming apps
   - How to enable AdMob mediation for higher fill rate
   - How to enable AdSense for Apps (for premium CPM)
   - Expected CPM ranges for gaming category: Banner $0.5-2, Interstitial $3-12, Rewarded $5-20

Provide complete guidance.
```

## Prompt 0.2 — GDPR / UMP Consent Implementation (MANDATORY)

```
Implement Google UMP (User Messaging Platform) consent system for BrowserGames100 Android app.
This is MANDATORY for AdMob — without it, Google will not serve personalized ads in EU/UK/EEA.

IMPLEMENTATION REQUIREMENTS:

1. Add dependency: com.google.android.ump:user-messaging-platform:3.x

2. Create ConsentManager.kt:
   - Initialize on app startup (before any ads)
   - Check if consent is required (EU/EEA users)
   - Show consent form if required
   - Store consent status
   - Methods:
     * fun initialize(activity: Activity, onComplete: (Boolean) -> Unit)
     * fun isConsentObtained(): Boolean
     * fun canShowPersonalizedAds(): Boolean
     * fun resetConsent() (for settings screen "Reset Privacy Choices")

3. Create GdprConsentScreen.kt (fallback if UMP fails):
   Simple composable with:
   - Title: "Privacy & Ad Settings"
   - Text: "BrowserGames100 uses Google AdMob to show ads that support our free service. 
     Personalized ads use your interests to show relevant content. 
     Non-personalized ads don't use your data but may be less relevant."
   - Button: "Accept Personalized Ads" → enablePersonalizedAds()
   - Button: "Non-Personalized Ads Only" → enableNonPersonalizedAds()
   - Link: "Privacy Policy" → opens PrivacyScreen
   - Note: "You can change this in Settings anytime"
   - Must be shown BEFORE any AdMob initialization

4. In Application.onCreate():
   - Initialize UMP first
   - Only initialize MobileAds.initialize() AFTER consent obtained
   - Set TAG_FOR_CHILD_DIRECTED_TREATMENT to FALSE explicitly (we target 10+, not children)
   - Set TAG_FOR_UNDER_AGE_OF_CONSENT based on UMP result

5. CCPA (California) handling:
   - UMP SDK handles this automatically
   - Add "Do Not Sell My Data" option in Settings screen

6. Settings Screen "Privacy" section:
   - "Ad Personalization: ON/OFF" toggle
   - "Reset Privacy Choices" button → shows UMP form again
   - "Privacy Policy" link
   - "GDPR Data Request" email link

Show complete implementation for all files including Application.kt.
```

---

# PHASE 1 — PROJECT SETUP & FOUNDATION

## Prompt 1.1 — Create Android Project Structure

```
You are a senior Android developer with 15 years of experience. 
PRIMARY GOAL: Build an Android app that passes Google AdMob policy review.

Create a new Android project for "BrowserGames100" with:

PROJECT NAME: BrowserGames100
PACKAGE: com.browsergames100.app
MIN SDK: 24 (Android 7.0) — covers 97%+ of active Android devices
TARGET SDK: 35 (Android 15)
LANGUAGE: Kotlin 100%
UI FRAMEWORK: Jetpack Compose with Material 3 (Material You)

build.gradle.kts (app level) — COMPLETE dependencies:
1. Jetpack Compose BOM (latest stable 2025.x)
2. Material3 with dynamic color
3. Navigation Compose
4. Retrofit2 (2.11+) + OkHttp3 (4.12+)
5. Gson converter for Retrofit
6. Coil 3.x (image loading)
7. DataStore Preferences (2.x)
8. Kotlin Coroutines + ViewModel + Lifecycle
9. Hilt (dependency injection)
10. Google Mobile Ads SDK — ADMOB: com.google.android.gms:play-services-ads:23.x
11. Google UMP SDK: com.google.android.ump:user-messaging-platform:3.x
12. Paging 3 (infinite scroll)
13. Splash Screen API (androidx.core:core-splashscreen)
14. WorkManager (background data sync)
15. In-App Review API: com.google.android.play:review:2.x
16. Accompanist permissions (for WebView mic/camera)

AndroidManifest.xml — ADMOB-COMPLIANT version:
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<!-- IMPORTANT: Do NOT request CAMERA or RECORD_AUDIO at app level — only via WebChromeClient when game needs it -->

<application
    android:hardwareAccelerated="true"  <!-- Required for WebView games AND AdMob -->
    android:usesCleartextTraffic="false"  <!-- HTTPS only for AdMob compliance -->
    ...>
    
    <!-- AdMob App ID — use test ID during development -->
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="@string/admob_app_id" />
    
    <!-- Optimize ad initialization -->
    <meta-data
        android:name="com.google.android.gms.ads.flag.OPTIMIZE_INITIALIZATION"
        android:value="1" />
    <meta-data
        android:name="com.google.android.gms.ads.flag.OPTIMIZE_AD_LOADING"
        android:value="1" />

Create network_security_config.xml:
- Allow HTTPS only (cleartextTrafficPermitted="false" globally)
- Exception ONLY for specific game domains if absolutely needed
- This is CRITICAL: AdMob reviewers check for overly permissive network config

Create BuildConfig fields:
- ADMOB_APP_ID (debug: test ID, release: real ID)
- BANNER_AD_HOME (debug: test banner ID, release: real ID)
- BANNER_AD_CATEGORY (debug: test ID, release: real ID)  
- BANNER_AD_GAME_INFO (debug: test ID, release: real ID)
- BANNER_AD_SEARCH (debug: test ID, release: real ID)
- INTERSTITIAL_AD_GAME (debug: test interstitial ID, release: real ID)
- API_BASE_URL (https://browsergames100.com/)

Test Ad Unit IDs to use during development:
- App ID: ca-app-pub-3940256099942544~3347511713
- Banner: ca-app-pub-3940256099942544/6300978111
- Interstitial: ca-app-pub-3940256099942544/1033173712
- Rewarded: ca-app-pub-3940256099942544/5224354917

Show complete file contents for: build.gradle.kts, AndroidManifest.xml, network_security_config.xml, strings.xml.
```

## Prompt 1.2 — Design System & Theme

```
Create the complete Jetpack Compose Material3 theme for BrowserGames100 Android app.

REQUIREMENTS:
1. BrowserGames100Theme.kt:
   - Dark mode as DEFAULT
   - Light mode as optional
   - Material3 ColorScheme:
     * primary = Color(0xFF19E680)
     * onPrimary = Color(0xFF001A0A)
     * primaryContainer = Color(0xFF004D22)
     * secondary = Color(0xFF1A1F2B)
     * background = Color(0xFF0B0E14)
     * surface = Color(0xFF141820)
     * surfaceVariant = Color(0xFF1A2030)
     * outline = Color(0xFF2D3748)
     * onBackground = Color(0xFFFFFFFF)
     * onSurface = Color(0xFFE2E8F0)
     * onSurfaceVariant = Color(0xFF8B949E)
   - Dynamic color for Android 12+
   - Custom gaming colors as CompositionLocal

2. Typography.kt: Google Font "Inter", weights 400/600/700/800/900

3. Shapes.kt: ExtraSmall(4dp), Small(8dp), Medium(12dp), Large(16dp), ExtraLarge(24dp)

4. GamingColors.kt:
   val GamingGreen = Color(0xFF19E680)
   val GamingCyan = Color(0xFF00D4FF)
   val GamingPink = Color(0xFFFF2D8A)
   val GamingYellow = Color(0xFFFFD700)
   val GamingBlue = Color(0xFF3B82F6)
   val GamingOrange = Color(0xFFF97316)

5. Dimensions.kt (for AdMob compliance):
   val AdBannerMinMarginTop = 56.dp    // Gap above banner
   val AdBannerMinMarginBottom = 56.dp // Gap below banner (away from nav)
   val AdBannerMinSideMargin = 0.dp    // Banners touch sides (standard)
   // RULE: No tappable element within 50dp of any ad

Show complete Kotlin file contents.
```

## Prompt 1.3 — Onboarding Screen (First Launch)

```
Create an OnboardingScreen for BrowserGames100 Android app.

PURPOSE: Shown only on first launch. Establishes native app value (helps AdMob approval).
Show only once — track with DataStore "onboarding_complete" boolean.

SLIDES (3 pages, swipeable HorizontalPager):

Slide 1 — "Welcome to BrowserGames100":
- Large gamepad icon animation (Lottie or animated Vector)
- Title: "28,000+ Free Games"
- Subtitle: "Play action, puzzle, racing and more — all free, no downloads"
- Stats: games count, categories count

Slide 2 — "Discover & Organize":
- Icon: heart/star animation
- Title: "Save Your Favorites"
- Subtitle: "Heart any game to save it. Your history and favorites sync across sessions"
- Show screenshot-style preview of FavoritesScreen

Slide 3 — "Privacy & Ads":
- Icon: shield
- Title: "Free & Transparent"
- Subtitle: "This app is free, supported by Google ads. We store only your favorites locally — never shared."
- "Continue" button → triggers GDPR consent dialog → then navigates to HomeScreen
- "Privacy Policy" text link

IMPLEMENTATION:
- HorizontalPager with page indicator dots
- Animated transitions between slides
- Skip button (top right) on slides 1 and 2
- "Get Started" / "Continue" button on slide 3
- After completion: write "onboarding_complete = true" to DataStore
- Check in MainActivity: if !onboarding_complete → show OnboardingScreen, else → HomeScreen

Show complete implementation.
```

---

# PHASE 2 — DATA LAYER (Models + Repository + Network)

## Prompt 2.1 — Data Models

```
Create all Kotlin data models for BrowserGames100 Android app exactly matching the JSON structure:

1. GameCompact.kt:
data class GameCompact(
    @SerializedName("id") val id: Int,
    @SerializedName("t") val title: String,
    @SerializedName("s") val slug: String,
    @SerializedName("img") val thumbnail: String,
    @SerializedName("c") val categoryId: Int,
    @SerializedName("p") val plays: Int = 0,
    @SerializedName("r") val rating: Float = 0f,
    @SerializedName("f") val featured: Boolean = false
)

2. GameDetail.kt:
data class GameDetail(
    @SerializedName("id") val id: Int,
    @SerializedName("t") val title: String,
    @SerializedName("s") val slug: String,
    @SerializedName("d") val description: String = "",
    @SerializedName("ins") val instructions: String = "",
    @SerializedName("u") val iframeUrl: String,  // THE GAME URL — loaded in WebView
    @SerializedName("img") val thumbnail: String,
    @SerializedName("c") val categoryId: Int,
    @SerializedName("tags") val tags: List<String> = emptyList(),
    @SerializedName("p") val plays: Int = 0,
    @SerializedName("r") val rating: Float = 0f,
    @SerializedName("f") val featured: Boolean = false
)

3. Category.kt:
data class Category(
    @SerializedName("id") val id: Int,
    @SerializedName("slug") val slug: String,
    @SerializedName("name") val name: String,
    @SerializedName("image") val image: String = "",
    @SerializedName("total_games") val totalGames: Int
)

4. Type aliases:
typealias SlugMap = Map<String, Int>
typealias DetailIndex = Map<String, Int>
typealias GameDetailsChunk = Map<String, GameDetail>

5. UserPreferences.kt:
data class UserPreferences(
    val favoriteIds: List<Int> = emptyList(),
    val recentlyPlayedIds: List<Int> = emptyList(),
    val gameRatings: Map<Int, Int> = emptyMap(),
    val isDarkMode: Boolean = true,
    val adConsentGiven: Boolean = false,
    val personalizedAdsEnabled: Boolean = false,
    val gamesPlayedCount: Int = 0,    // for interstitial timing
    val lastInterstitialTimeMs: Long = 0L,   // epoch ms
    val onboardingComplete: Boolean = false
)

6. AdState.kt (for AdMob management):
data class AdState(
    val isBannerLoaded: Boolean = false,
    val isInterstitialReady: Boolean = false,
    val canShowInterstitial: Boolean = false,  // true after 3rd game, every 120s
    val consentStatus: ConsentStatus = ConsentStatus.UNKNOWN
)
enum class ConsentStatus { UNKNOWN, REQUIRED, NOT_REQUIRED, OBTAINED }

7. ApiResult.kt:
sealed class ApiResult<out T> {
    data class Success<T>(val data: T) : ApiResult<T>()
    data class Error(val message: String, val code: Int = 0) : ApiResult<Nothing>()
    object Loading : ApiResult<Nothing>()
}

Extension functions:
- GameCompact.getFormattedPlays(): String
- GameCompact.getCategoryEmoji(): String
- String.stripHtml(): String
- String.truncate(max: Int): String

Show complete implementation.
```

## Prompt 2.2 — Network Layer

```
Create the complete network/data layer for BrowserGames100 Android app.

BASE_URL = "https://browsergames100.com/"

Files to create:

1. NetworkModule.kt (Hilt @Module):
   - OkHttpClient: 30s timeout, logging interceptor (DEBUG only), 10MB disk cache
   - Retrofit with GsonConverterFactory
   - Separate qualifiers: @DataApi (static JSON files) and @BackendApi (REST API)
   - IMPORTANT: Do NOT add any custom headers that could interfere with AdMob

2. GameDataService.kt (static JSON files):
   @GET("data/categories.json") suspend fun getCategories(): List<Category>
   @GET("data/games-trending.json") suspend fun getTrendingGames(): List<GameCompact>
   @GET("data/games-featured.json") suspend fun getFeaturedGames(): List<GameCompact>
   @GET("data/games-initial.json") suspend fun getInitialGames(): List<GameCompact>
   @GET("data/games-p{page}.json") suspend fun getGamesPage(@Path("page") page: Int): List<GameCompact>
   @GET("data/cat-{categoryId}.json") suspend fun getCategoryGames(@Path("categoryId") id: Int): List<GameCompact>
   @GET("data/slug-map.json") suspend fun getSlugMap(): Map<String, Int>
   @GET("data/detail-index.json") suspend fun getDetailIndex(): Map<String, Int>
   @GET("data/details-{chunk}.json") suspend fun getDetailsChunk(@Path("chunk") chunk: Int): Map<String, GameDetail>

3. BackendApiService.kt:
   @POST("api/games/{slug}/play") suspend fun recordPlay(@Path("slug") slug: String, @Body body: PlayRequest)
   @POST("api/games/{slug}/rate") suspend fun rateGame(@Path("slug") slug: String, @Body body: RateRequest)
   @POST("api/submissions/contact") suspend fun submitContact(@Body body: ContactRequest)
   @POST("api/submissions/game") suspend fun suggestGame(@Body body: SuggestRequest)

4. GameRepository.kt:
   - In-memory HashMap cache (prevents redundant fetches)
   - Cache timeout: 30 minutes
   - All suspend functions returning ApiResult<T>
   - getGameDetail(slug) — MUST implement 3-step lookup:
     Step 1: GET slug-map.json → find gameId by slug
     Step 2: GET detail-index.json → find chunkNum by gameId.toString()
     Step 3: GET details-{chunkNum}.json → find GameDetail by gameId.toString()
   - searchGames(query) — load up to 10 pages, filter by title.contains(query, ignoreCase=true), max 50 results
   - recordPlay() and rateGame() — fire-and-forget (launch in viewModelScope, ignore errors)

5. UserDataRepository.kt (DataStore):
   - getFavorites(): Flow<List<Int>>
   - toggleFavorite(gameId: Int)
   - getRecentlyPlayed(): Flow<List<Int>>
   - addRecentlyPlayed(gameId: Int)  // prepend, deduplicate, trim to 20
   - getGameRating(gameId: Int): Flow<Int>
   - setGameRating(gameId: Int, stars: Int)
   - getGamesPlayedCount(): Flow<Int>
   - incrementGamesPlayed()
   - getLastInterstitialTime(): Flow<Long>
   - updateLastInterstitialTime()
   - isDarkMode(): Flow<Boolean>
   - setDarkMode(dark: Boolean)
   - isOnboardingComplete(): Flow<Boolean>
   - setOnboardingComplete()

Show complete implementation with error handling and caching.
```

---

# PHASE 3 — ADMOB IMPLEMENTATION (Core Revenue Engine)

## Prompt 3.1 — Complete AdMob Manager

```
Create the complete AdMob implementation for BrowserGames100 Android app.
This must be 100% policy-compliant for AdMob approval.

ADMOB POLICY RULES TO IMPLEMENT:
1. No ads before GDPR consent is obtained
2. No ads on Privacy Policy, Terms, Contact, About, Disclaimer, DMCA screens
3. Banner ads must have minimum 50dp gap from navigation elements
4. Interstitial: minimum 3 games played before first show; minimum 120 seconds between shows
5. Never show interstitial during active gameplay (only in transition TO the game)
6. App must not crash or ANR during ad loading/display

Files to create:

1. AdManager.kt (singleton via Hilt):

class AdManager @Inject constructor(
    private val userDataRepository: UserDataRepository
) {
    // Interstitial timing constants
    companion object {
        const val MIN_GAMES_BEFORE_INTERSTITIAL = 3
        const val MIN_SECONDS_BETWEEN_INTERSTITIALS = 120L
    }
    
    private var interstitialAd: InterstitialAd? = null
    private var isLoading = false
    
    // Call this AFTER consent is obtained
    fun initialize(context: Context) {
        MobileAds.initialize(context) { initStatus ->
            Log.d("AdMob", "Init complete: $initStatus")
        }
        // Set request config based on consent
        val requestConfig = RequestConfiguration.Builder()
            .setTagForChildDirectedTreatment(RequestConfiguration.TAG_FOR_CHILD_DIRECTED_TREATMENT_FALSE)
            .setTagForUnderAgeOfConsent(RequestConfiguration.TAG_FOR_UNDER_AGE_OF_CONSENT_FALSE)
            .setMaxAdContentRating(RequestConfiguration.MAX_AD_CONTENT_RATING_T)  // Teen
            .build()
        MobileAds.setRequestConfiguration(requestConfig)
        preloadInterstitial(context)
    }
    
    fun preloadInterstitial(context: Context) {
        // Preload next interstitial in background
    }
    
    suspend fun canShowInterstitial(): Boolean {
        val gamesPlayed = userDataRepository.getGamesPlayedCount().first()
        val lastTime = userDataRepository.getLastInterstitialTime().first()
        val secondsSinceLast = (System.currentTimeMillis() - lastTime) / 1000
        return gamesPlayed >= MIN_GAMES_BEFORE_INTERSTITIAL && 
               secondsSinceLast >= MIN_SECONDS_BETWEEN_INTERSTITIALS &&
               interstitialAd != null
    }
    
    fun showInterstitial(activity: Activity, onDismissed: () -> Unit) {
        // Show if available, call onDismissed either way
        // Update lastInterstitialTime in DataStore after showing
    }
    
    fun buildAdRequest(): AdRequest {
        // Build request respecting UMP consent status
        return AdRequest.Builder().build()
    }
}

2. BannerAdComposable.kt:

@Composable
fun BannerAd(
    adUnitId: String,
    adSize: AdSize = AdSize.BANNER,
    modifier: Modifier = Modifier
) {
    // Only show if consent obtained
    val context = LocalContext.current
    // CRITICAL: Wrap in Box with minimum 50dp vertical padding from edges
    Box(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)  // small internal padding
            .background(MaterialTheme.colorScheme.surface)
    ) {
        AndroidView(
            factory = { ctx ->
                AdView(ctx).apply {
                    setAdSize(adSize)
                    setAdUnitId(adUnitId)
                    loadAd(AdRequest.Builder().build())
                    adListener = object : AdListener() {
                        override fun onAdLoaded() { /* track in analytics */ }
                        override fun onAdFailedToLoad(error: LoadAdError) { /* log */ }
                    }
                }
            },
            modifier = Modifier.fillMaxWidth()
        )
    }
}

// ADAPTIVE BANNER (better CPM than fixed 320x50):
@Composable
fun AdaptiveBannerAd(adUnitId: String, modifier: Modifier = Modifier) {
    val context = LocalContext.current
    val adSize = remember {
        val displayMetrics = context.resources.displayMetrics
        val adWidthPixels = displayMetrics.widthPixels.toFloat()
        val adWidth = (adWidthPixels / displayMetrics.density).toInt()
        AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize(context, adWidth)
    }
    BannerAd(adUnitId = adUnitId, adSize = adSize, modifier = modifier)
}

// NO_AD_SCREENS — list of screens where NO ads should appear:
val NO_AD_SCREENS = setOf(
    Screen.Privacy.route,
    Screen.Terms.route,
    Screen.About.route,
    Screen.Contact.route,
    Screen.Disclaimer.route,
    Screen.DMCA.route
)

3. AdPlacement guidelines for each screen:
   
   HomeScreen:
   - AdaptiveBannerAd after hero section (position 2 in LazyColumn)
   - AdaptiveBannerAd in middle of content (between New This Week and Categories)
   - Minimum 56dp spacer ABOVE each banner (from section header)
   - Minimum 56dp spacer BELOW each banner (from next section)
   
   CategoryDetailScreen:
   - AdaptiveBannerAd below category header, above game grid
   - Spacer(56dp) before and after
   
   GamePlayerScreen:
   - AdaptiveBannerAd BELOW the game info cards section (not near WebView, not near play button)
   - NO banner near the WebView game frame
   - Interstitial shown BEFORE game loads (in the transition)
   
   SearchScreen:
   - AdaptiveBannerAd at bottom of results (after all game cards)
   
   TrendingScreen:
   - AdaptiveBannerAd at top (after header), one more in middle

4. InterstitialAdHelper.kt:
   - showGameLaunchInterstitial(activity, gameSlug, onGameReady) 
   - Checks canShowInterstitial()
   - If YES: show interstitial → onDismissed → onGameReady()
   - If NO: directly call onGameReady()
   - Always navigate to game regardless of ad outcome

Show complete implementation for all files.
```

---

# PHASE 4 — NAVIGATION & MAIN SCAFFOLD

## Prompt 4.1 — Navigation Setup

```
Create the complete navigation architecture for BrowserGames100 Android app.

Screen.kt:
sealed class Screen(val route: String) {
    object Onboarding : Screen("onboarding")
    object Home : Screen("home")
    object Search : Screen("search?q={query}") { fun createRoute(q: String = "") = "search?q=$q" }
    object Categories : Screen("categories")
    object Favorites : Screen("favorites")
    object Trending : Screen("trending")
    object GamePlayer : Screen("game/{slug}") { fun createRoute(slug: String) = "game/$slug" }
    object CategoryDetail : Screen("category/{slug}") { fun createRoute(slug: String) = "category/$slug" }
    object BlogList : Screen("blog")
    object BlogPost : Screen("blog/{slug}") { fun createRoute(slug: String) = "blog/$slug" }
    object About : Screen("about")
    object Contact : Screen("contact")
    object Privacy : Screen("privacy")
    object Terms : Screen("terms")
    object Disclaimer : Screen("disclaimer")
    object DMCA : Screen("dmca")
    object Settings : Screen("settings")
}

NavGraph.kt:
- Complete NavHost with all routes
- Deep links: intent-filter for https://browsergames100.com
  * /game/{slug} → GamePlayer
  * /category/{slug} → CategoryDetail
  * / → Home
- Transition animations: fadeIn/fadeOut (300ms)
- Back stack: popUpTo behavior for bottom nav tabs

MainScaffold.kt:
- Top AppBar with: Logo | Search icon | Theme toggle
- Bottom Navigation Bar: Home(Gamepad) | Search(Search) | Categories(Grid) | Favorites(Heart+badge)
- Navigation drawer: Trending, Blog, ── Divider ──, About, Contact, Privacy, Terms, Disclaimer, DMCA, Settings
- IMPORTANT: Bottom bar HIDDEN on GamePlayerScreen (immersive game experience)
- IMPORTANT: Bottom bar HIDDEN on OnboardingScreen

ADMOB-SPECIFIC navigation rules:
- When user taps a GameCard → call AdManager.canShowInterstitial()
  * If YES: show interstitial with callback → navigate to GamePlayer on dismiss
  * If NO: navigate to GamePlayer directly
- Never use back-press to accidentally trigger ads
- Ads should never block navigation UI

Show complete implementation.
```

---

# PHASE 5 — ALL SCREENS IMPLEMENTATION

## Prompt 5.1 — HomeScreen (AdMob-Compliant)

```
Create the HomeScreen for BrowserGames100 Android app with proper AdMob ad placements.

ADMOB COMPLIANCE RULES FOR THIS SCREEN:
- Banner ads must have Spacer(height=56.dp) ABOVE them (away from section headers)
- Banner ads must have Spacer(height=56.dp) BELOW them (before next tappable content)
- Do NOT place banner near the bottom navigation bar
- Use AdaptiveBannerAd composable (better CPM than fixed size)

HomeViewModel.kt:
- StateFlow<HomeUiState>
- Fetches: categories, trending, initial games
- Computes: newGames (by id desc, first 12), recentGames, favoriteGames

HomeScreen.kt — LazyColumn sections:
1. HERO SECTION (native Compose, no WebView):
   - Gradient background
   - Animated "🟢 Live" badge: "28,000+ Games Ready to Play"
   - Title: "Play Free Games INSTANTLY" with gradient text
   - Subtitle + CTA buttons
   - Stats: 28K+ | ⭐4.9 | 2M+ | 100% Free

2. Spacer(56.dp) + AdaptiveBannerAd(BANNER_AD_HOME) + Spacer(56.dp)
   [ADMOB RULE: This position is ideal — not near nav, not near play buttons]

3. FEATURES STRIP (4 cards, native):
   ⚡ Instant Play | 📱 Works Everywhere | 🛡️ Safe & Curated | 📶 Network-Friendly

4. RECENTLY PLAYED (horizontal LazyRow, only if not empty)

5. MY FAVORITES (horizontal LazyRow, only if not empty)

6. TRENDING NOW (2-column grid, 12 games):
   Header: 🔥 Trending Right Now

7. EDITOR'S PICKS (gradient container, 6 games)

8. NEW THIS WEEK (2-column grid, 12 games)

9. Spacer(56.dp) + AdaptiveBannerAd(BANNER_AD_HOME) + Spacer(56.dp)
   [ADMOB RULE: Mid-page position, good viewability = higher CPM]

10. BROWSE BY GENRE (2-column CategoryCard grid)

11. HOW IT WORKS (3 steps: Pick → Play → Share)

12. ALL GAMES (2-column grid, 48 games)

13. FAQ ACCORDION (6 expandable items)

GameCard.kt component:
- Coil image loading with shimmer placeholder
- Game title (1 line truncated)
- Play count + star rating
- ❤️ favorite toggle (top-right, 48dp touch target)
- 🔥 HOT / 🆕 NEW badge
- IMPORTANT: 48dp minimum touch target on all interactive elements (AdMob policy)

CategoryCard.kt component:
- Large emoji icon (getCategoryEmoji)
- Name + game count
- Arrow chevron
- 72dp minimum height

Show complete implementation.
```

## Prompt 5.2 — GamePlayerScreen (WebView + AdMob Compliant)

```
Create the GamePlayerScreen for BrowserGames100 Android app.
THIS SCREEN IS THE MOST IMPORTANT FOR ADMOB COMPLIANCE.

CRITICAL ADMOB RULES FOR THIS SCREEN:
1. The WebView container must be ISOLATED — no AdMob banner inside or overlapping it
2. Interstitial ad shown BEFORE the game loads (in transition), NOT during gameplay
3. Banner ad placed BELOW the game info sections, far from the game frame
4. The "Play" button and WebView must work even if ads fail to load
5. Users must be able to close/dismiss ads and still reach the game

CRITICAL WEBVIEW SETTINGS FOR HTML5 GAMES:
The following WebView settings are NON-NEGOTIABLE for HTML5 games to work:
- javaScriptEnabled = true  [games use JS]
- domStorageEnabled = true  [games store state]
- mediaPlaybackRequiresUserGesture = false  [games need auto audio]
- hardware acceleration [smooth 60fps rendering]

⚠️ BUT THESE ARE DANGEROUS AND MUST BE RESTRICTED:
- mixedContentMode: Use MIXED_CONTENT_COMPATIBILITY_MODE (NOT ALWAYS_ALLOW)
  REASON: MIXED_CONTENT_ALWAYS_ALLOW allows any HTTP content — security risk + AdMob policy issue
  Use COMPATIBILITY_MODE which allows known-safe mixed content only
- Camera/Mic/Geo permissions: Show Android permission dialog FIRST, then grant to WebView
  REASON: Blindly granting all WebChromeClient permissions violates Play Store policy
- allowFileAccess = false  (games don't need device file access)
- allowContentAccess = false  (not needed)
- databaseEnabled = true  (needed for game state)

GamePlayerViewModel.kt:
- Takes slug as argument
- Fetches GameDetail (3-step lookup)
- Fetches related category games
- State: GamePlayerUiState(game, relatedGames, isLoading, isPlaying, userRating, isFavorite)
- Actions: onPlayPressed(), onToggleFavorite(), onRate(stars), onShare()
- On first play: recordPlay() (fire-and-forget) + incrementGamesPlayed() in DataStore

GamePlayerScreen.kt:

PART 1 — NATIVE HEADER (always visible, native Compose):
Row {
    IconButton(onClick = navBack) { Icon(Icons.Default.ArrowBack) }
    Text(game.title, maxLines=1, overflow=Ellipsis, modifier=Modifier.weight(1f))
    IconButton(onClick = onFavorite) { Icon(heartIcon, tint = if(fav) Red else Gray) }
    IconButton(onClick = onShare) { Icon(Icons.Default.Share) }
}

PART 2 — GAME AREA (native Compose container, aspect ratio 16:9):
Box(modifier = Modifier.fillMaxWidth().aspectRatio(16f/9f)) {

  // BEFORE PLAY — native play overlay:
  if (!isPlaying) {
    Image(thumbnail, contentScale=Crop, alpha=0.3f)
    Column(horizontalAlignment=CenterHorizontally) {
        PulsingPlayButton(onClick = onPlayPressed)
        Text(game.title, style=headlineLarge, color=White)
        Pill("No Download • Instant Play • Free")
    }
  }
  
  // AFTER PLAY — WebView (isolated, no ads near it):
  if (isPlaying) {
    GameWebView(
        url = game.iframeUrl,
        onPageLoaded = { hideLoading() }
    )
    // Fullscreen button (bottom-right, 48dp touch target)
    IconButton(
        onClick = onFullscreen,
        modifier = Modifier.align(BottomEnd).padding(8.dp)
    ) { Icon(Icons.Default.Fullscreen) }
  }
  
  // Loading indicator (shown while WebView loads)
  if (isLoading && isPlaying) {
    CircularProgressIndicator(color = GamingGreen)
  }
}
// NOTE: No AdMob banner anywhere near this Box!

PART 3 — STATS BAR (native Compose, below game area):
Row {
    StarRatingBar(rating = game.rating, onRate = onRate, userRating = userRating)
    Text("${game.plays.formatted()} plays")
    CategoryChip(category = category, onClick = navToCategory)
}

PART 4 — GAME INFO CARDS (native Compose, scrollable):
LazyColumn {
    item { GameOverviewCard(description = game.description.stripHtml()) }
    item { HowToPlayCard(instructions = game.instructions.stripHtml()) }
    item { CompatibilityCard() }
    item { TipsCard(tips = getTipsForGame(game.slug)) }
    item { FaqCard(gameTitle = game.title) }
    item { WhyBrowserGames100Card() }
    
    // ADMOB BANNER — placed here, far from game WebView:
    item {
        Spacer(56.dp)
        AdaptiveBannerAd(adUnitId = BuildConfig.BANNER_AD_GAME_INFO)
        Spacer(56.dp)
    }
    
    // RELATED GAMES — native horizontal scroll:
    item {
        RelatedGamesSection(
            games = relatedGames,
            categoryName = category?.name,
            onGameClick = { slug -> navToGame(slug) }
        )
    }
}

GameWebView.kt — COMPLETE SAFE CONFIGURATION:

class GameWebView(context: Context) : WebView(context) {
    init {
        settings.apply {
            javaScriptEnabled = true          // REQUIRED for games
            domStorageEnabled = true           // REQUIRED for game state
            databaseEnabled = true             // game progress storage
            allowFileAccess = false            // NOT needed, disable for security
            allowContentAccess = false         // NOT needed, disable for security
            mediaPlaybackRequiresUserGesture = false  // REQUIRED for game audio
            mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE  // Safe mixed content
            useWideViewPort = true
            loadWithOverviewMode = true
            setSupportZoom(false)
            displayZoomControls = false
            builtInZoomControls = false
            cacheMode = WebSettings.LOAD_DEFAULT
            // Custom user agent identifying our app (helps game servers)
            userAgentString = "$userAgentString BrowserGames100Android/1.0"
        }
        setLayerType(View.LAYER_TYPE_HARDWARE, null)  // Hardware acceleration for smooth gameplay
        isFocusable = true
        isFocusableInTouchMode = true
    }
}

WebViewClient:
- shouldOverrideUrlLoading: allow game origin URLs, block navigation to external sites
- onPageStarted: show loading spinner
- onPageFinished: hide spinner, post { webView.requestFocus() }
- onReceivedError: show retry UI (native Compose overlay)
- onReceivedSslError: handle gracefully (do NOT call handler.proceed() for invalid certs)

WebChromeClient:
- onPermissionRequest: show Android permission dialog FIRST:
  * Camera → request Manifest.permission.CAMERA
  * Microphone → request Manifest.permission.RECORD_AUDIO
  * Only grant WebView permission AFTER user accepts Android dialog
  * If user denies → call request.deny()
- onGeolocationPermissionsShowPrompt: same pattern with ACCESS_FINE_LOCATION
- onShowCustomView: enter fullscreen mode (WindowInsetsController)
- onHideCustomView: exit fullscreen mode
- onConsoleMessage: log only in DEBUG builds

BackHandler:
- if (webView.canGoBack()) webView.goBack() else navigateBack()

Show complete implementation with all safety measures.
```

## Prompt 5.3 — CategoryDetailScreen, SearchScreen, FavoritesScreen

```
Create three screens for BrowserGames100 Android app, all AdMob-policy compliant.

ADMOB RULE FOR ALL SCREENS: 
- Spacer(56.dp) above and below every banner
- No banner within 50dp of Bottom Navigation Bar
- No banner within 50dp of any tappable element

1. CategoryDetailScreen:
ViewModel: fetches category + games, sort state (popular/rating/newest), pagination
Screen layout:
- Breadcrumb: Home > Categories > {Name}
- Category hero card: emoji + name + description + totalGames count
- Spacer(56dp) + AdaptiveBannerAd(BANNER_AD_CATEGORY) + Spacer(56dp)
- Sort chips: Most Played | Top Rated | Newest (FilterChip components)
- Game count text: "{N} games"
- LazyVerticalGrid(2 columns) of GameCards
- Load More button (when hasMore)
- About {Category} expandable text section
- FAQ accordion for category
- Other Categories horizontal LazyRow
- Back-to-Top FAB (after 600dp scroll)

2. SearchScreen:
ViewModel: 300ms debounced search, category filter
Screen layout:
- SearchBar (always focused on open)
- EMPTY state: Popular Searches chips + Browse by Category chips
- LOADING state: CircularProgressIndicator
- RESULTS state:
  * Count + category filter chips
  * LazyVerticalGrid(2 columns) of results
  * Spacer(56dp) + AdaptiveBannerAd(BANNER_AD_SEARCH) + Spacer(56dp)  [at bottom]
- NO RESULTS state: emoji + message + Trending/Categories buttons

3. FavoritesScreen:
ViewModel: reads favorites + recentlyPlayed IDs from DataStore, resolves to GameCompact
Screen layout:
- RECENTLY PLAYED section: LazyRow (horizontal scroll)
  * Header: 🕐 "Recently Played" + count + "Clear" button
  * Empty: "No recent games yet" message
- FAVORITES section: LazyVerticalGrid(2 columns)
  * Header: ❤️ "My Favorites" + count
  * Swipe-to-dismiss or long press to remove
  * Empty: heart animation + "No favorites yet" + "Explore Games" button
- NOTE: No ads on FavoritesScreen (not enough content for balanced placement)

Show complete implementation for all three screens.
```

## Prompt 5.4 — TrendingScreen, CategoriesScreen, Static Screens

```
Create remaining screens for BrowserGames100 Android app.

1. TrendingScreen:
- Header: 🔥 "Trending Right Now" + subtitle
- Spacer(56dp) + AdaptiveBannerAd(BANNER_AD_CATEGORY) + Spacer(56dp)
- LazyVerticalGrid(2 columns) of all trending GameCards

2. CategoriesScreen:
- Header: 🎯 "Browse by Genre"
- LazyVerticalGrid(2 columns) of CategoryCard:
  * Large emoji, name (bold), game count, chevron right
  * Tap → navigate to CategoryDetailScreen

3. SettingsScreen (NEW — required for AdMob compliance):
- "Appearance" section: Dark/Light mode toggle
- "Privacy & Ads" section:
  * "Ad Personalization" toggle (ON = personalized, OFF = non-personalized)
  * "Reset Privacy Choices" button → shows UMP form
  * "Do Not Sell My Data" link (CCPA)
- "About" section: App version, Privacy Policy link, Terms link
- "Support" section: Contact, Rate App, Share App
- "Data" section: "Clear Recently Played" button, "Clear All Favorites" button

4. NO-AD STATIC SCREENS (CRITICAL for AdMob policy — NO banners or interstitials):
Create StaticContentScreen composable (reusable):
- Scrollable LazyColumn with header + content
- NO AdMob ads on these screens (policy: ads must not appear on policy/legal pages)

AboutScreen: mission, stats, team, contact info
ContactScreen: contact form (Name, Email, Subject, Message) + submit to /api/submissions/contact
PrivacyPolicyScreen: full privacy policy text — NO ADS
TermsOfServiceScreen: full terms text — NO ADS
DisclaimerScreen: disclaimer text — NO ADS
DMCAScreen: DMCA policy text — NO ADS

5. BlogListScreen: list of BlogPostCard (thumbnail, title, date, tags, summary)
6. BlogPostScreen: full blog post + AdaptiveBannerAd below content + related posts

Show complete implementation.
```

---

# PHASE 6 — FEATURES & PERSISTENCE

## Prompt 6.1 — DataStore & User Preferences

```
Implement complete user data persistence for BrowserGames100 Android app.

UserDataStore.kt using Preferences DataStore:

Preference Keys:
val FAVORITES = stringPreferencesKey("favorites")         // JSON: "[1,2,3]"
val RECENTLY_PLAYED = stringPreferencesKey("recently_played")   // JSON: "[5,3,1]" max 20
val DARK_MODE = booleanPreferencesKey("dark_mode")        // default true
val ONBOARDING_COMPLETE = booleanPreferencesKey("onboarding_done")
val GAMES_PLAYED_COUNT = intPreferencesKey("games_played")  // for interstitial gate
val LAST_INTERSTITIAL_MS = longPreferencesKey("last_interstitial") // epoch ms
val AD_CONSENT = booleanPreferencesKey("ad_consent")
val PERSONALIZED_ADS = booleanPreferencesKey("personalized_ads")
// Ratings stored individually:
fun ratingKey(gameId: Int) = intPreferencesKey("rating_$gameId")

All functions with full coroutine Flow support.
Favorites max: unlimited
RecentlyPlayed max: 20 (trim oldest)
```

## Prompt 6.2 — Background Sync & Notifications

```
Implement background features for BrowserGames100 Android app.

1. GameDataSyncWorker.kt (WorkManager):
   - Runs once daily, requires WiFi + charging
   - Pre-fetches: trending games, categories, initial games page
   - Stores in OkHttp disk cache for offline browsing
   - Constraint: NetworkType.UNMETERED + charging

2. App Shortcuts (launcher shortcuts):
   shortcuts.xml:
   - Static: "Trending Games" → TrendingScreen
   - Static: "Search Games" → SearchScreen with keyboard focus
   Dynamic shortcut (added after first game play):
   - "Resume: {lastGame.title}" → GamePlayerScreen

3. In-App Review:
   - Trigger: after user plays 5th game
   - Use Google Play In-App Review API (ReviewManager)
   - Show ReviewInfo dialog in activity
   - Only show once (store "review_shown" in DataStore)

4. Deep Links (AndroidManifest.xml intent-filter):
   <intent-filter android:autoVerify="true">
     <action android:name="android.intent.action.VIEW" />
     <category android:name="android.intent.category.DEFAULT" />
     <category android:name="android.intent.category.BROWSABLE" />
     <data android:scheme="https" android:host="browsergames100.com" />
   </intent-filter>
   Handle: /game/{slug}, /category/{slug}, /trending, /search

Show complete implementation.
```

---

# PHASE 7 — PLAY STORE SUBMISSION & ADMOB APPROVAL

## Prompt 7.1 — Play Store Listing & Release Build

```
Create all assets and configuration for Google Play Store submission and AdMob approval.

1. APP METADATA for Play Store:
App Name: BrowserGames100 - Free Online Games
Short Description (80 chars max): Play 28,000+ free HTML5 games! Action, puzzle, racing & more. No download!
Full Description (4000 chars):
[Include: 28K+ HTML5 games, all categories listed, Favorites/History system, Dark mode,
Blog with gaming guides, Safe for teens, Supported by Google AdMob ads (transparent),
Privacy Policy link, Family-safe content. Use relevant keywords throughout.]

Category: Games > Casual (best CPM for casual gaming apps)
Content Rating: Teen (ESRB T) or Everyone 10+
Tags: browser games, html5 games, online games, free games, arcade games

2. DATA SAFETY FORM (required for Play Store, affects AdMob approval):
Data collected: NONE from users directly
- No personal data collected by the app
- No account/login required
- DataStore (local only): game preferences, favorites, recently played
- Third-party: Google AdMob may collect device identifiers for ads (disclose this)
- User data not shared with third parties (except AdMob as disclosed)

3. CONTENT RATING QUESTIONNAIRE answers:
- Violence: Mild (cartoon/fantasy)
- Sexual content: None
- Language: None
- Controlled substances: None
- Target age: 10+
- Ads: Yes, Google AdMob ads shown

4. RELEASE build.gradle.kts configuration:
signingConfigs {
    release {
        storeFile = file("browsergames100-release.keystore")
        storePassword = System.getenv("KEYSTORE_PASSWORD")
        keyAlias = "browsergames100"
        keyPassword = System.getenv("KEY_PASSWORD")
    }
}

buildTypes {
    release {
        isMinifyEnabled = true
        isShrinkResources = true
        proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        signingConfig = signingConfigs.getByName("release")
        buildConfigField("String", "ADMOB_APP_ID", "\"ca-app-pub-REAL_ID~REAL_ID\"")
        buildConfigField("String", "BANNER_AD_HOME", "\"ca-app-pub-REAL_ID/REAL_ID\"")
        // ... other real ad unit IDs
    }
    debug {
        buildConfigField("String", "ADMOB_APP_ID", "\"ca-app-pub-3940256099942544~3347511713\"")
        buildConfigField("String", "BANNER_AD_HOME", "\"ca-app-pub-3940256099942544/6300978111\"")
        // ... all test IDs
    }
}

5. PROGUARD RULES for AdMob + Retrofit + Gson:
-keep class com.google.android.gms.ads.** { *; }
-keep class com.google.android.ump.** { *; }
-keep class com.browsergames100.app.data.model.** { *; }
-keepattributes Signature
-keepattributes *Annotation*
-keep class retrofit2.** { *; }
-keep class okhttp3.** { *; }
-keep class com.google.gson.** { *; }

6. ADMOB APPROVAL CHECKLIST (verify before submitting):
□ App published to Play Store (at least Internal Testing)
□ All screens functional (test on real device, not emulator)
□ GDPR consent dialog shows on first launch
□ Privacy Policy accessible in-app (PrivacyScreen) AND in Play Store listing
□ No ads on Privacy/Terms/About/Contact screens
□ Banner ads have 50dp+ gap from navigation
□ Interstitial only after 3rd game, with 120s minimum interval
□ App does not crash or ANR during normal use
□ Content rating set to Teen/Everyone 10+ (not Children)
□ Data Safety form completed accurately
□ Test ads showing correctly with test IDs
□ App title and description do not promise unrealistic earnings/rewards

Show complete configuration files.
```

## Prompt 7.2 — Revenue Optimization (After AdMob Approval)

```
After receiving AdMob approval, implement these revenue optimization strategies for BrowserGames100 Android app.

1. ADAPTIVE BANNER ADS (already implemented — best practice):
   - Use AdSize.getCurrentOrientationAnchoredAdaptiveBannerAdSize() 
   - Adaptive banners earn 10-40% more than fixed 320x50
   - Switch all BannerAd composables to AdaptiveBannerAd

2. ADMOB MEDIATION (increases fill rate and CPM):
   Add mediation adapters in build.gradle.kts:
   - Meta Audience Network adapter
   - AppLovin MAX adapter
   - Unity Ads adapter
   - ironSource adapter
   Configure in AdMob console: Mediation > Create Mediation Group

3. AD REFRESH RATE:
   - Let AdMob manage refresh (default 60 seconds) — do NOT override
   - Banner stays visible while user scrolls lists (good viewability = high CPM)

4. REWARDED INTERSTITIAL (premium CPM — $5-20):
   Use cases:
   - "Watch an ad to see Pro Tips for this game" (in GamePlayerScreen tips section)
   - "Watch an ad to unlock 5 more search results" (SearchScreen)
   - "Watch an ad to remove ads for 30 minutes" (Settings screen)
   Implementation: RewardedInterstitialAd.load() → show on user action → grant reward

5. NATIVE ADS IN GAME GRID (high CTR):
   Every 6th item in LazyVerticalGrid = NativeAdCard (looks like a game card but is an ad)
   Use NativeAd with: headline (game title style), image (game thumbnail style), body (short description)
   This blends naturally with game cards = higher CTR than banner = higher RPM

6. APP OPEN ADS (cold start monetization):
   - Show AppOpenAd when user returns to app after 30+ seconds in background
   - AppOpenAdManager: load ad in background, show on App.onActivityStarted()
   - Skip if user is on GamePlayerScreen (don't interrupt gameplay)
   - Very high CPM ($5-15) as user has fresh attention

7. ANALYTICS (to optimize eCPM):
   Add Firebase Analytics:
   - Track: game_played(game_id, category), favorite_added, search_performed
   - Track: ad_banner_impression, ad_interstitial_shown, ad_rewarded_completed
   - Use Firebase Remote Config to A/B test ad placements
   - Monitor eCPM by screen, by country, by ad format

8. EXPECTED REVENUE ESTIMATES (for gaming apps with 1000 DAU):
   Banner (2 per session, 5 min avg): ~$0.50/day
   Interstitial (0.5 per session): ~$1.50/day
   App Open (1 per day): ~$2.00/day
   Rewarded (10% conversion): ~$0.80/day
   Native Ads: ~$0.50/day
   Total estimate: ~$5.30/day for 1000 DAU = ~$160/month
   Scale to 10K DAU: ~$1,600/month
   Scale to 100K DAU: ~$16,000/month

   Key levers to increase revenue:
   - Improve app store rating (higher rating → more installs → more DAU)
   - Add more content (blog posts, game guides) → users spend more time → more ad impressions
   - Improve search (users find games faster → more sessions)
   - Push notifications → bring users back → higher retention → more DAU

Show complete implementation for all optimization strategies.
```

---

# PHASE 8 — TESTING & QUALITY ASSURANCE

## Prompt 8.1 — Testing

```
Create comprehensive tests for BrowserGames100 Android app.

1. UNIT TESTS:

GameRepositoryTest.kt:
- Test 3-step game detail lookup (slug→id→chunk→game)
- Test search filtering (case insensitive)
- Test cache behavior (same URL fetched once)
- Mock Retrofit responses with MockWebServer

AdManagerTest.kt:
- Test interstitial gate (< 3 games: don't show)
- Test time gate (< 120s since last: don't show)
- Test consent check (no consent: don't show)

UserDataRepositoryTest.kt:
- Test toggle favorite (add then remove)
- Test recently played (max 20, ordering, deduplication)
- Test rating storage
- Use in-memory DataStore

2. UI TESTS (Compose):

HomeScreenTest.kt:
- Hero section visible
- Game cards clickable → navigate to GamePlayer
- Ad banners have correct margin from nav

GamePlayerScreenTest.kt:
- Play button visible before game start
- WebView appears after play pressed
- Favorite toggle changes icon
- Back press with WebView history → goes back in WebView
- Back press without WebView history → navigates to Home

AdMobComplianceTest.kt — CRITICAL:
- Verify NO ad views inside WebView container
- Verify 50dp minimum gap from banner to any clickable element
- Verify no ads on Privacy/Terms/Contact screens
- Verify interstitial not shown on first game play

3. MANUAL TEST CHECKLIST (for AdMob review readiness):
□ Install fresh app on real Android device
□ Complete onboarding
□ Accept GDPR consent (test banner with test ID shows)
□ Browse Home: all sections load
□ Tap category: CategoryDetailScreen loads
□ Play 3 games: interstitial shows on 3rd (test interstitial)
□ Search "slope": results appear with filter chips
□ Add to favorites: heart turns red, count in tab badge updates
□ Open Privacy Policy: NO ads visible
□ Open Settings: dark mode toggle works, privacy reset works
□ Rotate screen: no crashes, WebView resizes correctly
□ No internet: cached screens show, offline message shown
□ Deep link: open https://browsergames100.com/game/slope in Chrome → app opens GamePlayer

Show complete test implementations.
```

---

# APPENDIX: QUICK REFERENCE

## WebView Settings: What's Safe vs Dangerous

```
// ✅ SAFE — required for HTML5 games:
javaScriptEnabled = true
domStorageEnabled = true
databaseEnabled = true
mediaPlaybackRequiresUserGesture = false
useWideViewPort = true
loadWithOverviewMode = true
LAYER_TYPE_HARDWARE (hardware acceleration)

// ⚠️ USE WITH CAUTION:
mixedContentMode = MIXED_CONTENT_COMPATIBILITY_MODE  ← Use this (not ALWAYS_ALLOW)
WebChromeClient permissions ← Show Android dialog FIRST before granting

// ❌ DANGEROUS — don't use:
mixedContentMode = MIXED_CONTENT_ALWAYS_ALLOW  ← Can cause AdMob rejection
allowFileAccess = true  ← Security risk, not needed for games
allowUniversalAccessFromFileURLs = true  ← Major security hole, never use
```

## AdMob Ad Placement: Do's and Don'ts

```
✅ DO:
- Place banners between content sections (not at top/bottom of screen near nav)
- Use Adaptive Banners (getCurrentOrientationAnchoredAdaptiveBannerAdSize)
- 56dp spacer above and below every banner
- Show interstitial only in transitions (between screens), never during gameplay
- Pre-load next interstitial while current one is showing
- Test with test IDs until Play Store publishing

❌ DON'T:
- Place banner inside or overlapping WebView container
- Show ads on Privacy/Terms/About/Contact screens
- Show interstitial immediately on app open
- Show interstitial more than once per 120 seconds
- Auto-refresh banner more often than AdMob's default
- Show rewarded ad without a real reward
- Place any banner near bottom nav bar
```

## Data Flow for AdMob-Compliant Game Launch

```
User taps GameCard
  ↓
Check AdManager.canShowInterstitial()
  ├── NO (< 3 games OR < 120s OR no consent) → Navigate to GamePlayer directly
  └── YES → Show InterstitialAd
              ↓
           Ad Dismissed/Closed by user
              ↓
           Navigate to GamePlayer
              ↓
           Update lastInterstitialTime in DataStore
              ↓
           Pre-load next interstitial in background

Inside GamePlayer:
  User taps Play button (native Compose)
  ↓
  WebView loads game.iframeUrl
  ↓
  Game plays in WebView (isolated from AdMob)
  ↓
  After 2 minutes: "Try Next Game?" native overlay (not an ad)
  ↓
  Below game info cards: BannerAd (native Compose, NOT in WebView)
```

## Key Technical Decisions

| Web App Feature | Android Equivalent |
|---|---|
| `localStorage` | Jetpack DataStore Preferences |
| React Router | Jetpack Navigation Compose |
| Lazy loading images | Coil 3.x with shimmer placeholder |
| `fetch()` JSON | Retrofit + Kotlin Coroutines |
| iframe game player | WebView (MIXED_CONTENT_COMPATIBILITY_MODE) |
| CSS animations | Compose animate* APIs |
| Tailwind CSS | Material3 + GamingColors |
| Context/Provider | Hilt DI + CompositionLocal |
| Web Share API | Android Intent.ACTION_SEND |
| PWA fullscreen | WindowInsetsController immersive mode |
| Google AdSense | Google AdMob (Banner + Interstitial + AppOpen) |
| Cookie consent dialog | Google UMP SDK |
| localStorage consent | DataStore boolean |

## HOW TO USE THESE PROMPTS IN GEMINI AI STUDIO

1. **Start fresh** — new conversation in Gemini AI Studio
2. **Paste the PRE-PROMPT** architecture context first (critical for domain knowledge)
3. **Do Phase 0 prompts** — get AdMob strategy clear before writing any code
4. **Work sequentially** — each phase builds on previous
5. **After each prompt** — copy code into Android Studio, fix compile errors, commit to git
6. **Test on real device** — emulator has limited WebView and AdMob support
7. **Use TEST ad unit IDs** throughout development — never use real IDs until published
8. **Publish to Internal Testing** on Play Store before applying for AdMob
9. **Apply for AdMob** after app is in Internal Testing and fully working
10. **Replace test IDs** with real IDs only after AdMob approval

> ✅ **SUCCESS CRITERIA**: App passes AdMob policy review and begins serving real ads.
> Target timeline: 2-3 weeks development → 1 week Play Store review → 1-3 days AdMob review → LIVE!
