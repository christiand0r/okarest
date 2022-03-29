require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(new Error("Fallo al intentar generar el token"));
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateJWT };
