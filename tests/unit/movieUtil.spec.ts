import { matchedGenres } from "../../src/util/movieUtil";

describe("Movie util", () => {

    it("properly filter movie genres", () => {
        const movieGenres = ["1", "2", "3"];
        const searchGenres = ["2"];
        const matchedGenresCount = matchedGenres(movieGenres, searchGenres);
        expect(matchedGenresCount).toEqual(1);
    });

});