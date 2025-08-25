export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  apiKey: process.env.API_KEY,
  nodeEnv: process.env.NODE_ENV || 'staging',
});
