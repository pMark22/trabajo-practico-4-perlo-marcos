import express from "express";
import sequelize from "./src/config/database.js";
import "./src/models/movie.model.js";
import movieRoutes from "./src/routes/movie.routes.js";

const app = express();

app.use(express.json());

// Rutas
app.use("/api/movies", movieRoutes);

app.delete("/prueba", (req, res) => {
    res.json({ mensaje: "DELETE funciona" });
});

console.log("Rutas registradas");

try {
    await sequelize.authenticate();
    console.log("Base de datos conectada");

    await sequelize.sync();
    console.log("Tablas sincronizadas");
} catch (error) {
    console.error("Error al conectar la base de datos:", error);
}

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});