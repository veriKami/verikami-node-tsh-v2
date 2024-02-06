//: ----------------------------------------------------------------------------
/** TEST ** utils/display.log.ts */
/** ------------------------------------------------------------------------- */
import { log } from "../src/utils/display.log";

//: ----------------------------------------------------------------------------
//: TEST: display.log

describe("Express (util) log()", () => {
    test("should display console.info", () => {
        const l = log("nn");
        expect(l).not.toBe(true);
        expect(typeof log).toBe("function");
    });
});

//: ----------------------------------------------------------------------------
//: EOT
