"use strict";
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
exports.getOrders = exports.getOrder = exports.createOrder = void 0;
var models_1 = require("../models");
var razorpay_1 = __importDefault(require("razorpay"));
var mongoose_1 = require("mongoose");
var _a = process.env, KEY_ID = _a.KEY_ID, KEY_SECRET = _a.KEY_SECRET;
var instance = new razorpay_1.default({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
});
function createOrder(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var pictureId, payload, picture, user, count, mrp, discount, price, razorPayOrderObject, error_1, paymentObject, _order, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pictureId = request.body.picture;
                    payload = request.payload;
                    return [4 /*yield*/, models_1.PictureModel.findById(pictureId).select("-highQualityImage")];
                case 1:
                    picture = (_a.sent());
                    console.log({ picture: picture });
                    console.log({ user: payload._id });
                    return [4 /*yield*/, models_1.UserModel.findById(payload._id)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, models_1.OrderModel.find({
                            user: user,
                            picture: picture,
                            orderStatus: "Success",
                        }).countDocuments()];
                case 3:
                    count = _a.sent();
                    if (count > 0) {
                        response.status(400);
                        return [2 /*return*/, next(new Error("user already paid for this picture"))];
                    }
                    mrp = +picture.price;
                    discount = +picture.discount;
                    price = mrp - mrp * (discount / 100);
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, instance.orders.create({
                            amount: Math.floor(price * 100),
                            currency: "INR",
                            receipt: "feelfreetocode_order" + Date.now(),
                            payment_capture: true,
                            notes: {
                                name: user.name,
                                email: user.email,
                            },
                        })];
                case 5:
                    razorPayOrderObject = (_a.sent());
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.log(error_1);
                    response.status(500);
                    return [2 /*return*/, response.send("Razorpay Error")];
                case 7:
                    console.log(razorPayOrderObject);
                    return [4 /*yield*/, new models_1.PaymentModel({
                            order_id: razorPayOrderObject.id,
                        }).save()];
                case 8:
                    paymentObject = _a.sent();
                    _order = {
                        payment: paymentObject,
                        user: user,
                        picture: picture,
                        price: price,
                    };
                    return [4 /*yield*/, new models_1.OrderModel(_order).save()];
                case 9:
                    order = _a.sent();
                    response.json({
                        payment: paymentObject,
                        order: order,
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.createOrder = createOrder;
function getOrder(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var orderid, order;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    orderid = request.params.orderid;
                    if (!mongoose_1.isValidObjectId(orderid)) {
                        response.status(400);
                        return [2 /*return*/, next(new Error("Invalid Order id"))];
                    }
                    return [4 /*yield*/, models_1.OrderModel.findById(orderid)];
                case 1:
                    order = _a.sent();
                    response.status(404);
                    return [2 /*return*/, (order) ?
                            response.status(200).json({ order: order }) : next(new Error("Not found"))];
            }
        });
    });
}
exports.getOrder = getOrder;
function getOrders(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var filter, sortby, pagesize, page, skip, userid, status, orders, totalOrders;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filter = {};
                    sortby = request.query.sortby || "-created_at";
                    pagesize = request.query.pagesize
                        ? Number.parseInt(request.query.pagesize.toString())
                        : 2;
                    page = request.query.page
                        ? Number.parseInt(request.query.page.toString())
                        : 1;
                    skip = (page - 1) * pagesize;
                    userid = request.query.user;
                    if (userid) {
                        filter.user = userid;
                    }
                    status = request.query.status;
                    if (status) {
                        filter.orderStatus = new RegExp(status, 'i');
                    }
                    return [4 /*yield*/, models_1.OrderModel.find(filter).populate([
                            { path: 'user' },
                            { path: 'payment' },
                            { path: 'picture' },
                        ]).skip(skip).limit(pagesize).sort(sortby)];
                case 1:
                    orders = _a.sent();
                    return [4 /*yield*/, models_1.OrderModel.find().countDocuments()
                        // underscore // lodash
                    ];
                case 2:
                    totalOrders = _a.sent();
                    // underscore // lodash
                    response.json({
                        orders: orders,
                        count: orders.length,
                        pagesize: pagesize,
                        page: page,
                        totalOrders: totalOrders
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.getOrders = getOrders;
