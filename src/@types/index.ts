//: ----------------------------------------------------------------------------
/** interface __Request */
/** ------------------------------------------------------------------------- */
import { Request } from "express";
export interface __Request extends Request {
    /**
     * Custom output node for middlewares.
     * Used to render (html) versions of pages.
     */
    out?: any;
}

/** interface Movie *//** @ utils/movie.filters.ts */
/** ------------------------------------------------------------------------- */
export interface Movie {
    id:         number;
    title:      string;
    year:       string | number;
    runtime:    string | number;
    genres:     string[];
    director:   string;
    actors?:    string; //: optional
    plot?:      string; //: optional
    posterUrl?: string; //: optional
    __matches?: number; //: optional (sorting)
}

/** interface NewMovie *//** @ utils/movie.validator.ts */
/** ------------------------------------------------------------------------- */
export interface NewMovie {
    title:      string;
    year:       number;
    runtime:    number;
    genres:     string[] | undefined;
    director:   string;
    actors?:    string; //: optional
    plot?:      string; //: optional
    posterUrl?: string; //: optional
}

//: ----------------------------------------------------------------------------
//: EOT
