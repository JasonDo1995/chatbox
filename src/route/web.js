import express from "express";
import HomeController from "../controllers/HomeController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", HomeController.getHomePage);
  router.post("/webhook", HomeController.postWebhook);

  router.get("/webhook", HomeController.getWebhook);

  return app.use("/.netlify/funtions/api", router);
};

module.exports = initWebRoutes;
