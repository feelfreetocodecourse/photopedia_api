"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.isAdmin = exports.loginUser = exports.createUser = exports.updateProfile = exports.getUserOrder = exports.getUserOrders = exports.getUser = exports.getUsers = void 0;
var joi_1 = __importDefault(require("joi"));
var models_1 = require("../models");
var password_hash_1 = __importDefault(require("password-hash"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mongoose_1 = require("mongoose");
var JWT_SECRET = process.env.JWT_SECRET;
function getUsers(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var pagesize, page, skip, sortBy, users, count, totalUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pagesize = request.query.pagesize
                        ? Number.parseInt(request.query.pagesize.toString())
                        : 2;
                    page = request.query.page
                        ? Number.parseInt(request.query.page.toString())
                        : 1;
                    skip = (page - 1) * pagesize;
                    sortBy = (request.query.sortby) ? (request.query.sortby) : 'name';
                    return [4 /*yield*/, models_1.UserModel.find().skip(skip).limit(pagesize).sort(sortBy)];
                case 1:
                    users = _a.sent();
                    count = users.length;
                    return [4 /*yield*/, models_1.UserModel.find().countDocuments()];
                case 2:
                    totalUsers = _a.sent();
                    response.json({
                        users: users,
                        count: count,
                        page: page,
                        pagesize: pagesize,
                        totalUsers: totalUsers,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUsers = getUsers;
function getUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _id, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _id = request.params.id;
                    if (!mongoose_1.isValidObjectId(_id)) {
                        response.status(400);
                        return [2 /*return*/, next(new Error("user id is not valid"))];
                    }
                    return [4 /*yield*/, models_1.UserModel.findById(_id)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        response.status(404);
                        return [2 /*return*/, next(new Error("user not found"))];
                    }
                    response.json({
                        user: user
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
function getUserOrders(request, response) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, _id, status, filterObject, orders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = request.payload;
                    _id = payload._id;
                    status = request.query.status;
                    filterObject = {
                        user: new models_1.UserModel({ _id: _id }),
                    };
                    if (status) {
                        filterObject.orderStatus = new RegExp(status, "i");
                    }
                    return [4 /*yield*/, models_1.OrderModel.find(filterObject).populate([
                            { path: "picture" },
                            { path: "payment" },
                        ])];
                case 1:
                    orders = _a.sent();
                    orders = orders.map(function (order) {
                        order = order.toJSON();
                        console.log(order.image);
                        if (order.payment.payment_status === "Failed") {
                            delete order.image;
                        }
                        return order;
                    });
                    response.json({ orders: orders });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUserOrders = getUserOrders;
function getUserOrder(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, user_id, orderid, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = request.payload;
                    user_id = payload._id;
                    orderid = request.params.orderid;
                    return [4 /*yield*/, models_1.OrderModel.findOne({
                            user: new models_1.UserModel({ _id: user_id }),
                            _id: orderid
                        }).populate([
                            { path: "picture" },
                            { path: "payment" },
                        ])];
                case 1:
                    order = _a.sent();
                    if (!order) {
                        response.status(404);
                        return [2 /*return*/, next(new Error("order not found"))];
                    }
                    response.json({ order: order });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getUserOrder = getUserOrder;
function updateProfile(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, validationSchema, _a, value, error, payload, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = request.body;
                    validationSchema = joi_1.default.object({
                        name: joi_1.default.string().min(4),
                    });
                    _a = validationSchema.validate(body), value = _a.value, error = _a.error;
                    if (error) {
                        return [2 /*return*/, next(new Error(error.details[0].message))];
                    }
                    payload = request.payload;
                    return [4 /*yield*/, models_1.UserModel.findOneAndUpdate({ _id: payload._id }, { $set: __assign({}, value) }, { new: true })];
                case 1:
                    user = _b.sent();
                    response.json({ message: "profile updated", user: user });
                    return [2 /*return*/];
            }
        });
    });
}
exports.updateProfile = updateProfile;
function createUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, userValidationSchema, _a, value, error, generatedPassword, userObject, user, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = request.body;
                    userValidationSchema = joi_1.default.object({
                        name: joi_1.default.string().required().min(4),
                        email: joi_1.default.string().email().required(),
                        password: joi_1.default.string().required().min(6),
                        repeat_password: joi_1.default.ref("password"),
                    }).with("password", "repeat_password");
                    _a = userValidationSchema.validate(body), value = _a.value, error = _a.error;
                    if (error) {
                        return [2 /*return*/, next(new Error(error.details[0].message))];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    generatedPassword = password_hash_1.default.generate(value.password);
                    console.log({ generatedPassword: generatedPassword });
                    userObject = __assign(__assign({}, value), { password: generatedPassword });
                    return [4 /*yield*/, new models_1.UserModel(userObject).save()];
                case 2:
                    user = _b.sent();
                    response.json({
                        user: user,
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    if (error_1.name === "MongoError") {
                        return [2 /*return*/, next(new Error(error_1.message))];
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
function loginUser(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, userValidationSchema, _a, value, error, email, password, user, isValid, payload, token;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = request.body;
                    userValidationSchema = joi_1.default.object({
                        email: joi_1.default.string().email().required(),
                        password: joi_1.default.string().required().min(6),
                    });
                    _a = userValidationSchema.validate(body), value = _a.value, error = _a.error;
                    if (error) {
                        response.status(400);
                        return [2 /*return*/, next(new Error(error.details[0].message))];
                    }
                    email = value.email, password = value.password;
                    return [4 /*yield*/, models_1.UserModel.findOne({ email: email })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        response.status(400);
                        return [2 /*return*/, next(new Error("email or password incorrect"))];
                    }
                    console.log(user);
                    isValid = password_hash_1.default.verify(password, user.password + "");
                    if (isValid) {
                        payload = {
                            _id: user._id,
                            isAdmin: user.isAdmin,
                        };
                        token = jsonwebtoken_1.default.sign(payload, JWT_SECRET);
                        return [2 /*return*/, response.json({
                                message: "Login Success ",
                                token: token,
                            })];
                    }
                    response.status(400);
                    return [2 /*return*/, next("email or password incorrect")];
            }
        });
    });
}
exports.loginUser = loginUser;
function isAdmin(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, isAdmin;
        return __generator(this, function (_a) {
            payload = request.payload;
            isAdmin = payload.isAdmin;
            response.json({
                isAdmin: isAdmin
            });
            return [2 /*return*/];
        });
    });
}
exports.isAdmin = isAdmin;
function getProfile(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var payload, _id, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    payload = request.payload;
                    _id = payload._id;
                    return [4 /*yield*/, models_1.UserModel.findById(_id)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, next(new Error("not Found"))];
                    }
                    response.json({
                        user: user
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getProfile = getProfile;
