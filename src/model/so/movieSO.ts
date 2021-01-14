import { Genre } from "../entity/genres";

interface MovieSO {
    genres?: Genre[];
    duration?: number;
}

export default MovieSO;