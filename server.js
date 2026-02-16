const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to calculate something
app.post('/calculate', (req, res) => {
    const { operation, num1, num2 } = req.body;
    let result;
    switch (operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            result = num1 / num2;
            break;
        default:
            return res.status(400).send('Invalid operation');
    }
    res.status(200).json({ result });
});

// Endpoint for booking
app.post('/booking', (req, res) => {
    const { date, time, details } = req.body;
    // Dummy booking response
    res.status(200).send(`Booking confirmed for ${date} at ${time}. Details: ${details}`);
});

// Endpoint for payment
app.post('/pay', (req, res) => {
    const { amount, method } = req.body;
    // Dummy payment response
    res.status(200).send(`Payment of $${amount} received via ${method}.`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});