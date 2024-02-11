//: ----------------------------------------------------------------------------
/** app/router.ts */
/** ------------------------------------------------------------------------- */
import express from "express";

import { getMovie } from "../controllers/get.movie";
import { postMovie } from "../controllers/post.movie";
import { getMovies } from "../controllers/get.movies";

import { makeSearch as html } from "../renders/make.search";
import { makeMovie } from "../renders/make.movie";
import { log } from "../utils/display.log";

const router = express.Router();

/** ROUTES */
//: ----------------------------------------------------------------------------

//: html output (middleware)
//: --------------------------------------------------------
router.get("/", getMovie, html);
router.get("/movie", getMovie, html);
router.post("/movie", postMovie, html);
router.get("/movies", getMovies, html);
router.get("/make", makeMovie, html);

//: json output (+/json)
//: --------------------------------------------------------
router.get("/movie/json", getMovie);
router.post("/movie/json", postMovie);
router.get("/movies/json", getMovies);

//: json output (/api/+)
//: --------------------------------------------------------
router.get("/api/movie", getMovie);
router.post("/api/movie", postMovie);
router.get("/api/movies", getMovies);

/** HEALTH */
//: --------------------------------------------------------
router.get("/health", (req, res) => {
    log("health");
    res.status(200).type("text").send("ツ");
});

/** TEST (next) ERROR */
//: --------------------------------------------------------
router.get("/err", (req, res, next) => {
    log("error");
    try {
        throw Error("TEST (next) ERROR");
    } catch (err) {
        next(err);
    }
});

//: ----------------------------------------------------------------------------
export default router;
