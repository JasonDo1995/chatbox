import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import WebRoutes from "./route/web";

let app = express();

// config viewEngine
viewEngine(app);
//config web routes
WebRoutes(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("app is running" + port);
});
