[verikami-node-tsh-v2](../README.md) / [Modules](../modules.md) / utils/movie.filters

# Module: utils/movie.filters

## Table of contents

### Functions

- [filterByDuration](utils_movie_filters.md#filterbyduration)
- [filterByGenre](utils_movie_filters.md#filterbygenre)
- [randomMovie](utils_movie_filters.md#randommovie)
- [uniqueMovies](utils_movie_filters.md#uniquemovies)

## Functions

### filterByDuration

▸ **filterByDuration**(`movies`, `options`): [`Movie`](../interfaces/types.Movie.md)[]

filter by duration (min/max)

#### Parameters

| Name | Type |
| :------ | :------ |
| `movies` | [`Movie`](../interfaces/types.Movie.md)[] |
| `options` | `any` |

#### Returns

[`Movie`](../interfaces/types.Movie.md)[]

#### Defined in

src/utils/movie.filters.ts:30

___

### filterByGenre

▸ **filterByGenre**(`movies`, `options`): [`Movie`](../interfaces/types.Movie.md)[]

filter by genres

#### Parameters

| Name | Type |
| :------ | :------ |
| `movies` | [`Movie`](../interfaces/types.Movie.md)[] |
| `options` | `any` |

#### Returns

[`Movie`](../interfaces/types.Movie.md)[]

#### Defined in

src/utils/movie.filters.ts:9

___

### randomMovie

▸ **randomMovie**(`movies`): [`Movie`](../interfaces/types.Movie.md)[]

get random movie from Movies array

#### Parameters

| Name | Type |
| :------ | :------ |
| `movies` | [`Movie`](../interfaces/types.Movie.md)[] |

#### Returns

[`Movie`](../interfaces/types.Movie.md)[]

#### Defined in

src/utils/movie.filters.ts:86

___

### uniqueMovies

▸ **uniqueMovies**(`movies`): `any`

filter duplicates

#### Parameters

| Name | Type |
| :------ | :------ |
| `movies` | [`Movie`](../interfaces/types.Movie.md)[] |

#### Returns

`any`

#### Defined in

src/utils/movie.filters.ts:42
