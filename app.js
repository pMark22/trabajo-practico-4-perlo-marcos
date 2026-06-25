import express from "express";

const app = express();

app.get("/api/movies", (req, res) => {
    res.json({ ok: true });
});

app.listen(3000, () => {
    console.log("SERVER ON 3000");
});