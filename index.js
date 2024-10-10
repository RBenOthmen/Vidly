const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const movies = [
    { id: 1, name: "Movie_1" },
    { id: 2, name: "Movie_2" },
    { id: 3, name: "Movie_3" },
];

// -------------------------------------------------- GET HOME --------------------------------------------------
app.get("/", (req, res) => {
    res.send("Welcome to VIDLY");
});

// -------------------------------------------------- GET ALL --------------------------------------------------
app.get("/api/movies", (req, res) => {
    res.send(movies);
});

// -------------------------------------------------- GET by ID --------------------------------------------------
app.get("/api/movies/:id", (req, res) => {
    const movie = movies.find((c) => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie with the given ID was not found.");
    res.send(movie);
});

// -------------------------------------------------- POST --------------------------------------------------
app.post("/api/movies", (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = {
        id: movies.length + 1,
        name: req.body.name,
    };
    movies.push(movie);
    res.send(movie);
});

// -------------------------------------------------- PUT --------------------------------------------------
app.put("/api/movies/:id", (req, res) => {
    const movie = movies.find((c) => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie with the given ID was not found.");

    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    movie.name = req.body.name;
    res.send(movie);
});

// -------------------------------------------------- DELETE --------------------------------------------------
app.delete("/api/movies/:id", (req, res) => {
    const movie = movies.find((c) => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie with the given ID was not found.");

    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    res.send(movie);
});



// -------------------------------------------------- VALIDATE --------------------------------------------------
function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(movie);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));