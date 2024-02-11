## TSH – Node.js Developer recruitment task

Here is my solution to the task

git repository ➔ [https://github.com/veriKami/verikami-node-tsh-v2](https://github.com/veriKami/verikami-node-tsh-v2)

```
ツ git clone https://github.com/veriKami/verikami-node-tsh-v2
```

🍋 run (ts-node) version

```
ツ npm start
```

🍋 test (jest + supertest)

```
ツ npm test
```

reset (db.json)

```
ツ npm run reset
```

## Solution

web interface ➔ [http://localhost:8000](http://localhost:8000)

```
🐧 | Movie | Movies | Movies(d) | Movies(g) | Movies(dg) | Movies(d[g]) | 🍋 Make Movie | (json) Movie | (json) Movies
```

**Interface Description**

1. 🐧 (html) – [/](http://localhost:8000) – displays random movie

2. **Movie** (html) – [/movie](http://localhost:8000/movie)
   - returns random movie from "no duplicates" set - `json object {}`

3. **Movies** (html) – [/movies](http://localhost:8000/movies)
   - returns random movie from "no duplicates" set - `json array [0]`

4. **Movies(d)** (html) – [/movies/?d=100](http://localhost:8000/movies/?d=100)
   - returns random movie from set filtered by duration

5. **Movies(g)** (html) – [/movies/?g=Comedy,Fantasy,Romance](http://localhost:8000/movies/?g=Comedy,Fantasy,Romance)
   - returns movies filtered by genres & sorted by "\_\_matches" parameter

6. **Movies(dg)** (html) – [/movies/?d=100&g=Comedy,Fantasy,Romance](http://localhost:8000/movies/?d=100&g=Comedy,Fantasy,Romance)
   - returns movies filtered by duration & genres sorted by "\_\_matches" parameter

7. **Movies(d[g])** (html) – [/movies/?q={"runtime":"100","genres":["Comedy","Fantasy","Romance"]}](http://localhost:8000/movies/?q={"runtime":"100","genres":["Comedy","Fantasy","Romance"]})
   - as above with json query format

8. 🍋 **Make Movie** (html) – [/make](http://localhost:8000/make)
   - new movie interface when you can test inserts (with validation)

**JSON format is available by adding the "json" suffix**

1. (json) **Movie** – [/movie/json](http://localhost:8000/movie/json)

2. (json) **Movies** – [/movies/json](http://localhost:8000/movies/json)

3. (json) **Movies(d)** – [/movies/json/?d=100](http://localhost:8000/movies/json/?d=100)

4. (json) **Movies(g)** – [/movies/json/?g=Comedy,Fantasy,Romance](http://localhost:8000/movies/json/?g=Comedy,Fantasy,Romance)

5. (json) **Movies(dg)** – [/movies/json/?d=100&g=Comedy,Fantasy,Romance](http://localhost:8000/movies/json/?d=100&g=Comedy,Fantasy,Romance)

6. (...)

## Project Structure

```
src
├── @types
│   └── index.d.ts          ⬅︎ Type Definitions
├── app
│   ├── app.ts              ⬅︎ Application
│   └── router.ts           ⬅︎ Router
├── config
│   └── db.ts               ⬅︎ Database Connection
├── controllers             ⬅︎ Controllers
│   ├── get.movie.ts
│   ├── get.movies.ts
│   └── post.movie.ts
├── middlewares             ⬅︎ Middlewares
│   ├── m.error.ts
├── renders
│   ├── make.movie.ts
│   └── make.search.ts
├── server.ts               ⬅︎ Starting Point
└── utils
    ├── display.log.ts
    ├── movie.filters.ts
    ├── movie.validator.ts
    ├── req.utils.ts
    └── script.utils.ts

```

## Documentation

🍋 You can generate documentation (markdown + html) via:

```
ツ npm run docs
```

It will be located in `docs` folder.

## Note

I think I managed to address (to a greater or lesser extent) all the problems raised, although the solution is sketchy and simplified in many places. 

🐧 Weronika Kami (veriKami) 🐧 [https://www.linkedin.com/in/verikami](https://www.linkedin.com/in/verikami)
