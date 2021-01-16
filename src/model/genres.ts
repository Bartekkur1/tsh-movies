export const defaultGenresArray = [
    "Comedy",
    "Fantasy",
    "Crime",
    "Drama",
    "Music",
    "Adventure",
    "History",
    "Thriller",
    "Animation",
    "Family",
    "Mystery",
    "Biography",
    "Action",
    "Film-Noir",
    "Romance",
    "Sci-Fi",
    "War",
    "Western",
    "Horror",
    "Musical",
    "Sport"
] as const;

export type Genre = typeof defaultGenresArray[number];