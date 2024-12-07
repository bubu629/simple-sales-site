const stripe = Stripe('pk_test_51Q6zA3BeNARuJqY8iKZE0eklx8Nb1aIV7ihDMsZf6s2M1MMMGLlcfBsrmk8bTvIKRLM70HBCVKwUf6kJpaj58eCz00S3t58ZKj'); // 替换为你的Publishable Key

document.getElementById('checkout-button').addEventListener('click', () => {
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => stripe.redirectToCheckout({ sessionId: data.id }))
        .catch(err => console.error(err));
});
