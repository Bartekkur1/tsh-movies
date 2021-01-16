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

const mockMovies: Movie[] = [
    {
        "id": 1,
        "title": "Beetlejuice",
        "year": 1988,
        "runtime": 100,
        "genres": ["Comedy", "Fantasy", "Crime"],
        "director": "Tim Burton",
        "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
        "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
    },
    {
        "id": 2,
        "title": "The Cotton Club",
        "year": 1984,
        "runtime": 90,
        "genres": ["Comedy", "Fantasy"],
        "director": "Francis Ford Coppola",
        "actors": "Richard Gere, Gregory Hines, Diane Lane, Lonette McKee",
        "plot": "The Cotton Club was a famous night club in Harlem. The story follows the people that visited the club, those that ran it, and is peppered with the Jazz music that made it so famous.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU5ODAyNzA4OV5BMl5BanBnXkFtZTcwNzYwNTIzNA@@._V1_SX300.jpg"
    },
    {
        "id": 3,
        "title": "Crocodile Dundee",
        "year": 1986,
        "runtime": 97,
        "genres": ["Fantasy", "Crime"],
        "director": "Peter Faiman",
        "actors": "Paul Hogan, Linda Kozlowski, John Meillon, David Gulpilil",
        "plot": "An American reporter goes to the Australian outback to meet an eccentric crocodile poacher and invites him to New York City.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTg0MTU1MTg4NF5BMl5BanBnXkFtZTgwMDgzNzYxMTE@._V1_SX300.jpg"
    },
    {
        "id": 5,
        "title": "Valkyrie",
        "year": 2008,
        "runtime": 100,
        "genres": ["Comedy"],
        "director": "Bryan Singer",
        "actors": "Tom Cruise, Kenneth Branagh, Bill Nighy, Tom Wilkinson",
        "plot": "A dramatization of the 20 July assassination and political coup plot by desperate renegade German Army officers against Hitler during World War II.",
        "posterUrl": "http://ia.media-imdb.com/images/M/MV5BMTg3Njc2ODEyN15BMl5BanBnXkFtZTcwNTAwMzc3NA@@._V1_SX300.jpg"
    },
    {
        "id": 6,
        "title": "Ratatouille",
        "year": 2007,
        "runtime": 100,
        "genres": ["Fantasy"],
        "director": "Brad Bird, Jan Pinkava",
        "actors": "Patton Oswalt, Ian Holm, Lou Romano, Brian Dennehy",
        "plot": "A rat who can cook makes an unusual alliance with a young kitchen worker at a famous restaurant.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMzODU0NTkxMF5BMl5BanBnXkFtZTcwMjQ4MzMzMw@@._V1_SX300.jpg"
    },
    {
        "id": 7,
        "title": "City of God",
        "year": 2002,
        "runtime": 110,
        "genres": ["Crime"],
        "director": "Fernando Meirelles, Kátia Lund",
        "actors": "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
        "plot": "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg"
    },

    {
        "id": 8,
        "title": "Beetlejuice",
        "year": 1988,
        "runtime": 200,
        "genres": ["Comedy", "Fantasy", "Crime"],
        "director": "Tim Burton",
        "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
        "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
    },
    {
        "id": 9,
        "title": "City of God",
        "year": 2002,
        "runtime": 190,
        "genres": ["Fantasy", "Crime"],
        "director": "Fernando Meirelles, Kátia Lund",
        "actors": "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
        "plot": "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg"
    },
    {
        "id": 10,
        "title": "City of God",
        "year": 2002,
        "runtime": 210,
        "genres": ["Comedy"],
        "director": "Fernando Meirelles, Kátia Lund",
        "actors": "Alexandre Rodrigues, Leandro Firmino, Phellipe Haagensen, Douglas Silva",
        "plot": "Two boys growing up in a violent neighborhood of Rio de Janeiro take different paths: one becomes a photographer, the other a drug dealer.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg"
    },
    {
        "id": 11,
        "title": "Beetlejuice",
        "year": 1988,
        "runtime": 211,
        "genres": ["Comedy", "Fantasy", "Crime"],
        "director": "Tim Burton",
        "actors": "Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page",
        "plot": "A couple of recently deceased ghosts contract the services of a \"bio-exorcist\" in order to remove the obnoxious new owners of their house.",
        "posterUrl": "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
    }
];


export { mockMovie, mockMovies };