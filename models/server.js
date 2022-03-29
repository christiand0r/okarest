// Enviroment Variables
require("dotenv").config();

const cors = require("cors");
const express = require("express");

const { connectMongo } = require("../config/mongo");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Path routes
    this.paths = {
      customers: "/api/customers",
      login: "/api/login",
      products: "/api/products",
      orders: "/api/orders",
    };

    // DB
    this.database();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async database() {
    await connectMongo(process.env.DB_URI);
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Parsed to JSON
    this.app.use(express.json());

    // Public Dir
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.login, require("../routes/login"));
    this.app.use(this.paths.customers, require("../routes/customers"));
    this.app.use(this.paths.products, require("../routes/products"));
    this.app.use(this.paths.orders, require("../routes/orders"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en: http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
