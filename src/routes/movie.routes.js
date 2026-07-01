import { Router } from "express";
import { getMovies, getMovieById } from "../controllers/movie.controllers.js";

const router = Router();

router.get("/", getMovies);
router.get("/:id", getMovieById);

export default router;