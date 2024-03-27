// This JavaScript code sets up a basic Express.js server that handles HTTP requests related to reviews.

import express from "express";
import cors from "cors"; // cross origin resource sharing
import reviews from "./api/reviews.route.js"; // router middleware.

const app = express();

app.use(cors());
app.use(express.json());

// Any requests to paths starting with /api/v1/reviews will be handled by the reviews router middleware.
app.use("/api/v1/reviews", reviews);
// Configures a catch-all route to handle any requests that don't match the routes.
app.use("*", (req, res) => res.status(404).json({ error: "404 not found" }));

export default app;
