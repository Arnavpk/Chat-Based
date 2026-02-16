import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const __dirname = path.resolve();

const PORT = process.env.PORT || 8000;

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

//make ready for deployment

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

    app.use((_, res) => {
        res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
    });
}


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
});
