//: ----------------------------------------------------------------------------
/** renders/make.search.ts */
/** ------------------------------------------------------------------------- */
import { RequestHandler } from "express";
import { __Request } from "../@types";
import { log } from "../utils/display.log";

/** __Request (render) */
//: ----------------------------------------------------------------------------
const makeSearch: RequestHandler = (req: __Request, res, next) => {
    log("html");
    //: const out = req.out; //: via (custom) req.out
    const out = res.locals.out; //: via res.locals
    res.render("www", {
        title: "Movies",
        out: JSON.stringify(out, null, 2)
    });
};

//: ----------------------------------------------------------------------------
export { makeSearch };
