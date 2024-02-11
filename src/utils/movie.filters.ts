//: ----------------------------------------------------------------------------
/** utils/movie.filters.ts */
/** ------------------------------------------------------------------------- */
import { jsonParse, intersection } from "../utils/script.utils";
import { log } from "../utils/display.log";

 /** Movie interface (db) */
import { Movie } from "../@types";

/** filter duplicates */
//: ----------------------------------------------------------------------------
const uniqueMovies = (movies: Movie[]) => {

    //: reversed map
    const map = new Map(
        movies.map((obj) => {
            let { id, __matches, ...y } = obj;
            return [JSON.stringify(y), id];
        })
    );

    //: remap
    const remap = [...map].map(([key, val]) => {
        let ids = { id: val };
        let obj = jsonParse(key);
        return { ...ids, ...obj };
    });

    return remap;
};

/** get random movie from Movies array */
//: ----------------------------------------------------------------------------
const randomMovie = (movies: Movie[]) => {
    const r = Math.floor(Math.random() * movies.length);
    return movies[r] ? [movies[r]] : [];
};

/** filter movies by genres */
//: ----------------------------------------------------------------------------
const filterByGenre = (movies: Movie[], genres: string[]) => {

    let data = movies.filter((el: any) => {
        const eg = el.genres;
        const fg = intersection(genres, eg);
        //: matches (score) for sorting
        el.__matches = fg.length;
        return fg.length > 0;
    });

    //: sort by matches (higher first)
    data = data.sort((a: any, b: any) => b.__matches - a.__matches);
    return data;
};

/** filter by duration (min/max) */
//: ----------------------------------------------------------------------------
const filterByDuration = (movies: Movie[], duration: string|number) => {
    let data = movies;
    data = data.filter((i: any) => i.runtime >= +duration - 10);
    data = data.filter((i: any) => i.runtime <= +duration + 10);
    return data;
};

/** check (duration + genres) display mode */
//: ----------------------------------------------------------------------------
const checkMode = (d: any, g: any): 0|1|2|3|4 => {
    let mode: 0|1|2|3|4 = 0;
    if (!d && !g) mode = 1;
    if (d && !g) mode = 2;
    if (!d && g) mode = 3;
    if (d && g) mode = 4;
    return mode;
};

/** display mode apply */
//: ----------------------------------------------------------------------------
const setMode = (out: Movie[], duration: number, genres: string[]): Movie[] => {

    interface Modes { [key: number]: () => void }

    //: ----------------------------------------------------
    //: case (1) empty default -> random movie
    //: case (2) only duration -> random movie
    //: case (3) only genres
    //: case (4) genres + duration
    //: ----------------------------------------------------

    //: modus operandi -> 0|1|2|3|4
    const mode = checkMode(duration, genres);
    log("mode", mode);

    const modes: Modes = {
        1: () => {
            out = randomMovie(out);
            log("m1");
        },
        2: () => {
            out = filterByDuration(out, duration);
            out = randomMovie(out);
            log("m2");
        },
        3: () => {
            out = filterByGenre(out, genres);
            log("m3");
        },
        4: () => {
            out = filterByGenre(out, genres);
            out = filterByDuration(out, duration);
            log("m4");
        }
    };

    modes[mode]();

    return out;
};

//: ----------------------------------------------------------------------------
export { uniqueMovies, randomMovie, filterByGenre, filterByDuration,
    checkMode, setMode };
