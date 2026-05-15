# FoodFacts

FoodFacts is a React + Vite nutrition search app that uses the Open Food Facts API to search food products and display nutrition information in responsive cards.

## Features

- Functional React components only
- Controlled search input with `useState`
- Fetch API integration with async/await
- Loading, empty, and no-results states
- Responsive dark UI with CSS only
- Safe fallback handling for missing API data

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Open Food Facts API

## Folder Structure

```txt
src/
├── components/
│   ├── SearchBar.jsx
│   ├── FoodCard.jsx
│   └── FoodList.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Setup

```bash
npm install
npm run dev
```

Open the app at the local Vite URL shown in the terminal.

## API Used

```txt
https://world.openfoodfacts.org/cgi/search.pl?search_terms=QUERY&search_simple=1&action=process&json=1
```

## Git Workflow Suggested

```bash
git init
git add .
git commit -m "setup: scaffold FoodFacts project"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
git checkout -b feature/foodfacts-search
git push -u origin feature/foodfacts-search
```

## Screenshot Suggestions

- Empty state before searching
- Loading state while fetching
- Results grid for a query like `banana`
- No-results state for an obscure query like `xyzabc123`
- Mobile responsive view of the results grid

## Notes

- Multi-word searches work because the query is URL-encoded with `encodeURIComponent`.
- Missing product data is handled safely with optional chaining and fallback text.
