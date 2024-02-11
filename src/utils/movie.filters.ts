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

//: ----------------------------------------------------------------------------
//: NOTES


        //: ------------------------------------------------
        /*/
        const modes = {
            out: [],
            mod: 0,
            duration: 0,
            genres: [],
            0: () => {
                log("m0");
            },
            1: () => {
                this.out = randomMovie(out);
                log("m1");
            },
            2: () => {
                this.out = filterByDuration(out, duration);
                this.out = randomMovie(this.out);
                log("m2");
            },
            3: () => {
                this.out = filterByGenre(out, genres);
                log("m3");
            },
            4: () => {
                this.out = filterByGenre(out, genres);
                this.out = filterByDuration(out, duration);
                log("m4");
            },
            //get: (mode) => {
            //    //modes[mode]()
            //    modes[mode]()
            //}
            //property: function (parameters) {},
            //get property() {},
            display(out:any, m:any) {
                //return this[m]()
                return this[m]()
            }
        };
        //: ------------------------------------------------
        //modes.display(out, mode);
        out = modes.display(out, mode, duration, genres);
        //*/

        /*/
        //: case (1) empty default -> random movie
        //: ------------------------------------------------
        if (1 == mode) {
            //: out = out.sort((x: any) => - x.id);
            out = randomMovie(out);
            log("m1");
        }

        //: case (2) only duration -> random movie
        //: ------------------------------------------------
        if (2 == mode) {
            out = filterByDuration(out, duration);
            out = randomMovie(out);
            log("m2");
        }

        //: case (3) only genres
        //: ------------------------------------------------
        if (3 == mode) {
            out = filterByGenre(out, genres);
            log("m3");
        }

        //: case (4) genres + duration
        //: ------------------------------------------------
        if (4 == mode) {
            out = filterByGenre(out, genres);
            out = filterByDuration(out, duration);
            log("m4");
        }
        //*/



//: ----------------------------------------------------------------------------
// const uniqueMovies___ = (movies: Movie[]) => {
//     /*
//     let _my = movies.map((obj:any) => {
//         let { genres, __matches, ...y } = obj;
//         return y;
//     });
//     console.log(_my);

//     //let _myy = [..._my ].map(([key, val]) => ({ key, val }));
//     //let _myy = new Map(Object.entries(_my));
//     //console.log(_myy);

//     //: deep copy - works !!!
//     let _m = JSON.parse(JSON.stringify(movies));
//     let _mf = Object.assign({}, movies);

//     console.log(_m === movies);
//     console.log(_mf === movies);

//     //let _mm = new Map(Object.entries(movies));
//     let _mm = new Map(_m.map((obj:any) => {
//         //let { id, __matches, ...y } = obj;
//         let { id, genres, __matches, ...y } = obj;
//         //return [ JSON.stringify(y), id ];
//         return [ y, id ];
//     }));
//     console.log(_mm);

//     console.log(_m.length);
//     console.log(_mm.size);
//     console.log(movies.length);
//     */

//     // const fil = movies.filter((obj) => {
//     //     let { id, __matches, ...y } = obj;
//     //     return y;
//     // });
//     // console.log(fil);
//     // console.log(fil.length);

//     /*/
//     //let _movies = Object.assign({}, movies);
//     //let _movies = [...movies];

//     let aug = [...movies].map((obj:any) => {
//         let { id, __matches, ...y } = obj;
//         obj.__str = JSON.stringify(y);
//         return obj;
//     });

//     let arrayUniqueByKey = [
//         ...new Map(aug.map((obj) => [obj.__str, obj])).values()
//     ];
//     //: fails sometimes... see console.log
//     //.map((obj) => {
//     //    delete obj.__str;
//     //    return obj;
//     //});

//     //arrayUniqueByKey.forEach((i) => Reflect.deleteProperty(i, "__str"));
//     arrayUniqueByKey.forEach((i) => delete i.__str);

//     console.log(arrayUniqueByKey);
//     console.log(arrayUniqueByKey.length);
//     console.log(movies.length);

//     return arrayUniqueByKey;
//     //*/
// }

//: ----------------------------------------------------------------------------
/*/
const ___uniqueMovies = (movies: Movie[]) => {

    //: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //: TODO: avoid duplicates
    //: TODO: final with id
    //: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //const all = movies.map((x: any) => {
    //    const { id, ...y } = x; //: remove id
    //    return JSON.stringify(y);
    //});
    //let uniq = [...new Set(all)];
    //uniq = uniq.map((x: any) => jsonParse(x));
    //console.log(all);
    //console.log(uniq);
    //: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    let a: any = {}; //: movies
    let m: any = {}; //: matches

    movies.forEach((x: any) => {
        //: remove id & __matches
        const { id, __matches, ...y } = x;
        a[x.id] = JSON.stringify(y);
        m[x.id] = __matches;
    });

    //: Flip
    const flip = (x: any) => Object.fromEntries(
        Object.entries(x).map(([k, v]) => [v, k]));

    //: Flip Flap ,-))
    a = flip(flip(a));
    a = Object.entries(a).map(([k, v]) => {
        const p = jsonParse(v);
        return { id: +k, ...p, __matches: m[k] };
    });

    return a;
}
//*/
//: ----------------------------------------------------------------------------
//: EOF
