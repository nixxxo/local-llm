import winston from "winston";
import "winston-mongodb";

const mongoTransport = new winston.transports.MongoDB({
    level: "silly",
    db: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/logs",
    collection: "application_logs",
    tryReconnect: true,
});

mongoTransport.on("error", (err) => {
    console.error("MongoDB transport error:", err);
});

const logger = winston.createLogger({
    level: "silly",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            level: "silly",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        mongoTransport,
    ],
});

export default logger;
