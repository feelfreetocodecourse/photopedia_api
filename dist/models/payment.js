"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var paymentSchema = new Schema({
    payment_id: { type: String, required: false, unique: false },
    order_id: { type: String, required: true, unique: true },
    payment_status: { type: String, default: "Failed" }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
});
var PaymentModel = mongoose_1.default.model("Payment", paymentSchema);
exports.PaymentModel = PaymentModel;
