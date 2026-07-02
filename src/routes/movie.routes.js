import { Router } from "express";
import {
    getMovies,
    getMovieById,
    createMovie,
    updateMovie
} from "../controllers/movie.controllers.js";

console.log("Rutas de películas cargadas");

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);
router.post("/", createMovie);
router.put("/:id", updateMovie);

export default router;