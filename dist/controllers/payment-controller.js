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
exports.verifyPayment = void 0;
var models_1 = require("../models");
var joi_1 = __importDefault(require("joi"));
var crypto_1 = require("crypto");
var _a = process.env, KEY_ID = _a.KEY_ID, KEY_SECRET = _a.KEY_SECRET;
function verifyPayment(request, response, next) {
    return __awaiter(this, void 0, void 0, function () {
        var body, schema, _a, error, value, order_id, payment_id, razorpay_signature, payment, generatedHex, message, populateArray, order;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = request.body;
                    schema = joi_1.default.object({
                        order_id: joi_1.default.string().required(),
                        payment_id: joi_1.default.string().required(),
                        razorpay_signature: joi_1.default.string().required(),
                    });
                    _a = schema.validate(body), error = _a.error, value = _a.value;
                    if (error) {
                        response.status(400);
                        return [2 /*return*/, next(new Error(error.details[0].message))];
                    }
                    order_id = value.order_id, payment_id = value.payment_id, razorpay_signature = value.razorpay_signature;
                    return [4 /*yield*/, models_1.PaymentModel.findOne({ order_id: order_id })];
                case 1:
                    payment = _b.sent();
                    generatedHex = crypto_1.createHmac("SHA256", KEY_SECRET)
                        .update(order_id + "|" + payment_id)
                        .digest("hex");
                    message = "Payment Sucesss";
                    populateArray = [
                        { path: 'payment' },
                        { path: 'user', select: "-password" }
                    ];
                    if (generatedHex == razorpay_signature) {
                        payment.payment_status = "Success";
                        populateArray.push({ path: "picture" });
                    }
                    else {
                        payment.payment_status = "Failed";
                        message = "Payment Failed.";
                        populateArray.push({ path: "picture", select: '-highQualityImage' });
                        response.status(400);
                    }
                    return [4 /*yield*/, payment.save()];
                case 2:
                    payment = _b.sent();
                    return [4 /*yield*/, models_1.OrderModel
                            .findOne({ 'payment': payment })];
                case 3:
                    order = _b.sent();
                    order.orderStatus = payment.payment_status;
                    return [4 /*yield*/, order.save()];
                case 4:
                    order = _b.sent();
                    return [4 /*yield*/, models_1.OrderModel.populate(order, populateArray)];
                case 5:
                    order = _b.sent();
                    response.json({
                        message: message,
                        order: order
                    });
                    return [2 /*return*/];
            }
        });
    });
}
exports.verifyPayment = verifyPayment;
