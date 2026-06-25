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