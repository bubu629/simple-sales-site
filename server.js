const express = require('express');
const stripe = require('stripe')('sk_test_51Q6zA3BeNARuJqY8ilSZRDKxfDzwcXDB700Ku37jU1yISApaBiHXVv0QSHSHSYb90yOh3LWz2OLHBTiLHRBLio6Y00Y5V27Rtl');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 4242;

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Home route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to create a payment intent with Stripe
app.post('/create-payment-intent', async (req, res) => {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 2000, // Amount in cents (e.g., $20)
        currency: 'usd',
        payment_method_types: ['card'],
    });

    res.send({
        clientSecret: paymentIntent.client_secret
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
