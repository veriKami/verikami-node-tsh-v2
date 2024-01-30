//: ----------------------------------------------------------------------------
//: veriKami // app.test.js
//: ----------------------------------------------------------------------------
import request from "supertest";
import app from "../app/app";

//: ----------------------------------------------------------------------------
//: ROOT

    describe("Test ROOT (get)", () => {
        test("It should response the GET method", async () => {
            const res = await request(app).get("/?g=7");
            //: main
            expect(res.type).toBe("text/html");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body).toEqual({});
            //: text
            expect(res.text.includes("<!DOCTYPE html>")).toEqual(true);
        });
    });

//: ----------------------------------------------------------------------------
//: MOVIE

    describe("Test MOVIE (get)", () => {
        test("It should return (json) random movie", async () => {
            const res = await request(app).get("/movie");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(false);
            expect(res.body.hasOwnProperty("id")).toEqual(true);
            expect(res.body.hasOwnProperty("title")).toEqual(true);
            expect(res.body.hasOwnProperty("year")).toEqual(true);
            expect(res.body.hasOwnProperty("runtime")).toEqual(true);
            expect(res.body.hasOwnProperty("genres")).toEqual(true);
            expect(res.body.hasOwnProperty("director")).toEqual(true);
            expect(res.body.hasOwnProperty("++")).toEqual(false);
        });
    });

//: ----------------------------------------------------------------------------
//: MOVIES

    describe("Test MOVIES (get)", () => {

        test("It should return (json) array of movies", async () => {
            const res = await request(app).get("/movies");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });

        test("It should return (json) array of movies", async () => {
            const res = await request(app).get("/movies?d=200");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });

        test("It should return (json) array of movies", async () => {
            const res = await request(app)
                .get("/movies?g=Sport");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });

        test("It should return (json) array of movies", async () => {
            const res = await request(app)
                .get("/movies?d=100&g=Romance,Sport");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });

        test("It should return (json) array of movies", async () => {
            const res = await request(app)
                .get(`/movies?d=&g=["Romance","Sport"]`);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });
    });

//: ----------------------------------------------------------------------------
//: MAKE

    //: default (empty query) output (html)
    //: -------------------------------------------
    describe("Test MAKE (default) ° /make", () => {
        test("It should return (html) page", async () => {
            const res = await request(app).get("/make");
            //: main
            expect(res.type).toBe("text/html");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body).toEqual({});
            //: text
            expect(res.text.includes("<!DOCTYPE html>")).toEqual(true);
        });
    });

//: ----------------------------------------------------------------------------
//: MAKE (validate)

    //: validate
    //: -------------------------------------------------
    describe("Test MAKE (validate) ° /make/?m={}", () => {

        //: Minimum (-) Runtime
        //: genres, title, year, runtime, director
        test("It should return (json) (validate) object", async () => {
            const query = `/make?m={"genres":["Comedy","Sport"],
                "title":"PoP","year":"1999","runtime":"199__"}`;
            const res = await request(app).get(query);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            /* { "validate": "Runtime should be a number"} */
            expect(res.body.validate).toBe("Runtime should be a number");
        });

        //: Minimum (-) Runtime
        //: genres, title, year, runtime, director
        test("It should return (json) (validate) object", async () => {
            const query = `/make/?m={"genres":["Comedy","Sport"],
                "title":"PoP","year":"1999","__runtime":"199"}`;
            const res = await request(app).get(query);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            /* { "validate": "Undefined Runtime"} */
            expect(res.body.validate).toBe("Undefined Runtime");
        });

        //: Minimum (-) Director
        //: genres, title, year, runtime, director
        test("It should return (json) (validate) object", async () => {
            const query = `/make/?m={"genres":["Comedy","Sport"],
                "title":"PoP","year":"1999","runtime":"199"}`;
            const res = await request(app).get(query);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            /* { "validate": "Undefined Director"} */
            expect(res.body.validate).toBe("Undefined Director");
        });
    });

//: ----------------------------------------------------------------------------
//: MAKE (insert) POST

    describe("Test MAKE (insert) POST ° /make", () => {

        /*/
        test("It should return POST (json) object", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoPoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const res = await request(app).post("/make").send(data);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body).toEqual({director: "Jerzy Hektor",
                "genres": ["Comedy", "Sport"],
                "runtime": 199,"title": "PoPoP", "year": 1999});
            expect(res.body).toEqual(data);
        });
        /*/
        //: quick hack redirect
        test("It should redirect POST to GET ", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const res = await request(app).post("/make").send(data);
            //: redirect
            expect(res.status).toBe(302);
        });
    });
//: ----------------------------------------------------------------------------
//: MAKE (insert) GET

    //: insert
    //: -----------------------------------------------
    describe("Test MAKE (insert) ° /make/?m={}", () => {

        //: Minimum
        //: genres, title, year, runtime, director
        test("It should return (json) object", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const query = JSON.stringify(data);
            const res = await request(app).get(`/make/?m=${query}`);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body.id).toBeDefined();
            expect(res.body.id).toBeGreaterThan(0);
            expect(typeof res.body.genres).toBe("object"); //: []
            expect(res.body.genres).toContain("Comedy"); //: []
            expect(res.body.genres).toContain("Sport"); //: []
            expect(res.body.title).toBe("PoP");
            expect(res.body.year).toBe(1999);
            expect(res.body.runtime).toBe(199);
            expect(res.body.director).toBe("Jerzy Hektor");
            //:
            expect(res.body.actors).toBeUndefined();
            expect(res.body.plot).toBeUndefined();
            expect(res.body.posterUrl).toBeUndefined();
        });

        //: Full
        //: genres, title, year, runtime, director, actors, plot, posterUrl
        test("It should return (json) object", async () => {
            const query = `/make/?m={"genres":["Comedy","Sport"],
                "title":"PoP","year":"1999","runtime":"199","director":"Jerzy Hektor",
                "actors":"Jan Serce", "plot":"Kot Kolot", "posterUrl":"https://verikami.com" }`;
            const res = await request(app).get(query);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body.id).toBeDefined();
            expect(res.body.id).toBeGreaterThan(0);
            expect(typeof res.body.genres).toBe("object"); //: []
            expect(res.body.genres).toContain("Comedy"); //: []
            expect(res.body.genres).toContain("Sport"); //: []
            expect(res.body.title).toBe("PoP");
            expect(res.body.year).toBe(1999);
            expect(res.body.runtime).toBe(199);
            expect(res.body.director).toBe("Jerzy Hektor");
            //:
            expect(res.body.actors).toBe("Jan Serce");
            expect(res.body.plot).toBe("Kot Kolot");
            expect(res.body.posterUrl).toBe("https://verikami.com");

        });
    });

//: ----------------------------------------------------------------------------
//: ERROR

    //: Error: TEST (next) ERROR
    //: -----------------------------------------
    describe("Test (next) ERROR (500) ° /err", () => {
        test("It should return (text/plain) 500 error", async () => {
            //: request
            const res = await request(app).get("/err");
            //: main
            expect(res.type).toBe("text/plain");
            expect(res.status).toBe(500);
            //: error
            expect(res.error).not.toBeFalsy();
            expect(res.error.toString()).toBe("Error: cannot GET /err (500)");
            //: body
            expect(res.body).toEqual({});
            //: text
            expect(res.text).toBe("TEST (next) ERROR");
        });
    });

    //: not existing page
    //: -----------------------------------------
    describe("Test ERROR (404) ° /error", () => {
        test("It should return (html) 404 error + (text) Cannot GET /error", async () => {
            const res = await request(app).get("/error");
            //: main
            expect(res.type).toBe("text/html");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(404);
            //: error
            expect(res.error).not.toBeFalsy();
            expect(res.error.toString()).toBe("Error: cannot GET /error (404)");
            //: body
            expect(res.body).toEqual({});
        });
    });

//: ----------------------------------------------------------------------------
//: EOT
