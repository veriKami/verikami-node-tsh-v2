//: ----------------------------------------------------------------------------
//: veriKami // validator.ts
//: ----------------------------------------------------------------------------

interface NewMovie {
    title:      string;
    year:       number;
    runtime:    number;
    genres:     string[];
    director:   string;
    actors?:    string; //: optional
    plot?:      string; //: optional
    posterUrl?: string; //: optional
}

interface Validator {
    genres?:    (m: any, genres: string[] ) => string;
    title?:     (m: any) => string;
    year?:      (m: any) => string;
    runtime?:   (m: any) => string;
    director?:  (m: any) => string;
    actors?:    (m: any) => string;
    plot?:      (m: any) => string;
    posterUrl?: (m: any) => string;
}

//: VALIDATOR: genres, title, year, runtime, director, actors, plot, posterUrl
//: ----------------------------------------------------------------------------

const validator: Validator = {

    genres: (m: NewMovie, genres: string[] ): string => {
        const item: any = m.genres;
        const type = typeof item;
        if (type === "undefined" ) return "Undefined Genres";
        //: filter only predefined values
        const set = new Set(genres);
        const use = item.filter((el: any) => set.has(el));
        //: compare arrays
        if (item.length > 0 && item.toString() === "") return "Empty Genre";
        if (item.toString() !== use.toString()) return "Unknown Genres";
        return "";
    },

    title: (m: NewMovie): string => {
        const item: any = m.title;
        const type = typeof item;
        if (item === "" ) return "Undefined Title";
        if (type === "undefined" ) return "Undefined Title";
        if (type !== "string") return "Title should be a string";
        if (item.length > 255) return "Title too long";
        return "";
    },

    year: (m: NewMovie): string => {
        const item: any = m.year;
        const type = typeof item;
        if (item === "" ) return "Undefined Year";
        if (type === "undefined" ) return "Undefined Year";
        if (type !== "number") return "Year should be a number";
        return "";
    },

    runtime: (m: NewMovie): string => {
        const item: any = m.runtime;
        const type = typeof item;
        if (item === "" ) return "Undefined Runtime";
        if (type === "undefined" ) return "Undefined Runtime";
        if (type !== "number") return "Runtime should be a number";
        return "";
    },

    director: (m: NewMovie): string => {
        const item: any = m.director;
        const type = typeof item;
        if (item === "" ) return "Undefined Director";
        if (type === "undefined" ) return "Undefined Director";
        if (type !== "string") return "Director should be a string";
        if (item.length > 255) return "Director too long";
        return "";
    },

    actors: (m: NewMovie): string => {
        const item: any = m.actors;
        const type = typeof item;
        if (item === "" ) return "";
        if (type === "undefined" ) return "";
        if (type !== "string") return "Actors should be a string";
        return "";
    },

    plot: (m: NewMovie): string => {
        const item: any = m.plot;
        const type = typeof item;
        if (item === "" ) return "";
        if (type === "undefined" ) return "";
        if (type !== "string") return "Plot should be a string";
        return "";
    },

    posterUrl: (m: NewMovie): string => {
        const item: any = m.posterUrl;
        const type = typeof item;
        if (item === "" ) return "";
        if (type === "undefined" ) return "";
        if (type !== "string") return "posterUrl should be a string";
        return "";
    }
};

//: VALIDATE INPUT
//: ----------------------------------------------------------------------------

const validateMovie = (m: NewMovie, genres: string[]): string => {
    let msg: any = "";
    msg = validator.genres?.(m, genres);
    msg = (msg.length > 0) ? msg : validator.title?.(m);
    msg = (msg.length > 0) ? msg : validator.year?.(m);
    msg = (msg.length > 0) ? msg : validator.runtime?.(m);
    msg = (msg.length > 0) ? msg : validator.director?.(m);
    msg = (msg.length > 0) ? msg : validator.actors?.(m);
    msg = (msg.length > 0) ? msg : validator.plot?.(m);
    msg = (msg.length > 0) ? msg : validator.posterUrl?.(m);
    return msg;
}

//: ----------------------------------------------------------------------------
export { validator, validateMovie };
