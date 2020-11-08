"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var logger_1 = require("./utils/logger");
process.on("uncaughtException", function (er) {
    logger_1.winston.error("uncaughtException", er);
});
process.on("unhandledRejection", function (er) {
    logger_1.winston.error("unhandledRejection", er);
});
var express_1 = __importDefault(require("express"));
var connection_1 = require("./db/connection");
var error_middleware_1 = require("./middlewares/error-middleware");
var routers_1 = require("./routers");
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var app = express_1.default();
app.use(helmet_1.default());
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
console.log("PORT", process.env.PORT);
var _a = process.env, PORT = _a.PORT, JWT_SECRET = _a.JWT_SECRET, HOST = _a.HOST;
// creating connection
connection_1.createConnection();
console.log(JWT_SECRET, HOST);
app.listen(PORT || 3000, function () {
    console.log("App is listening On ", PORT || 3000);
});
var apiRouter = express_1.default.Router();
app.use("/api", apiRouter);
apiRouter.get("/", function (req, res) {
    res.json({ message: "API is working.." });
});
apiRouter.use("/users", routers_1.userRouter);
apiRouter.use("/pictures", routers_1.pictureRouter);
apiRouter.use("/orders", routers_1.orderRouter);
apiRouter.use("/payments", routers_1.paymentRouter);
apiRouter.use("/file", routers_1.fileDownloadRouter);
apiRouter.use("/summary", routers_1.summaryRouter);
app.use(error_middleware_1.errorHandler);
