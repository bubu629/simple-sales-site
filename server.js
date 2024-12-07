const express = require('express');
const stripe = require('stripe')('sk_test_51Q6zA3BeNARuJqY8ilSZRDKxfDzwcXDB700Ku37jU1yISApaBiHXVv0QSHSHSYb90yOh3LWz2OLHBTiLHRBLio6Y00Y5V27Rtl'); // 替换为你的Secret Key
const app = express();
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Golden Bracelet',
                    },
                    unit_amount: 5000, // 以美分为单位
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:4242/success',
        cancel_url: 'http://localhost:4242/cancel',
    });
    res.json({ id: session.id });
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));
