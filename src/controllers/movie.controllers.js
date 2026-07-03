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

export const createMovie = async (req, res) => {
    try {
        const { title, genre, duration, year, synopsis } = req.body;

        // Campos obligatorios
if (!title || !genre || duration === undefined || year === undefined) {
    return res.status(400).json({
        message: "Los campos title, genre, duration y year son obligatorios."
    });
}

// Duration
if (!Number.isInteger(duration) || duration <= 0) {
    return res.status(400).json({
        message: "Duration debe ser un número entero mayor que 0."
    });
}

// Year
const currentYear = new Date().getFullYear();

if (
    !Number.isInteger(year) ||
    year < 1888 ||
    year > currentYear
) {
    return res.status(400).json({
        message: "Year debe ser un número entero entre 1888 y el año actual."
    });
}

// Synopsis
if (
    synopsis !== undefined &&
    typeof synopsis !== "string"
) {
    return res.status(400).json({
        message: "Synopsis debe ser una cadena de texto."
    });
}

// Verificar título único
const movieExists = await Movie.findOne({
    where: { title }
});

if (movieExists) {
    return res.status(400).json({
        message: "Ya existe una película con ese título."
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
    console.error(error);

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

        const movieExists = await Movie.findOne({
            where: { title }
        });

        if (movieExists && movieExists.id !== movie.id) {
            return res.status(400).json({
                message: "Ya existe una película con ese título."
            });
        }

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