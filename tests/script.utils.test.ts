//: ----------------------------------------------------------------------------
//: veriKami // script.utils.test.js
//: ----------------------------------------------------------------------------
import { jsonParse, intersection } from "../src/utils/script.utils";

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

        expect(p1).toEqual({ "1": "1", "2": "a" });
        expect(p2).toEqual({ "1": 1, "2": "a" });
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
    let b: any = ["Comedy", "++", "Crime"];

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
        b = { a: "a" };
        expect(() => intersection(a, b)).toThrow();
    });
});

//: ----------------------------------------------------------------------------
//: EOT
