import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

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
//config
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

//Routes

app.get("**", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

const port = 3030;
server.listen(port, () => {
  console.log(`Server listening on port http://127.0.0.1:${port}`);
});
