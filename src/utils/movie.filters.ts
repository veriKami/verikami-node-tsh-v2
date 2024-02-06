//: ----------------------------------------------------------------------------
/** utils/movie.filters.ts */
/** ------------------------------------------------------------------------- */
import { jsonParse, intersection } from "../utils/script.utils";
import { Movie } from "../@types"; /** Movie interface (db) */

/** filter by genres */
//: ----------------------------------------------------------------------------
const filterByGenre = (movies: Movie[], options: any ) => {

    const genres: string[] = options.genres;

    //: filter movies by genres
    let data = movies.filter((el: any) => {
        const eg = el.genres;
        const fg = intersection(genres, eg);
        //: matches (score) for sorting
        el.__matches = fg.length;
        //: matches only
        return fg.length > 0;
    });

    //: sort by matches (higher first)
    data = data.sort((a: any, b: any) => b.__matches - a.__matches);
    return data;
}

/** filter by duration (min/max) */
//: ----------------------------------------------------------------------------
const filterByDuration = (movies: Movie[], options: any ) => {

    const duration: number = options.duration;

    let data = movies;
	data = data.filter((i: any) => i.runtime >= + duration - 10);
	data = data.filter((i: any) => i.runtime <= + duration + 10);
	return data;
}

/** filter duplicates */
//: ----------------------------------------------------------------------------
const uniqueMovies = (movies: Movie[]) => {

    //: reversed map
    const map = new Map(movies.map((obj) => {
        let { id, __matches, ...y } = obj;
        return [ JSON.stringify(y), id ];
    }));

    //: remap
    const remap = Array.from(map, ([key, val]) => {
        let ids = { id: val };
        let obj = jsonParse(key);
        return { ...ids, ...obj };
    });

	return remap;
}

/** get random movie from Movies array */
//: ----------------------------------------------------------------------------
const randomMovie = (movies: Movie[]) => {
    const r = Math.floor(Math.random() * movies.length);
    return (movies[r]) ? [ movies[r] ] : [];
}

//: ----------------------------------------------------------------------------
export { uniqueMovies, randomMovie, filterByGenre, filterByDuration }
