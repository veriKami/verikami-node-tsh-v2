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

/** (req.path) get last element from path */
//: ----------------------------------------------------------------------------
// const endPath = (a:string): string => {
//     return a.split("/").filter((s) => s !== "").slice(-1) || "";
// }

//: ----------------------------------------------------------------------------
//: export { jsonParse, intersection, getPath, endPath }
export { jsonParse, intersection, getPath }
