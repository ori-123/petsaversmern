const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://localhost:3000",
  "http://127.0.0.1:3001",
  "http://localhost:3001"
];

const corsOptions = {
  methods: ["GET", "POST", "PATCH", "DELETE"],
  origin: (origin, callback) => {
    //!origin ONLY for developement
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const err = new Error("Not allowed by CORS");
      console.error(err);
      callback(err);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true
};

module.exports = corsOptions;