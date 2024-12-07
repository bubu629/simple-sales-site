const express = require('express');
const stripe = require('stripe')('sk_test_51Q6zA3BeNARuJqY8ilSZRDKxfDzwcXDB700Ku37jU1yISApaBiHXVv0QSHSHSYb90yOh3LWz2OLHBTiLHRBLio6Y00Y5V27Rtl'); // 使用测试私钥
const app = express();

// 解析请求体中的 JSON 数据
app.use(express.json());

// 首页路由
app.get('/', (req, res) => {
    res.send('Welcome to Golden Nations Sales!');
});

// 创建支付意图路由
app.post('/create-payment-intent', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // 价格单位：分，5.00 USD
            currency: 'usd',
        });
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// 启动服务器
app.listen(4242, () => {
    console.log('Server running on http://localhost:4242');
});
