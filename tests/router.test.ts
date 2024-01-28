//: ----------------------------------------------------------------------------
//: veriKami // utils.test.js
//: ----------------------------------------------------------------------------
import { router } from "../app/router";

//: ----------------------------------------------------------------------------
//: TEST: router

describe("Express Router", () => {
    test("Routes exists", () => {
        const routes = [
            { path: "/", method: "get" },
            { path: "/movie", method: "get" },
            { path: "/movies", method: "get" },
            { path: "/make", method: "post" },
            { path: "/make", method: "get" }
        ]
        routes.forEach((route) => {
            const match = router.stack.find((x) => {
                return x.route.path === route.path && x.route.methods[route.method]
            });
            expect(match).toBeTruthy();
        });
    });
});

//: ----------------------------------------------------------------------------
//: EOT
