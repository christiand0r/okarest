// Enviroment Variables
const { connect } = require("mongoose");

const connectMongo = async (DB_URI) => {
  try {
    await connect(DB_URI);
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.log(error);
    throw new Error("Fallo al intentar conectar al base de datos");
  }
};

module.exports = {
  connectMongo,
};
