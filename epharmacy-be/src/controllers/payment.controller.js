
const stripe = require("stripe")(`${process.env.SECRET_KEY}`);
class PaymentController {
  static handlePaymentCarts = async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "vnd",
        automatic_payment_methods: {
          enabled: true,
        },
        description: "Payment for order",
      });
      // Return the secret key
      res.json({
        paymentIntent: paymentIntent.client_secret,
      });
    } catch (error) {
      console.log("==========error==========:", error);
      res.status(400).json({ error: error.message });
    }
  };
}

module.exports = PaymentController;