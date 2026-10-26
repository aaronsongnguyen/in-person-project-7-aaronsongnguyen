# Week 9: React Effects, Context API & Data Fetching
## Make the Portfolio Dynamic: a Global Theme and Projects Loaded from an API

### Learning Objectives
By completing this project, you will:
- Share state across components with the Context API instead of passing props down every level
- Run code after render with `useEffect`, and clean it up when the component unmounts
- Fetch data from a REST API with `async`/`await`, with loading and error states the user can see
- Prevent a race condition with an effect cleanup flag
- Persist a preference in `localStorage` from an effect
- Send a POST request and update local state from the response

### Prerequisites
Before starting, you should have:
- Completed In-Person Project 6 (the portfolio split into components with `useState`)
- Done the week 9 prep: React Front To Back chapters 6 and 7 (`useEffect`, Context and APIs)
- Node 18 or newer installed (`node -v`)

### Project Overview
Last week your portfolio became components that own their own state. Today two things change. The theme (light or dark) becomes global state that every component can read through a Context, so the toggle in the Navbar changes the whole page without a prop chain. And the project list stops being a hardcoded array: a Projects Context fetches it from a REST API (a local mock server, `json-server`) inside `useEffect`, shows a spinner while it loads, shows an error with a retry if the request fails, and cleans up after itself.

These are the patterns the rest of the term is built on. The 253A group project is a front end that talks to an external API: today's `useEffect` plus `fetch` plus loading and error states is exactly that pattern, done once on your own portfolio before you do it on your team's idea, and persisting data is a graded group-project requirement (10 points), for which the theme in Part 2 and the POST in Part 5 are the two simplest examples. Assignment 2 (the React Task Manager, due Friday October 30, 9:00 AM PT) grades none of today's material: everything it grades was taught by October 19, so do not add effects, Context or fetch to it, and do not wait for them.

### Getting Started

#### First: Create your own copy of this template
This repository is a GitHub **template** (GitHub Classroom is not used this term). Make your own copy of it, then clone that copy.

1. On this repository's page, click the green **Use this template** button and choose **Create a new repository**. On the next screen: Owner = your own GitHub account, Repository name = `in-person-project-7-<your-github-username>`, visibility **Public**. Click **Create repository**. (This makes your own copy of the starter, not a fork.)

2. **Clone your new repository:**
   ```bash
   git clone https://github.com/<your-github-username>/in-person-project-7-<your-github-username>.git
   cd in-person-project-7-<your-github-username>
   ```

#### Second: Install and run BOTH servers (start this now)
Today there are two servers: Vite for the page, and `json-server` for the mock API. One command starts both. Start the install first; on classroom wifi it can take a few minutes, and you can read Part 1 while it runs.

1. **Check Node:** `node -v` must print `v18` or newer. If it prints an older version or "command not found", install the current LTS from https://nodejs.org, then open a new terminal and check again.
2. **Install dependencies** (once per clone):
   ```bash
   npm install
   ```
3. **Start both servers:**
   ```bash
   npm run dev:all
   ```
   This runs `npm run dev` (Vite, port 5173) and `npm run server` (json-server, port 3001) in the same terminal. Keep it running all session.
4. **Check both:** open `http://localhost:5173` for the portfolio, and `http://localhost:3001/projects` in a second tab. The second tab must show a JSON array of six projects. If it does not, nothing you write in Part 3 can work: see Troubleshooting, "json-server is not running".

**What the starter gives you:** a complete component set under `src/components/` (`Navbar`, `Hero`, `Skills`, `Projects`, `ProjectCard`, `Contact`, `Footer`, plus two new ones, `LoadingSpinner` and `ErrorMessage`), each with TODO comments where today's work goes; two context files under `src/context/` (`ThemeContext.jsx`, `ProjectsContext.jsx`) that are stubs: the hooks return `{}` and the contexts are `null` until you fill them in; `src/data/db.json`, the mock database json-server serves (six projects in three categories: `web`, `mobile`, `data`); `src/main.jsx` with TODOs for the two providers; `src/App.jsx` with TODOs for the theme; a finished `App.css`, and an `index.css` whose `[data-theme="dark"]` rules are already written. `Projects.jsx` shows only its filter buttons and "No projects found in this category." until Part 4: its `projects` array is a hardcoded empty array until then.

#### Third: Choose your path

#### Option A: Bring your week 8 content (Recommended)
If you completed In-Person Project 6 and customized your content (this is a fresh repository either way; nothing continues from your IPP 6 repo except what you copy):

1. **Keep every starter file.** The starter's `Navbar.jsx`, `Projects.jsx`, `main.jsx`, `App.jsx`, both context files, `db.json` and `App.css` carry today's TODOs and the dark-theme CSS. Do not replace them with your week 8 versions.
2. **Bring your content, not your structure.** Copy your own text into the starter's `Hero.jsx`, `Skills.jsx`, `Contact.jsx` and `Footer.jsx` (your name, your skills, your links). If you want your own projects, edit `src/data/db.json`: keep the field names (`id`, `title`, `description`, `category`, `technologies`, `imageUrl`, `githubUrl`, `liveUrl`, `featured`, `createdAt`), because `ProjectCard.jsx` reads them.
3. **Open your week 8 `Projects.jsx` beside the starter's** for reference; the filter state you wrote last week is already in the starter, and Part 4 adds the loading and error branches above it.
4. **Your CSS tweaks from week 8** are not in the starter's `App.css` (it is the stock file plus the dark-theme variables). Copy them over after Part 4, once the page renders from the API.

#### Option B: Fresh Start
If you did not finish In-Person Project 6, use the starter exactly as it is. It is the finished week 8 portfolio ("John Doe") with today's TODOs added; every Part below works on it without any copying.

### Step-by-Step Instructions

**Today's core is Parts 1 to 4** (the architecture, the Theme Context, the Projects Context that fetches, and the Projects component that shows loading, error and data): finish those first. Part 5 (adding a project with a POST request) is next if you have time, and the Extension Activities come after that. Each part ends with a checkpoint that says what you should see.

#### Part 1: Understanding the Architecture (10 minutes)

**What we're building:**
- A **Theme Context** that holds `theme` and `toggleTheme` for the whole app
- A **Projects Context** that fetches the project list once, and holds `projects`, `loading` and `error`
- A `Projects` component that renders one of three things: a spinner, an error with retry, or the cards

**The data flow:**
```
json-server (port 3001)  -->  useEffect + fetch in ProjectsProvider  -->  context state  -->  Projects component
                                                      |
                                              loading / error states
```

**Key files:**
- `src/context/ThemeContext.jsx`: the theme state, its effect, the `useTheme` hook
- `src/context/ProjectsContext.jsx`: the fetch effect, the `useProjects` hook, later `addProject`
- `src/main.jsx`: where both providers wrap `<App />`
- `src/components/Projects.jsx`: the three render branches
- `src/data/db.json`: the mock database (open it; the shape of one project is the shape your components expect)

**Read before you type:** open `ThemeContext.jsx` and `ProjectsContext.jsx` and read the TODO comments top to bottom. Every line you write today is named there.

**Checkpoint:** you can say, in one sentence each, what a Provider is, what a custom hook like `useTheme` returns, and why `Projects.jsx` cannot read the projects until `main.jsx` is wrapped.

#### Part 2: The Theme Context (15 minutes)

**Step 1: Fill in `src/context/ThemeContext.jsx`**

Replace the `null` with a real context, make the hook return it, and give the provider its state and effect:

```jsx
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
```

**What's happening here:**
- `useState(() => ...)` is a lazy initializer: the function runs once, on the first render, so `localStorage` is read once, not on every render.
- The effect runs after every render in which `theme` changed (that is what `[theme]` means), and does the two side effects React must not do during render: touching the DOM and writing storage. The attribute goes on `<html>` (`document.documentElement`) so that `index.css`'s `[data-theme="dark"]` rules reach everything, Navbar and Footer included; putting it on `<main>` would darken only the middle of the page, because CSS custom properties inherit downward only.
- The hook throws if there is no provider above it: a loud failure in the console beats a silent `undefined`.

**Step 2: Wrap the app in `src/main.jsx`**

Import `ThemeProvider` and put it around `<App />` inside `StrictMode`. (Leave room: `ProjectsProvider` goes inside it in Part 3.)

**Step 3: Use the theme**

In `src/components/Navbar.jsx`, call `useTheme()` and add a button that calls `toggleTheme` on click; its label is a sun icon in light mode and a moon in dark (an emoji is fine), or the other mode's name. The starter's `App.jsx` TODO about `<main>` is not needed: the effect above already applies the theme to the whole document, so leave `App.jsx` alone.

**Common mistakes to avoid:**
- Calling `useTheme()` in a component that is not under the provider (the thrown error names it)
- Reading `localStorage` inside the effect instead of the initializer, so the first render is always light
- Forgetting the dependency array, so the effect runs after every render

**Checkpoint:** the Navbar button flips the whole page, header and footer included, between light and dark; refresh the page and it stays in the mode you chose. In DevTools, Application tab, Local Storage, you can see the `theme` key, and in the Elements tab `<html data-theme="dark">`.

#### Part 3: The Projects Context with a Fetch (20 minutes)

**Step 1: Fill in `src/context/ProjectsContext.jsx`**

Same three moves as Part 2 (a real context, a hook that throws without a provider, a provider), then the state and the effect:

```jsx
export const ProjectsProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:3001/projects');
        if (!response.ok) {
          throw new Error(`HTTP error, status ${response.status}`);
        }
        const data = await response.json();
        if (!isCancelled) {
          setProjects(data);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      isCancelled = true;
    };
  }, []);

  const value = { projects, loading, error };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
```

**What's happening here:**
- The effect has an empty dependency array, so it runs once after the first render: fetch on mount.
- The `async` function is declared inside the effect and called; an effect callback itself must not be `async` (React expects it to return a cleanup function, not a promise).
- `response.ok` is false for a 404 or a 500, and `fetch` does not throw for those; you throw so one `catch` handles every failure.
- The cleanup sets `isCancelled`, and every `setX` after `await` checks it. If the provider unmounts while the request is in flight, nothing updates a dead component. In development, React 18 StrictMode mounts, unmounts and remounts every component once, so you will see the fetch run twice in the Network tab; the first run's cleanup fires, and the flag is why that is harmless.

**Step 2: Wrap the app**

In `src/main.jsx`, put `<ProjectsProvider>` inside `<ThemeProvider>`, around `<App />`.

**Checkpoint:** nothing visible changes yet (Projects still reads its hardcoded empty array), but in the Network tab you see `projects` requested from port 3001 with a 200 and six items in the response (two such requests in development, both 200: that is the StrictMode double run from the last bullet, not a bug). Stop json-server with Ctrl+C and reload: the request fails; start it again with `npm run server` in a second terminal (or `npm run dev:all` again).

#### Part 4: Projects Reads the Context (15 minutes)

**Step 1: Replace the hardcoded data in `src/components/Projects.jsx`**

Delete the three temporary lines (`const projects = []`, `loading`, `error`) and read them from the hook:

```jsx
const { projects, loading, error } = useProjects();
```

**Step 2: Three render branches**

Uncomment and finish the two early returns the starter sketched: if `loading`, render the section heading with `<LoadingSpinner />`; if `error`, render the heading with `<ErrorMessage message={error} onRetry={() => window.location.reload()} />` (Retry reloads the page, which re-runs the fetch; it does not refetch in place). Only after both does the normal return run: the filter buttons, then

```jsx
const filteredProjects = filter === 'all'
  ? projects
  : projects.filter(project => project.category === filter);
```

mapped to `<ProjectCard key={project.id} project={project} />`.

**What's happening here:**
- Early returns are the simplest way to render one of several states. The order matters: loading first, then error, then data.
- `filteredProjects` is derived on every render from `projects` and `filter`; it is not state. Storing it would go stale the moment the fetch resolved.
- `key={project.id}` uses the id from the API, not the array index.

**Checkpoint:** the six project cards render from the API, the three filter buttons work, the spinner shows for an instant on load (throttle the network in DevTools to see it longer), and stopping json-server then reloading shows the error message with a Retry button that reloads. Console clean, no `key` warning.

#### Part 5: Adding a Project with a POST (20 minutes)

**Step 1: `addProject` in the Projects Context**

```jsx
const addProject = async (projectData) => {
  const response = await fetch('http://localhost:3001/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...projectData, id: Date.now() })
  });
  if (!response.ok) {
    throw new Error('Failed to add project');
  }
  const newProject = await response.json();
  setProjects(prev => [...prev, newProject]);
  return newProject;
};
```

Add `addProject` to the `value` object.

**Step 2: A small controlled form, in its own file**

Create `src/components/ProjectForm.jsx` (`export default ProjectForm`) and render it inside the Projects section, above the filter buttons. Its own file matters: `Projects.jsx` now has two early returns (loading, error), and a hook declared below an early return crashes React with "Rendered more hooks than during the previous render" the moment the fetch resolves. Every `useState` and `useEffect` in a component sits above the first `return`; a separate component sidesteps the question. The form has `title`, `description` and a `category` select (`web`, `mobile`, `data`), controlled by one `formData` state object like last week's Contact form, plus a fixed placeholder image so the new card is not broken: start `formData` with `imageUrl: 'https://placehold.co/600x400?text=New+Project'` and `technologies: []`. On submit: prevent the default, reject an empty or whitespace-only title (`title.trim() === ''`), `await addProject(formData)` inside `try`/`catch`, reset the form on success, show the error message on failure.

**What's happening here:**
- The server is the source of truth: you append the project the server returned, not the one you sent.
- `setProjects(prev => [...prev, newProject])` is the immutable update from last week; `projects.push` would not re-render.
- json-server writes to `src/data/db.json`, so the new project survives a reload. Open the file and watch it change: it rewrites the whole file (every `technologies` array expands onto its own lines), so `git diff` looks large after one POST. Committing the changed file is fine; `git checkout src/data/db.json` restores the six starter projects.

**Checkpoint:** submitting the form adds a card under the right filter without a reload; reloading the page still shows it; an empty title adds nothing; stopping json-server and submitting shows the error path.

### Extension Activities (requirements and hints only, no code given)

If you finish Parts 1 to 5 early, these are the patterns the group project (253A) and the take-home final (153A) will ask for, done once today on your own portfolio.

#### Tier 1 (about 10 to 15 minutes): do this one

**1. A debounced search box**
- **Goal:** A text input above the project cards that filters by title or description, but only after the user stops typing for half a second.
- **Done when:** typing quickly does not filter on every keystroke; the list updates once, 500 ms after the last key; clearing the box shows everything again.
- **Hint:** two pieces of state, `searchTerm` (bound to the input) and `debouncedTerm`; one effect with `[searchTerm]` as its dependency that sets a `setTimeout` and returns `clearTimeout` as its cleanup. Then filter on `debouncedTerm`. Declare both hooks above `Projects.jsx`'s early returns, or build the box as its own component.
- **Why it matters:** this is the cleanup-returning effect in its most common real form, and the one interviewers ask about.

#### Tier 2 (about 15 to 20 minutes): for the student who finished Tier 1

**2. Delete a project, optimistically**
- **Goal:** A delete button on each card that removes the project from the list immediately and sends a DELETE to `http://localhost:3001/projects/<id>`; if the request fails, the project comes back and an error shows.
- **Done when:** the card disappears with no visible delay; after a reload it is still gone; with json-server stopped, the card disappears and then returns with an error message.
- **Ceiling, stop here:** no edit, no confirmation dialog, no styling.
- **Hint:** keep the old array in a variable before you `setProjects(prev => prev.filter(...))`; in the `catch`, `setProjects(oldProjects)` and set a separate `deleteError` state for the message. Do not reuse the context's `error`: that one replaces the whole grid with the ErrorMessage branch, so the card could never "come back". The context function and the button live in different files; the id travels as a prop.
- **Why it matters:** optimistic updates are how every real app feels fast, and the rollback is the part people forget.

#### Tier 3 (about 15 to 25 minutes, a bounded task): a real external API

**3. Your GitHub repositories, fetched live**
- **Goal:** In a new component `GitHubRepos.jsx` rendered under Projects, fetch `https://api.github.com/users/<your-github-username>/repos` on mount and list each repository's name as a link, with a loading line and an error line, and the same cancelled-flag cleanup as Part 3.
- **Done when:** your real repositories appear (the IPP 7 repository you made today counts); a misspelled username shows the error path (GitHub returns 404); the Network tab shows two requests in development with the first one's cleanup fired.
- **Ceiling, stop here:** no search, no pagination, no stars or dates.
- **Hint:** the shape is Part 3's effect moved into a component (`useState` for `repos`, `loading`, `error`, one `useEffect` with `[]`). GitHub allows 60 unauthenticated requests an hour per public address, and a lecture hall shares a few: if your error branch shows `status 403`, that is the rate limit, not your code; switch the URL to `https://jsonplaceholder.typicode.com/users` (keyless, no limit) and render `name` instead. No API keys in this repository: it is Public, so a key in a `.env` file or a `VITE_` variable ends up on GitHub or in the browser bundle; team API keys belong in the team repo's setup, never here.
- **Why it matters:** this is the 253A group project's core requirement (a front end on an external API) and the shape of the 153A take-home final's data step. If your team has already chosen its API, use that endpoint instead of GitHub's.

### Troubleshooting Guide

**Problem:** `node -v` prints an old version, or "command not found"

**Solution:**
- Vite needs Node 18 or newer. Install the current LTS from https://nodejs.org, close the terminal, open a new one, run `node -v` again.
- On a lab machine where you cannot install, ask for help before class ends rather than losing the hour.

---

**Problem:** `npm install` is taking forever

**Solution:**
- On classroom wifi it can take several minutes. Leave it running and read Part 1 while you wait.
- If it stops with a network error, run `npm install` again; it resumes from the cache.

---

**Problem:** json-server is not running, or `http://localhost:3001/projects` does not load

**Solution:**
- `npm run dev:all` starts both servers; if you ran `npm run dev` alone, open a second terminal in the same folder and run `npm run server`.
- "Port 3001 is in use": another json-server is running in a terminal you forgot. Stop it with Ctrl+C there, then start again.
- The terminal shows `Resources: http://localhost:3001/projects` when it is up. If it shows a JSON parse error, `src/data/db.json` was edited into invalid JSON: check the last comma.

---

**Problem:** "Network request failed" or "Failed to fetch" in the ErrorMessage

**Solution:**
- json-server is down (above), or the URL in `ProjectsContext.jsx` is wrong: it must be exactly `http://localhost:3001/projects`, `http` not `https`.

---

**Problem:** "useTheme must be used within ThemeProvider" (or the same for `useProjects`)

**Solution:**
- `src/main.jsx` does not wrap `<App />` in that provider yet, or the provider is imported from the wrong path. Both providers go inside `<React.StrictMode>`, around `<App />`.

---

**Problem:** "Cannot read properties of undefined" or "Cannot destructure property 'projects'"

**Solution:**
- The hook still returns `{}` (the starter's stub) or the context is still `null`. Finish Part 3 Step 1: `createContext()`, and the hook returns `useContext(ProjectsContext)`.

---

**Problem:** The fetch runs twice in the Network tab

**Solution:**
- That is React 18 StrictMode in development: it mounts, unmounts and remounts each component once. The first effect's cleanup sets `isCancelled`, so its response is ignored. Nothing to fix; it does not happen in a production build.

---

**Problem:** "Can't perform a React state update on an unmounted component"

**Solution:**
- A `setX` after `await` is not guarded. Every state update inside the async function must sit under `if (!isCancelled)`, and the effect must return the cleanup that sets the flag.

---

**Problem:** "Rendered more hooks than during the previous render", and the page goes white when the projects load

**Solution:**
- A `useState` or `useEffect` sits below one of `Projects.jsx`'s early returns (loading or error). Move every hook above the first `return`, or move that feature into its own component file (`ProjectForm.jsx`, `ProjectSearch.jsx`).

---

**Problem:** The theme toggles but does not survive a reload

**Solution:**
- The initial state must read `localStorage` (the lazy initializer in Part 2), and the effect must write it. Check the key is the same string in both places.

---

**Problem:** Only the middle of the page goes dark; the header and footer stay light

**Solution:**
- `data-theme` is on `<main>` instead of `<html>`. The dark rules are CSS custom properties, which inherit downward only. Set it in the effect with `document.documentElement.setAttribute('data-theme', theme)` and remove any `data-theme` from `App.jsx`.

---

**Problem:** Vite dev server won't start

**Solution:**
```bash
# macOS / Linux / Git Bash
rm -rf node_modules package-lock.json
npm install
npm run dev:all
```
```powershell
# Windows PowerShell
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
npm run dev:all
```

---

**Problem:** "Port 5173 is in use"

**Solution:**
- You already have a dev server running in another terminal. Stop it with Ctrl+C there, or let Vite use the next port it prints (5174) and open that URL instead.

---

**Problem:** The page is blank and the console shows a JSX or import error

**Solution:**
- Read the first error line; it names the file and line. A component file must end with `export default Name`, and the import path must match the file name exactly (`./components/Contact`, capitalised).
- Fix the first error only, save, read the next one.

---

**Problem:** "key" prop warning in the console

**Solution:**
- Every element returned from `.map()` needs a `key`; use `project.id` from the API, not the array index.

---

**Problem:** The new project appears, then disappears on reload (or never appears)

**Solution:**
- The POST did not reach json-server (check the Network tab for a 201), or you appended `formData` instead of the project the server returned. json-server writes to `src/data/db.json`; if that file is read-only or invalid JSON, the POST fails.

### Resources & References

**Official Documentation:**
- [React useEffect Hook](https://react.dev/reference/react/useEffect)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) (the cleanup and the StrictMode double-run are explained here)
- [Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [json-server](https://github.com/typicode/json-server)

**Week 9 Prep Work:**
- React Front To Back Chapters 6 and 7 - useEffect, Context & APIs
- Optional: Modern JavaScript Chapter 10 - Promises and Async

### Submit

1. Commit and push your work before you leave (the `.gitignore` in this repository keeps `node_modules`, `dist` and any `.env` file out of the push, so it is quick and safe):
   ```bash
   git add .
   git commit -m "In-person project 7"
   git push
   ```
2. On the bCourses assignment page click **Submit Assignment** and paste the URL of your repository (the repository page, not a file) as the Website URL.
3. Grading is complete/incomplete: a pushed repository that runs with `npm run dev:all`, whose theme toggle works and survives a reload, and whose Projects section loads its cards from json-server with the loading and error branches in place (Parts 1 to 4) earns complete.
4. This is an individual project. No deployment is required.

### Project Checklist

Before submitting:
- [ ] `npm run dev:all` runs both servers and the console is clean on load
- [ ] `ThemeContext.jsx` has a real context, a hook that throws without a provider, a lazy-initialized `theme` and an effect that sets `data-theme` on `<html>` and writes `localStorage`
- [ ] `main.jsx` wraps `<App />` in `ThemeProvider` and `ProjectsProvider`
- [ ] The Navbar toggle flips the theme; a reload keeps it
- [ ] `ProjectsContext.jsx` fetches once on mount inside `useEffect`, with `response.ok` checked, errors caught, and an `isCancelled` cleanup
- [ ] `Projects.jsx` reads `projects`, `loading` and `error` from `useProjects()` and renders the spinner, the error with retry, or the filtered cards with `key={project.id}`
- [ ] Optional: Part 5's `addProject` and form; then Tier 1 of the Extension Activities (the debounced search), then Tier 2 or 3

### Reflection Questions

1. What would it take to pass `theme` to `Footer` without Context, and at what depth does that stop being reasonable?
2. Why must the `async` function be declared inside the effect rather than making the effect callback itself `async`?
3. What goes wrong without the `isCancelled` flag, and why does StrictMode make that visible in development?
4. Which of `projects`, `loading`, `error` and `filteredProjects` is derived, and why is it not in state?

Keep these in mind for the group project: an external API, a loading state, an error state and a cleanup are the first four things a reviewer looks for.

---

Your portfolio now reads its data from an API and shares its theme through a Context. The group project asks you to do the same thing with an API you chose.
