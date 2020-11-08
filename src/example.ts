const KEY_ID='rzp_test_KM8H0dXpwlNMmB'
const KEY_SECRET='AfXfJQmoUx7khv9LfrMtloRw'
import Razorpay from 'razorpay'


var instance = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
  });
var options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "feelfreetocode_order1"
  };
  instance.orders.create(options, function(err : any , order : any ) {
    console.log(order);
  });


//   order_Fwa4Bc8DbQnN3J