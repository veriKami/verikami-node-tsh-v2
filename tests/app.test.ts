//: ----------------------------------------------------------------------------
/** TEST ** app.test.js
/** ------------------------------------------------------------------------- */
import request from "supertest";
import app from "../src/app/app";

//: DISABLE CONSOLE
console.log = () => {};
console.error = () => {};

//: ----------------------------------------------------------------------------
//: ROOT

    describe("Test ROOT (get)", () => {
        test("It should response the GET method", async () => {
            const res = await request(app).get("/");
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
            const res = await request(app).get("/movie/json");
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
            const res = await request(app).get("/movies/json");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });
        test("It should return (json) array of movies", async () => {
            const res = await request(app).get("/movies/json/?d=200");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });
        test("It should return (json) array of movies", async () => {
            const res = await request(app)
                .get("/movies/json/?g=Sport");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });
        test("It should return (json) array of movies", async () => {
            const res = await request(app)
                .get("/movies/json/?d=100&g=Romance,Sport");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });
        test("It should return (json) array of movies", async () => {
            const res = await request(app)
                .get(`/movies/json/?d=&g=["Romance","Sport"]`);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(Array.isArray(res.body)).toEqual(true);
        });
    });

//: ----------------------------------------------------------------------------
//: MAKE (html)

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
//: MAKE (validate) POST

    //: validate GENRES
    //: -------------------------------------------------
    describe("Test MAKE (validate) POST ° /make/", () => {
        test("It should POST", async () => {
            const data = {
                genres: ["Comedy","Sport"],
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body.validate).toBe(undefined);
        });
        test("It should POST", async () => {
            let data = {
                genres: ["Comedy","Sport"], //:
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const query = "/movie";
            //: PATCH GENRES
            data.genres = [""];
            const res = await request(app).post(query).send(data);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body.validate).toBe("Empty Genre");
        });
        test("It should POST", async () => {
            let data = {
                genres: ["Comedy","Sport"], //:
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const query = "/movie";
            //: PATCH GENRES
            data.genres = [];
            const res = await request(app).post(query).send(data);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body.validate).toBe("Empty Genre");
        });
        test("It should POST", async () => {
            let data = {
                genres: undefined,
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body.validate).toBe("Empty Genre");
        });
    });

//: ----------------------------------------------------------------------------
//: MAKE (insert) POST

    describe("Test MAKE (insert) POST ° /movie", () => {
        test("It should POST", async () => {
            const data = {
                genres: ["Comedy","Sport"],
                title: "PoP", year: 1999,
                runtime: "199__"
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            expect(res.body.validate).toBe("Runtime should be a number");
        });
        //: test("It should redirect POST to GET ", async () => {
        test("It should POST", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
            //: redirect
            //: expect(res.status).toBe(302);
            expect(res.status).toBe(200);
        });
    });

//: ----------------------------------------------------------------------------
//: MAKE (insert) POST

    //: insert
    //: -----------------------------------------------
    describe("Test MAKE (insert) POST ° /movie", () => {
        //: Minimum
        test("It should return (json) object", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor"
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
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
            expect(res.body).toHaveProperty("id");
            expect(res.body).toHaveProperty("genres");
            expect(res.body).toHaveProperty("title");
            expect(res.body).toHaveProperty("year");
            expect(res.body).toHaveProperty("runtime");
            expect(res.body).toHaveProperty("director");
            expect(res.body).not.toHaveProperty("actors");
            expect(res.body).not.toHaveProperty("plot");
            expect(res.body).not.toHaveProperty("posterUrl");
            //:
            expect(res.body.actors).toBeUndefined();
            expect(res.body.plot).toBeUndefined();
            expect(res.body.posterUrl).toBeUndefined();
        });
        //: Full
        test("It should return (json) object", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: "Jerzy Hektor",
                actors:"Jan Serce",
                plot: "Kot Kolot",
                posterUrl: "https://verikami.com"
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
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

    //: validate
    //: -------------------------------------------------
    describe("Test MAKE (validate) ° /make/", () => {
        //: Minimum (-) Runtime
        test("It should return (json) (validate) object", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoP",
                year: 1999,
                runtime: "199__",
                director: "Jerzy Hektor"
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            /* { "validate": "Runtime should be a number"} */
            expect(res.body.validate).toBe("Runtime should be a number");
        });
        //: Minimum (-) Runtime
        test("It should return (json) (validate) object", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoP",
                year: 1999,
                runtime: undefined,
                director: "Jerzy Hektor"
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: body
            /* { "validate": "Undefined Runtime"} */
            expect(res.body.validate).toBe("Undefined Runtime");
        });
        //: Minimum (-) Director
        test("It should return (json) (validate) object", async () => {
            const data = {
                genres: ["Comedy", "Sport"],
                title: "PoP",
                year: 1999,
                runtime: 199,
                director: undefined
            };
            const query = "/movie";
            const res = await request(app).post(query).send(data);
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
//: JSON (query)

    describe("Test JSON query (get) movies", () => {
        test("It should response (html) GET method", async () => {
            const res = await request(app).get(`/movies/?q={"runtime":"","genres":[]}`);
            //: main
            expect(res.type).toBe("text/html");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
        });
    });

//: ----------------------------------------------------------------------------
//: JSON

    describe("Test JSON (get)", () => {
        test("It should response (json) GET method", async () => {
            const res = await request(app).get("/movie/json");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: text
            expect(res.text.includes("id")).toEqual(true);
        });
        test("It should response (json) GET method", async () => {
            const res = await request(app).get("/movies/json");
            //: main
            expect(res.type).toBe("application/json");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: text
            expect(res.text.includes("id")).toEqual(true);
        });
    });

//: ----------------------------------------------------------------------------
//: HEALTH

    describe("Test HEALTH (get)", () => {
        test("It should response (text/plain) GET method", async () => {
            const res = await request(app).get("/health");
            //: main
            expect(res.type).toBe("text/plain");
            expect(res.charset).toBe("utf-8");
            expect(res.status).toBe(200);
            //: text
            expect(res.text).toBe("ツ");
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

    //: Not Existing Page
    //: -----------------------------------------
    describe("Test ERROR (404) ° /error", () => {
        test("It should return (html) 404 error + (text) Cannot GET /error", async () => {
            const res = await request(app).get("/error");
            //: main
            //: expect(res.type).toBe("text/plain");
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
