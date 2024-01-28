//: ----------------------------------------------------------------------------
//: veriKami // utils.test.js
//: ----------------------------------------------------------------------------
import { Movie, jsonParse, intersection, filterByGenre, filterByDuration,
    uniqueMovies, getRandomMovie } from "../app/utils";

import fs from "node:fs";

//: using unedited (orig) version to have consistent results
const data = fs.readFileSync("./data/orig.db.json", "utf8");
const json = jsonParse(data);
const genres = json.genres;
const movies = json.movies;

//: ----------------------------------------------------------------------------
//: TEST: jsonParse

describe("METHOD: jsonParse", () => {

    const json = `{"1": "1", "2": "a"}`;

    test("comparison with default JSON.parse", () => {

        const p1 = JSON.parse(json);
        const p2 = jsonParse(json);

        expect(typeof p1).toBe("object");
        expect(typeof p2).toBe("object");

        expect(p1).toEqual({"1": "1", "2": "a"});
        expect(p2).toEqual({"1": 1, "2": "a"});
    });
});

//: ----------------------------------------------------------------------------
//: TEST: intersection

    describe("METHOD: intersection", () => {

        /*
        let a: string[] = ["Comedy","Fantasy","Crime","Drama","Music","Adventure","History",
            "Thriller","Animation","Family","Mystery","Biography","Action","Film-Noir",
            "Romance","Sci-Fi","War","Western","Horror","Musical","Sport"];
        */
        let a: string[] = genres;
        let b: any = ["Comedy","++","Crime"];

        //: default result
        test("Test compare", () => {
            const x = intersection(a, b);
            expect(x).toEqual(["Comedy", "Crime"]);
        });

        //: comparaison order
        test("Test compare", () => {
            const x = intersection(a, b);
            const y = intersection(b, a);
            expect(x).toEqual(y);
        });

        //: result (reversed input)
        test("Test compare", () => {
            b = b.reverse();
            const x = intersection(a, b);
            expect(x).toEqual(["Comedy", "Crime"]);
        });

        //: error
        test("Test error", () => {
            b = { a: "a"};
            expect(() => intersection(a, b)).toThrow();
        });
    });

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
//: ----------------------------------------------------------------------------
//: TEST: getRandomMovie

    describe("METHOD: getRandomMovie", () => {

        const m = {
            id: 1, year: 1, runtime: 1,
            title: "", director: "",
            genres: []
        };

        const a = getRandomMovie([]);
        const b = getRandomMovie([m]);

        test("Test random movie", () => {
            expect(a).toEqual([]);
            expect(b).toEqual([m]);
        });
    });

//: ----------------------------------------------------------------------------
//: EOT
