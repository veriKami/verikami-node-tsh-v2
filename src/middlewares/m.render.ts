//: ----------------------------------------------------------------------------
/** middlewares/m.render.ts */
/** ------------------------------------------------------------------------- */
import { Request, Response, NextFunction } from "express";
import { __Request } from "../@types";

/** __Request (render) */
//: --------------------------------------------------------
const html = (
    req: __Request, res: Response, next: NextFunction) => {
    console.log("RENDER (html)");
    let out = req.out;
    res.render("www", {
        title: "Movies",
        out: JSON.stringify(out, null, 2),
    });
};

//: ----------------------------------------------------------------------------
export { html };
