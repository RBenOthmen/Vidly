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





// -------------------------------------------------- VALIDATE --------------------------------------------------
function validateMovie(movie) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });
    return schema.validate(movie);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));