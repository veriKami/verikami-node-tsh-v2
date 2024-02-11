//: ----------------------------------------------------------------------------
/** utils/script.utils.ts */
/** ------------------------------------------------------------------------- */

/** json parse (with numbers) */
//: ----------------------------------------------------------------------------
const jsonParse = (str: any) => {
    return JSON.parse(str, (k, v) => {
        return typeof v === "object" || isNaN(v) || v === ""
            ? v : parseInt(v, 10);
    });
};

/** arrays intersection */
//: ----------------------------------------------------------------------------
const intersection = (a: string[], b: string[]): string[] => {
    const set = new Set(b);
    return a.filter((x: any) => set.has(x));
};

/** get next id from movies */
//: ----------------------------------------------------------------------------
const getId = (m: any): number => {
    return Math.max(...m.map((x: any) => x.id)) + 1;
};

//: ----------------------------------------------------------------------------
export { jsonParse, intersection, getId };
