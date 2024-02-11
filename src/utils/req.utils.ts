//: ----------------------------------------------------------------------------
/** utils/req.utils.ts */
/** ------------------------------------------------------------------------- */

/** (req.path) convert path to array (remove empty elements) */
//: ----------------------------------------------------------------------------
const getPath = (a: string): string[] => {
    return a.split("/").filter((s) => s !== "");
};

/** check (json) path */
//: ----------------------------------------------------------------------------
const checkPath = (a: string): true|false => {
    const json = getPath(a).includes("json", -1);
    const api = getPath(a).includes("api", 0);
    return json || api;
};

/** check query */
//: ----------------------------------------------------------------------------
const checkQuery = (query: any): any => {

    let duration = query.d; //: ?d=100
    let genres = query.g; ////: ?g=Comedy,Fantasy,Romance
    let complete = query.q; //: ?q={"runtime":"100","genres":["Comedy"]}

    //: simple query -> create genres array
    //: ----------------------------------------------------
    try {
        genres = (genres as string).split(",");
    } catch {}

    //: json query -> map runtime & create genres array
    //: ----------------------------------------------------
    try {
        duration = JSON.parse(complete).runtime;
        genres = JSON.parse(complete).genres;
        if (genres.length === 0) genres = undefined;
    } catch {}

    return { duration, genres };
};

//: ----------------------------------------------------------------------------
export { getPath, checkPath, checkQuery };
