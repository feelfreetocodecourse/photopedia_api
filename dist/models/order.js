"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var short = require('short-uuid');
var translator = short();
var HOST = process.env.HOST;
var orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    payment: { type: Schema.Types.ObjectId, required: true, ref: 'Payment' },
    picture: { type: Schema.Types.ObjectId, required: true, ref: 'Picture' },
    price: { type: Number, required: true },
    orderStatus: { type: String, enum: ['Success', "Failed"], required: true, default: "Failed" },
    urlKey: { type: String, required: true, unique: true, default: translator.new },
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    },
    toJSON: {
        transform: function (doc, order) {
            var key = order.urlKey;
            delete order.urlKey;
            if (order.orderStatus == "Success") {
                order.image = HOST + "/api/file/highqualityimage/" + key;
            }
            return order;
        }
    }
});
var OrderModel = mongoose_1.default.model("Order", orderSchema);
exports.OrderModel = OrderModel;
