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

// POST: crear película
export const createMovie = async (req, res) => {
    try {
        const { title, genre, duration, year, synopsis } = req.body;

        // validaciones básicas
        if (!title || !genre || !duration || !year) {
            return res.status(400).json({
                message: "Faltan campos obligatorios"
            });
        }

        const newMovie = await Movie.create({
            title,
            genre,
            duration,
            year,
            synopsis
        });

        res.status(201).json({
            message: "Película creada correctamente",
            data: newMovie
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al crear la película",
            error: error.message
        });
    }
};

// PUT: actualizar una película
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Película no encontrada"
            });
        }

        const { title, genre, duration, year, synopsis } = req.body;

        await movie.update({
            title,
            genre,
            duration,
            year,
            synopsis
        });

        res.status(200).json({
            message: "Película actualizada correctamente",
            data: movie
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la película",
            error: error.message
        });
    }
};
// DELETE: eliminar una película
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);

        if (!movie) {
            return res.status(404).json({
                message: "Película no encontrada"
            });
        }

        await movie.destroy();

        res.status(200).json({
            message: "Película eliminada correctamente"
        });

    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la película",
            error: error.message
        });
    }
};