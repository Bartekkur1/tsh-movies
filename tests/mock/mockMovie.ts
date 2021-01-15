import Movie from "../../src/model/entity/movie";

const mockMovie: Movie = {
    id: 0,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    actors: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
    genres: [
        "Action", "Fantasy", "Sci-Fi", "Adventure"
    ],
    plot: "The film describes a future in which reality perceived by humans is actually the Matrix.",
    posterUrl: "https://youtu.be/dQw4w9WgXcQ",
    runtime: 150,
    year: 1999,
};

export default mockMovie;