## The Software House - Node.js Developer recruitment task

Here is my solution to the task

git repository ➔ [https://github.com/veriKami/verikami-node-software-house](https://github.com/veriKami/verikami-node-software-house)

```
ツ git clone https://github.com/veriKami/verikami-node-software-house
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
🐧 | ® Movie | Movies | ® Movies(d) | Movies(g) | Movies(dg) | Movies(d[g]) | 🍋 (+) Movie
```

**Interface Description**

1. 🐧 (html) – [/](http://localhost:8000)
   - displays random movie

2. **® Movie** (json) – [/movie](http://localhost:8000/movie)
   - returns ® random movie from "no duplicates" set

3. **Movies** (json) – [/movies](http://localhost:8000/movies)
   - returns movies with no duplicates (desc order to easy see last inserts)
   - NOTE: to display only one random movie adjust the code

4. **® Movies(d)** (json) – [/movies/?d=100](http://localhost:8000/movies/?d=100)
   - returns ® random movie from set filtered by duration

5. **Movies(g)** (json) – [/movies/?g=Comedy,Sport](http://localhost:8000/movies/?g=Comedy,Sport)
   - returns movies filtered by genres & sorted by "__matches" parameter

6. **Movies(dg)** (json) – [/movies/?d=100&g=Comedy,Romance,Sport](http://localhost:8000/movies/?d=100&g=Comedy,Romance,Sport)
   - returns movies filtered by duration & genres sorted by "__matches" parameter

7. **Movies(d[g])** (json) – [/movies/?d=100&g=["Comedy","Romance","Sport"]](http://localhost:8000/movies/?d=100&g=["Comedy","Romance","Sport"])
   - as above with array like query format

8. 🍋 **(+) Movie** (html) – [/make](http://localhost:8000/make)
   - new movie interface when you can test inserts (with validation) via GET & POST

## Note

I think I managed to address (to a greater or lesser extent) all the problems raised, although the solution is sketchy and simplified in many places. 

🐧 (veriKami) Weronika Kami 🐧 [https://www.linkedin.com/in/verikami](https://www.linkedin.com/in/verikami)
