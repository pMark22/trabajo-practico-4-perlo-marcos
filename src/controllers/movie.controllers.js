import Movie from "../models/movie.model.js";

// GET: obtener todas las películas
export const getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();

        res.status(200).json({
            message: "Películas obtenidas correctamente",
            data: movies
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener las películas",
            error: error.message
        });
    }
};

// GET por ID
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Película no encontrada"
            });
        }

        res.status(200).json(movie);

    } catch (error) {
        res.status(500).json({
            message: "Error al obtener la película",
            error: error.message
        });
    }
};

// // GET: obtener una película por ID
// export const getMovieById = async (req, res) => {
//     try {
//         const movie = await Movie.findByPk(req.params.id);

//         if (!movie) {
//             return res.status(404).json({
//                 message: "Película no encontrada"
//             });
//         }

//         res.status(200).json(movie);

//     } catch (error) {
//         res.status(500).json({
//             message: "Error al obtener la película",
//             error: error.message
//         });
//     }
// };