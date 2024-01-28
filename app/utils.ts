//: ----------------------------------------------------------------------------
//: veriKami // utils.ts
//: ----------------------------------------------------------------------------

interface Movie {
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

//: ----------------------------------------------------------------------------

//: json parse (with numbers)
const jsonParse = (str: any) => {
    return JSON.parse(str, (k, v) => {
        return (typeof v === "object" || isNaN(v) || v === "")
            ? v : parseInt(v, 10);
    });
};

//: arrays intersection
const intersection = (a: string[], b: string[]) => {
    const set = new Set(b);
    return a.filter((el: any) => set.has(el));
}

//: ----------------------------------------------------------------------------

//: filter by genres
const filterByGenre = (movies: Movie[], genres: string[]) => {
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

//: filter by duration (min/max)
const filterByDuration = (movies: Movie[], duration: string | number) => {
    let data = movies;
	data = data.filter((i: any) => i.runtime >= + duration - 10);
	data = data.filter((i: any) => i.runtime <= + duration + 10);
	return data;
}

//: filter duplicates
const uniqueMovies = (movies: Movie[]) => {

	//: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	//: TODO: avoid duplicates
	//: TODO: final with id
    //: ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	/*/
    const all = movies.map((x: any) => {
    	const { id, ...y } = x; //: remove id
    	return JSON.stringify(y);
    });
    let uniq = [...new Set(all)];
    uniq = uniq.map((x: any) => jsonParse(x));
    //console.log(all);
    //console.log(uniq);
    //*/
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

//: get random movie from Movies array
const getRandomMovie = (movies: Movie[]) => {
    const r = Math.floor(Math.random() * movies.length);
    return (movies[r]) ? [ movies[r] ] : [];
}

//: ----------------------------------------------------------------------------
export { Movie, jsonParse, intersection, filterByGenre, filterByDuration,
    uniqueMovies, getRandomMovie }
