import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  db_url: process.env.DB_URL,
  //   jwt_secret: process.env.JWT_SECRET,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
  },
  node_env: process.env.NODE_ENV || "development",
  gemini_api_key: process.env.GEMINI_API_KEY,
};
