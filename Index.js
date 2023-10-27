require("dotenv").config();
require("better-logging")(console);
const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const { Router } = require("express");
const router = Router();
const path = require("path");
const renderView = require("./Nucleo/renderView");

app.use("/assets", express.static(path.join(__dirname, "/assets")));
app.use(express.static("assets"));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(cors());
router.get("/api", (req, res) => {
  res.status(200).json('{text: "Hola mundo"}');
});

router.get(`/template`, (req, res) => {
  renderView(res, "template");
});
router.get("/", function (req, res) {
  renderView(res, "template");
});

router.get("/template", function (req, res) {
  res.render("template", { content: "index" });
});

router.get(`/ruta`, (req, res) => {
  renderView(res, "reseñas");
});
router.get("/", function (req, res) {
  renderView(res, "reseñas");
});

router.get("/reseña", function (req, res) {
  res.render("reseñas", { content: "index" });
});

router.get(`/apis`, (req, res) => {
  renderView(res, "api");
});
router.get("/", function (req, res) {
  renderView(res, "api");
});

router.get("/api", function (req, res) {
  res.render("api", { content: "index" });
});

// Agregamos rutas al servidor
app.use("/", router);

// Encendemos el servidor
server.listen(process.env.PORT, () => {
  console.info(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
