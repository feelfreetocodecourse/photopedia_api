"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var KEY_ID = 'rzp_test_KM8H0dXpwlNMmB';
var KEY_SECRET = 'AfXfJQmoUx7khv9LfrMtloRw';
var razorpay_1 = __importDefault(require("razorpay"));
var instance = new razorpay_1.default({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
});
var options = {
    amount: 50000,
    currency: "INR",
    receipt: "feelfreetocode_order1"
};
instance.orders.create(options, function (err, order) {
    console.log(order);
});
//   order_Fwa4Bc8DbQnN3J
