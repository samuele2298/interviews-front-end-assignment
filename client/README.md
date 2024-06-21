
# RecipeBook

Questo progetto e' stato una bella sfida che mi ha insegnato tanto e non vedo l'ora di parlarne con voi.

RecipeBook è una applicazione community-driven per la condivisione di ricette. Gli utenti possono navigare tra le ricette, aggiungere nuove ricette, lasciare commenti e valutazioni. L'applicazione consente agli utenti di cercare ricette per ingredienti o cucina e di filtrare i risultati in base alle preferenze dietetiche.


## API Reference

#### Get all items

```http
https://recipeapi.up.railway.app/recipes
https://recipeapi.up.railway.app/comments
https://recipeapi.up.railway.app/cuisines
https://recipeapi.up.railway.app/difficulties
https://recipeapi.up.railway.app/diets

GET POST PUT PATCH DELETE OPTIONS

```



## Demo

https://recipeboook.vercel.app/



## Installation

Installalo con NPM O PNPM

```bash
  cd progetto
  pnpm install
  npm install
```
    
    
## Deployment

To deploy this project run

```bash
  npm run dev
```


## Running Server

To run server, run the following command

```bash
  cd Server
  npm run start
```


### Features

### Tech Stack

**Client:** 

- React
- Typescript
- Tailwindcss


## Optimizations

- Axios for better error handling
- SPA React Router
- Tanstack React Query useInfiniteQuery hook for pagination
- Global states and persistent states by zustand


## Screenshots


