//: ----------------------------------------------------------------------------
/** utils/display.log.ts */
/** ------------------------------------------------------------------------- */
/**
 * Display (colored) console.log
 *
 * ```
 * Here are the most commonly used color codes:
 *
 *   Black: \u001b[30m
 *   Red: \u001b[31m
 *   Green: \u001b[32m
 *   Yellow: \u001b[33m
 *   Blue: \u001b[34m
 *   Magenta: \u001b[35m
 *   Cyan: \u001b[36m
 *   White: \u001b[37m
 *
 * ```
 */
//: ----------------------------------------------------------------------------

const log = (key: string, option?: any): void => {

    interface Log { [key: string]: string }

    const obj: Log = {

        health: "\u001b[36mHEALTH\u001b[0m ツ ------------------------",
         error: "\u001b[31mERROR\u001b[0m ツ -------------------------",
            mm: "\u001b[36mMOVIE\u001b[0m ----------------------------",
            m1: "\u001b[36mMOVIES\u001b[0m: " +
                "\u001b[33mdefault\u001b[0m ------------------",
            m2: "\u001b[36mMOVIES\u001b[0m: " +
                "\u001b[33monly duration\u001b[0m ------------",
            m3: "\u001b[36mMOVIES\u001b[0m: " +
                "\u001b[33monly genres\u001b[0m --------------",
            m4: "\u001b[36mMOVIES\u001b[0m: " +
                "\u001b[33mgenres + duration\u001b[0m --------",
            mg: `\u001b[36mMAKE\u001b[0m (movie) ` +
                `\u001b[32mGET\u001b[0m -----------------`,
            mp: `\u001b[36mMAKE\u001b[0m (movie) ` +
                `\u001b[35mPOST\u001b[0m ----------------`,
            md: `\u001b[33mMODE\u001b[0m :: ${option}`,
            va: `\u001b[33mVALIDATE\u001b[0m: ${option}`,
    };

    //: unknown key
    if (!(key in obj)) {
        return console.log(`\u001b[35m${key}\u001b[0m`, option);
    }

    //: process.stdout.write(obj[key] + "\n");
    console.log(obj[key]);
};

//: ----------------------------------------------------------------------------
export { log };

//: ----------------------------------------------------------------------------
//: NOTES
/*
    const map = new Map();
    map.set("mm",
        "\u001b[36mMOVIE\u001b[0m ----------------------------");
    map.set("m0",
        "\u001b[36mMOVIES\u001b[0m: " +
        "\u001b[33mdefault\u001b[0m ------------------");
    map.set("health",
        "\u001b[36mHEALTH\u001b[0m ツ ------------------------");
*/
//: ----------------------------------------------------------------------------
//: EOT
