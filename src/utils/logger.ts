import winston from "winston";
import "winston-mongodb";

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.MongoDB({
            level: "error",
            db: process.env.MONGO_URI || "mongodb://localhost:27017/logs",
            options: { useUnifiedTopology: true },
            collection: "application_logs",
            tryReconnect: true,
        }),
    ],
});

export default logger;