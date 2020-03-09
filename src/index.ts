import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Unity Issue");
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log("Listening on localhost:" + PORT));
