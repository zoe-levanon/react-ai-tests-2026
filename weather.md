# Weather Screen Plan

## Goal

Add a new screen that shows the user's current weather conditions, and add a clear navigation path to that screen from the existing MUI homepage.

## Current Baseline

- The app is a single-screen React + Vite + TypeScript app.
- MUI is already set up globally in `src/main.tsx`.
- There is no routing library or route structure yet.
- The current homepage lives directly in `src/App.tsx`.

## Assumptions

- Weather data will be fetched client-side in the browser.
- User location will come from the browser geolocation API.
- If geolocation is unavailable or denied, the screen should show a recovery state instead of failing silently.
- The initial version only needs current conditions, not forecast/history.

## Implementation Plan

### 1. Introduce route structure

- Add `react-router-dom`.
- Wrap the app in a router in `src/main.tsx`.
- Convert `src/App.tsx` into a route shell instead of a page implementation.
- Define at least two routes:
  - `/` for the current homepage
  - `/weather` for the new weather screen

### 2. Split the current homepage into its own screen component

- Move the existing homepage UI out of `src/App.tsx` into something like `src/screens/HomeScreen.tsx`.
- Keep the current MUI layout intact.
- Replace the external docs button or add a new primary/secondary action that routes to `/weather`.
- Use `Link` integration from MUI + React Router so navigation stays consistent with the current component style.

### 3. Add a weather screen component

- Create `src/screens/WeatherScreen.tsx`.
- Reuse the existing MUI theme and page framing so the new screen feels like part of the same app.
- Include these screen states:
  - Initial state asking for location access
  - Loading state while geolocation and weather data are in flight
  - Success state showing current conditions
  - Error state for denied permission, unavailable location, or fetch failure
- Include a simple way back to the homepage, such as a top-left back button or a small app bar.

### 4. Add a small weather data layer

- Create a dedicated module such as `src/lib/weather.ts` or `src/services/weather.ts`.
- Keep fetch logic out of the screen component so the UI stays focused on rendering.
- The service should:
  - Accept latitude/longitude
  - Request current weather data from a weather API that supports lat/lon lookup
  - Normalize the response into a UI-friendly shape
- Normalize at least:
  - Temperature
  - Weather summary/condition code
  - Wind speed
  - Humidity if available
  - Location label if the chosen API or a reverse-geocoding step provides it

### 5. Add a reusable hook for screen state

- Create a hook such as `src/hooks/useCurrentWeather.ts`.
- Let the hook coordinate:
  - browser geolocation request
  - loading/error state
  - weather fetch
  - refresh action
- Return a compact state object so `WeatherScreen` can stay mostly declarative.

### 6. Define the weather screen UI

- Use MUI components already present in the project:
  - `Container`
  - `Paper`
  - `Stack`
  - `Typography`
  - `Button`
  - `Card`
  - `Chip`
  - `Alert`
  - `CircularProgress`
- Success-state content should show:
  - Current location name or coordinates
  - Current temperature
  - Short condition label
  - Secondary stats in cards or chips
  - Last updated time
- Add a `Refresh` action so the user can re-request current conditions without reloading the page.

### 7. Navigation changes on the main page

- Add a clearly labeled action on the homepage, such as `View local weather`.
- Place it alongside the existing hero actions so it is immediately visible.
- Optionally add a secondary card in the lower section that links to the weather screen as a second navigation path.

### 8. Edge cases and UX rules

- If geolocation permission is denied:
  - show an explanatory error message
  - offer a retry button if the browser allows re-prompting
  - explain that location access is required for local weather
- If weather fetch fails:
  - keep the screen mounted
  - show the error in an `Alert`
  - allow retry without re-requesting theme/router state
- If location lookup succeeds but some weather fields are missing:
  - render partial data instead of blocking the whole screen

### 9. Validation and testing

- Manually verify:
  - homepage -> weather navigation
  - weather -> homepage navigation
  - loading state
  - permission denied state
  - success state with real browser geolocation
  - refresh action
- Run:
  - `npm run lint`
  - `npm run build`
- If tests are added later, mock:
  - `navigator.geolocation`
  - the weather API response

## Suggested File Changes

- `src/main.tsx`
- `src/App.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/WeatherScreen.tsx`
- `src/hooks/useCurrentWeather.ts`
- `src/services/weather.ts`

## Recommended Order

1. Add routing and extract the current homepage.
2. Create the weather screen shell and back navigation.
3. Add the weather service and geolocation hook.
4. Render loading/error/success states.
5. Add homepage entry points to the weather screen.
6. Lint and build.

## Out of Scope for First Pass

- Multi-day forecast
- Weather maps
- Saved locations
- Unit switching between Celsius/Fahrenheit
- Server-side weather proxy
