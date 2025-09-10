import dotenv from "dotenv";
dotenv.config();

if (!process.env.DB_URL) {
  console.error("❌ DB_URL is not set!");
  process.exit(1); // stop app if DB_URL missing
}

export default {
  port: process.env.PORT || 5000,
  db_url: process.env.DB_URL,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
  },
  node_env: process.env.NODE_ENV || "development",
  gemini_api_key: process.env.GEMINI_API_KEY,
};
