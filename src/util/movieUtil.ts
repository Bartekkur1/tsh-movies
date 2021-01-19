export const matchedGenres = (target: string[], search: string[]): number => {
    return search.filter(s => target.includes(s)).length;
};

export const genresStringToArray = (genres: string): string[] => {
    if (genres)
        return genres.split(",");
    else
        return [];
};