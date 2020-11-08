"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var express_1 = __importDefault(require("express"));
var user_controller_1 = require("../controllers/user-controller");
var auth_middlewares_1 = require("../middlewares/auth-middlewares");
// /api/users
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
userRouter.get("/", auth_middlewares_1.adminAuthMiddleware, user_controller_1.getUsers);
userRouter.put('/', auth_middlewares_1.userAuthMiddleware, user_controller_1.updateProfile);
userRouter.post('/', user_controller_1.createUser);
userRouter.get("/orders", auth_middlewares_1.userAuthMiddleware, user_controller_1.getUserOrders);
userRouter.get("/orders/:orderid", auth_middlewares_1.userAuthMiddleware, user_controller_1.getUserOrder);
userRouter.get("/isadmin", auth_middlewares_1.userAuthMiddleware, user_controller_1.isAdmin);
userRouter.get("/me", auth_middlewares_1.userAuthMiddleware, user_controller_1.getProfile);
userRouter.post('/login', user_controller_1.loginUser);
userRouter.get("/:id", auth_middlewares_1.adminAuthMiddleware, user_controller_1.getUser);
