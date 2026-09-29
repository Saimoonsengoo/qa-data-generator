# QA Test Data Generator

Client-side QA utility for generating users, customers, employees, products, IDs, dates, numbers, boundary values and custom JSON. Export as JSON/CSV, copy to clipboard, save presets in localStorage. No backend, no database.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
```

## Deploy to Vercel
Push to GitHub, then Vercel → Add New → Project → import the repo. Vite is auto-detected (build `npm run build`, output `dist`). No env vars needed.
CLI alternative: `npm i -g vercel && vercel --prod`.

## Structure
```
src/
  generators/   one file per generator + index.ts registry
  components/   Sidebar, Dashboard, GeneratorPage, OptionField, ResultView, Presets
  lib/          random helpers, export (CSV/download/copy), localStorage
  data.ts       sample name/geo/product lists
  types.ts      GeneratorDef, OptionSpec, Preset ...
```

## Add a new generator
1. Create `src/generators/myThing.ts` exporting a `GeneratorDef`:
   ```ts
   export const myThing: GeneratorDef = {
     id: 'myThing', name: 'My Thing', description: 'What it makes',
     fields: ['id', 'label'],
     options: [{ key: 'prefix', label: 'Prefix', type: 'text', default: 'X' }],
     validate: (o) => '',                       // return an error message or ''
     generate: (i, o) => ({ id: `${o.prefix}-${i + 1}`, label: 'Test' }),
   };
   ```
2. Add it to the `GENERATORS` array in `src/generators/index.ts`.

The sidebar, dashboard card, options form, validation, table/JSON/CSV output, export and presets all work automatically. Use `singleShot` + `generateAll` for fixed sets (see `boundary.ts`), or empty `fields` for raw objects (see `json.ts`).
