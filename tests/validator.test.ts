//: ----------------------------------------------------------------------------
//: veriKami // validator.test.js
//: ----------------------------------------------------------------------------
import { validator, validateMovie } from "../app/validator";

const t1 = "";
const t2 = 69;
const t3 = "The Cotton Club was a famous night club in Harlem";
const t4 = "ZWi0h6LMDmZdYxFOcNFTjt4aEp2Tff3tyn06TQDrUDye4zx3hILGtmGC4TwLe2nm" +
           "g11Rzv0bxJRNLQs3AqS5uRSwOcZNaWtT9pktjuxoDz9Kl9XkE8GwiIFOJProiJWG" +
           "qH7sADlL78IlQ70NgvGSO8gxhogTD53W10EQbOu2QBfLmyfSuguDvU1kKlLTSbC2" +
           "YYOJWgNSbQLRZPjuTI5Ex0r8uslNtT6HJPeqdbRg3huyTxeXGGhvg5R4NEAYCEcA";

//: ----------------------------------------------------------------------------
//: TEST: validator

//: ----------------------------------------------------------------------------
//: TEST: validator.genres

    describe("METHOD: validator.genres", () => {

        const g = ["Comedy","Fantasy","Crime","Drama","Music","Adventure","History",
            "Thriller","Animation","Family","Mystery","Biography","Action","Film-Noir",
            "Romance","Sci-Fi","War","Western","Horror","Musical","Sport"];

        const m1 = { genres: [] };
        const m2 = { genres: [""] };
        const m3 = { genres: ["Comedy", "Crime"] };
        const m4 = { genres: ["Comedy", "++", "Crime"] };

        test("Test undefined", () => {
            const x = validator.genres?.({}, g);
            expect(x).toBe("Undefined Genres");
        });
        test("Test empty", () => {
            const x = validator.genres?.(m1, g);
            expect(x).toBe("");
        });
        test("Test empty", () => {
            const x = validator.genres?.(m2, g);
            expect(x).toBe("Empty Genre");
        });

        test("Test known", () => {
            const x = validator.genres?.(m3, g);
            expect(x).toBe("");
        });

        test("Test unknown", () => {
            const x = validator.genres?.(m4, g);
            expect(x).toBe("Unknown Genres");
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: validator.title

    describe("METHOD: validator.title", () => {

        test("Test undefined", () => {
            const x = validator.title?.({});
            expect(x).toBe("Undefined Title");
        });

        test("Test empty", () => {
            const x = validator.title?.({ title: t1 });
            expect(x).toBe("Undefined Title");
        });

        test("Test number", () => {
            const x = validator.title?.({ title: t2 });
            expect(x).toBe("Title should be a string");
        });

        test("Test string", () => {
            const x = validator.title?.({ title: t3 });
            expect(x).toBe("");
        });

        test("Test too long", () => {
            const x = validator.title?.({ title: t4 });
            expect(x).toBe("Title too long");
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: validator.year

    describe("METHOD: validator.year", () => {

        test("Test undefined", () => {
            const x = validator.year?.({});
            expect(x).toBe("Undefined Year");
        });

        test("Test empty", () => {
            const x = validator.year?.({ year: t1 });
            expect(x).toBe("Undefined Year");
        });

        test("Test number", () => {
            const x = validator.year?.({ year: t2 });
            expect(x).toBe("");
        });

        test("Test string", () => {
            const x = validator.year?.({ year: t3 });
            expect(x).toBe("Year should be a number");
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: validator.runtime

    describe("METHOD: validator.runtime", () => {

        test("Test undefined", () => {
            const x = validator.runtime?.({});
            expect(x).toBe("Undefined Runtime");
        });

        test("Test empty", () => {
            const x = validator.runtime?.({ runtime: t1 });
            expect(x).toBe("Undefined Runtime");
        });

        test("Test number", () => {
            const x = validator.runtime?.({ runtime: t2 });
            expect(x).toBe("");
        });

        test("Test string", () => {
            const x = validator.runtime?.({ runtime: t3 });
            expect(x).toBe("Runtime should be a number");
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: validator.director

    describe("METHOD: validator.director", () => {

        test("Test undefined", () => {
            const x = validator.director?.({});
            expect(x).toBe("Undefined Director");
        });

        test("Test empty", () => {
            const x = validator.director?.({ director: t1 });
            expect(x).toBe("Undefined Director");
        });

        test("Test number", () => {
            const x = validator.director?.({ director: t2 });
            expect(x).toBe("Director should be a string");
        });

        test("Test string", () => {
            const x = validator.director?.({ director: t3 });
            expect(x).toBe("");
        });

        test("Test too long", () => {
            const x = validator.director?.({ director: t4 });
            expect(x).toBe("Director too long");
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: validator.actors

    describe("METHOD: validator.actors", () => {

        test("Test empty", () => {
            const x = validator.actors?.({ actors: t1 });
            expect(x).toBe("");
        });

        test("Test number", () => {
            const x = validator.actors?.({ actors: t2 });
            expect(x).toBe("Actors should be a string");
        });

        test("Test string", () => {
            const x = validator.actors?.({ actors: t3 });
            expect(x).toBe("");
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: validator.plot

    describe("METHOD: validator.plot", () => {

        test("Test empty", () => {
            const x = validator.plot?.({ plot: t1 });
            expect(x).toBe("");
        });

        test("Test number", () => {
            const x = validator.plot?.({ plot: t2 });
            expect(x).toBe("Plot should be a string");
        });

        test("Test string", () => {
            const x = validator.plot?.({ plot: t3 });
            expect(x).toBe("");
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: validator.posterUrl

    describe("METHOD: validator.posterUrl", () => {

        test("Test empty", () => {
            const x = validator.posterUrl?.({ posterUrl: t1 });
            expect(x).toBe("");
        });

        test("Test number", () => {
            const x = validator.posterUrl?.({ posterUrl: t2 });
            expect(x).toBe("posterUrl should be a string");
        });

        test("Test string", () => {
            const x = validator.posterUrl?.({ posterUrl: t3 });
            expect(x).toBe("");
        });
    });

//: ----------------------------------------------------------------------------
//: TEST: validateMovie

//: ----------------------------------------------------------------------------
//: EOT
