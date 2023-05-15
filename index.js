require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/auth.routes');
const postsRouter = require('./routes/posts.routes');
const errorMiddleware = require('./middleware/error.middleware');


const app = express()
app.use(express.json())
app.use(cors());
const PORT = process.env.PORT || 8080


app.use('/auth', authRouter)
app.use('/posts', postsRouter)
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        app.listen(PORT, () => console.log(`Server has been started on port`, PORT))
    } catch (e) {
        console.log('Server start error',e)
    }
}

start()