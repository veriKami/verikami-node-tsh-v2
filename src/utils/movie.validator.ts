//: ----------------------------------------------------------------------------
/** utils/movie.validator.ts */
/** ------------------------------------------------------------------------- */
import Joi from "joi";

/** NewMovie interface */
import { NewMovie } from "../@types";

/** VALIDATOR: genres, title, year, runtime, director, actors, plot, posterUrl */
//: ----------------------------------------------------------------------------
const validateMovie = (m: NewMovie, genres: string[]): any => {

    let out: any;

    //: patch -> remove empty "" genre & genres
    //: ----------------------------------------------------
    if (m.genres) m.genres = m.genres.filter((s) => s !== "");
    if (m.genres && m.genres.length === 0) delete m.genres;

    //: schema
    //: ----------------------------------------------------
    const schema = Joi.object({
        genres: Joi.array()
            .items(Joi.string()
            .valid(...genres))
            .required()
            .messages({
            "_*": "Must pass valid code",
            "array.base": "Must be an array",
            "any.required": "Empty Genre",
            "any.only": "Unknown Genres",
        }),
        title: Joi.string()
            .max(255)
            .required()
            .messages({
            "any.required": "Undefined Title",
            "string.empty": "Undefined Title",
            "string.base": "Title should be a string",
            "string.max": "Title too long",
        }),
        year: Joi.number()
            .integer()
            .min(1900)
            .max(2024)
            .required()
            .messages({
            "any.required": "Undefined Year",
            "number.base": "Year should be a number",
            "number.min": "> 1900",
            "number.max": "< 2024",
        }),
        runtime: Joi.number()
            .integer()
            .min(0)
            .max(333)
            .required()
            .messages({
            "any.required": "Undefined Runtime",
            "number.base": "Runtime should be a number",
            "number.min": "> 0",
            "number.max": "< 333",
        }),
        director: Joi.string()
            .max(255)
            .required()
            .messages({
            "any.required": "Undefined Director",
            "string.empty": "Undefined Director",
            "string.base": "Director should be a string",
            "string.max": "Director too long",
        }),
        actors: Joi.string()
            .messages({
            "string.base": "Actors should be a string"
        }),
        plot: Joi.string()
            .messages({
            "string.base": "Plot should be a string"
        }),
        posterUrl: Joi.string()
            .messages({
            "string.base": "posterUrl should be a string"
        }),
    });

    //: validate schema
    //: ----------------------------------------------------
    const val = schema.validate(m);
    out = (val.error) ? val.error.message : "";

    return out;
};

//: ----------------------------------------------------------------------------
export { validateMovie };
