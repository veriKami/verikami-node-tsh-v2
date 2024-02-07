//: ----------------------------------------------------------------------------
/** utils/script.utils.ts */
/** ------------------------------------------------------------------------- */

/** json parse (with numbers) */
//: ----------------------------------------------------------------------------
const jsonParse = (str: any) => {
    return JSON.parse(str, (k, v) => {
        return (typeof v === "object" || isNaN(v) || v === "")
            ? v : parseInt(v, 10);
    });
};

/** arrays intersection */
//: ----------------------------------------------------------------------------
const intersection = (a: string[], b: string[]): string[] => {
    const set = new Set(b);
    return a.filter((el: any) => set.has(el));
}

/** (req.path) convert path to array (remove empty elements) */
//: ----------------------------------------------------------------------------
const getPath = (a:string): string[] => {
    return a.split("/").filter((s) => s !== "");
}

/** check (json) path */
//: ----------------------------------------------------------------------------
const checkPath = (a:string): true|false => {
    const path = getPath(a).at(-1);
    return (path === "json") ? true : false;
}

/** check (json) path */
//: ----------------------------------------------------------------------------
const checkMode = (duration:any, genres:any): 1|2|3|4|undefined => {
    let mode: 1|2|3|4|undefined;
    if (!duration && !genres) mode = 1;
    if (duration && !genres) mode = 2;
    if (!duration && genres) mode = 3;
    if (duration && genres) mode = 4;
    return mode;
}

/** check query */
//: ----------------------------------------------------------------------------
const checkQuery = (query:any): any => {

    let duration = query.d; //: ?d=100
    let genres = query.g; ////: ?g=Comedy,Fantasy,Romance
    let complete = query.q; //: ?q={"runtime":"100","genres":["Comedy"]}

    //: simple query -> create genres array
    //: ----------------------------------------------------
    try {
        genres = (genres as string).split(",");
    } catch {};

    //: json query -> map runtime & create genres array
    //: ----------------------------------------------------
    try {
        duration = JSON.parse(complete).runtime;
        genres = JSON.parse(complete).genres;
        if (genres.length === 0) genres = undefined;
    } catch {};

    return { duration, genres };
}

/** get next id from movies */
//: ----------------------------------------------------------------------------
const getId = (m:any) => {
    return Math.max(...(m.map((i:any) => i.id))) + 1;
}

//: ----------------------------------------------------------------------------
export { jsonParse, intersection, getPath, checkPath,
    checkQuery, checkMode, getId }
