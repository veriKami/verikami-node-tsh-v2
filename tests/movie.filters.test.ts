//: ----------------------------------------------------------------------------
/** TEST ** movie.filters.test.js
/** ------------------------------------------------------------------------- */
import { filterByGenre, filterByDuration, uniqueMovies, randomMovie,
    checkMode, setMode } from "../src/utils/movie.filters";

import { jsonParse, intersection } from "../src/utils/script.utils";
import fs from "node:fs";

//: using unedited (orig) version to have consistent results
const data = fs.readFileSync("./data/orig.db.json", "utf8");
const json = jsonParse(data);
const genres = json.genres;
const movies = json.movies;

//: ----------------------------------------------------------------------------
//: TEST: filterByGenre

    describe("METHOD: filterByGenre", () => {

        //: movies: short version
        const m = movies.map((x: any) => ({ id: x.id, genres: x.genres }));
        const g = ["__Crime", "__Drama", "__Mystery", "Sport"];

        const f = filterByGenre(m, g);

        test("Test empty", () => {
            const a: any = [];
            const x = filterByGenre(m, a);
            expect(x).toEqual([]);
        });

        test("Test unknown", () => {
            const a = ["++"];
            const x = filterByGenre(m, a);
            expect(x).toEqual([]);
        });

        test("Test known", () => {
            const a = ["Sport"];
            const x = filterByGenre(m, a);
            expect(x[0].genres).toContain("Sport");
            expect(x.every((i) => i.genres.includes("Sport"))).toBeTruthy();
            expect(x.every((i) => i.genres.includes("Crime"))).toBeFalsy();
            expect(x).toEqual([{
                id: 41, genres: [ "Biography", "Drama", "Sport" ], __matches: 1
            }]);
        });

        test("Test __matches", () => {
            const a = genres; //: all movies
            const x = filterByGenre(m, a);
            expect(x.every((i) => <number> i.__matches > 0)).toBeTruthy();
        });

        test("Test contain", () => {
            const a = ["Mystery", "Sport"];
            const x = filterByGenre(m, a);
            expect(x.some((i) => i.genres.includes("Sport"))).toBeTruthy();
            expect(x.some((i) => i.genres.includes("Mystery"))).toBeTruthy();
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: filterByDuration

    describe("METHOD: filterByDuration", () => {

        //: movies: short version
        const m = movies.map((x: any) => ({ id: x.id, runtime: x.runtime }));
        const d = 100;

        const f = filterByDuration(m, d);

        test("Test runtime: between (+/-) 10 of duration", () => {
            expect(f.every((i) => <number> i.runtime >= d - 10)).toBeTruthy();
            expect(f.every((i) => <number> i.runtime <= d + 10)).toBeTruthy();
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: uniqueMovies

    describe("METHOD: uniqueMovies", () => {

        const m = movies.map((x: any) => x.id );
        const u = uniqueMovies(movies).map((x: any) => x.id );

        const i = intersection(m, u);

        test("Test intersection", () => {
            expect(u).toEqual(i);
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: randomMovie

    describe("METHOD: randomMovie", () => {

        const m = {
            id: 1, year: 1, runtime: 1,
            title: "", director: "",
            genres: []
        };

        const a = randomMovie([]);
        const b = randomMovie([m]);

        test("Test random movie", () => {
            expect(a).toEqual([]);
            expect(b).toEqual([m]);
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: checkMode

    describe("METHOD: checkMode", () => {

        const c1 = checkMode(0, 0);
        const c2 = checkMode(1, 0);
        const c3 = checkMode(0, 1);
        const c4 = checkMode(1, 1);

        test("Test checkMode", () => {
            expect(c1).toEqual(1);
            expect(c2).toEqual(2);
            expect(c3).toEqual(3);
            expect(c4).toEqual(4);
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: setMode

    describe("METHOD: setMode", () => {
        test("Test setMode", () => {
            const m = setMode([], 0, [""]);
            expect(typeof m).toEqual("object");
        });
    });

//: ----------------------------------------------------------------------------
//: EOT
