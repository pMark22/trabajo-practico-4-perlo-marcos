import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        mensaje: "API Movies funcionando"
    });
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en puerto 3000");
});