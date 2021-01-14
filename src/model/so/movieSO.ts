import { Genre } from "../entity/genres";

export default interface MovieSO {
    genres?: Genre[];
    duration?: number;
}