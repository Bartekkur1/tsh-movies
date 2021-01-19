import Movie from "../entity/movie";

type MovieDto = Omit<Movie, "id">;

export default MovieDto;