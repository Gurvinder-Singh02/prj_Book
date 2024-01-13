const express = require('express');
const { PORT, MONGO_URL } = require('./config');
const app = express();
const mongoose = require('mongoose');
const booksRoute = require('./route.js');
const cors = require('cors')


main()
    .then(() => {
        console.log("connected to DB")
    })
    .catch((err) => {
        console.log(err)
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())

// app.use(
//     cors({
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type',]
//     })
// );


app.use('/books', booksRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

app.use((err, req, res, next) => {
    console.log(err);
    return res.status(500).send({ error: err.message });
});