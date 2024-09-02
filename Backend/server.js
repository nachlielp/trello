import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { authRoutes } from "./api/auth/auth.routes.js";
import { userRouter } from "./api/user/user.routes.js";
import { boardRouter } from "./api/board/board.routes.js";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174",
  ],
  credentials: true,
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// API Routes
app.use("/api/boards", boardRouter);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);

// Handle all other routes by sending 'index.html'
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const port = 3030;
server.listen(port, () => {
  console.log(`Server listening on http://127.0.0.1:${port}`);
});
