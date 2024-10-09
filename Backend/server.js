const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3000;

// Secret key
const stripe = require('stripe')('sk_test_51Q7eAg04SlICrxjsF2gWAMlB57jVx52asA9l6zpNR3nNG1jP8nYhtylCUKxwqJzBZQOhQNksCGLjcleji0lwxMmT00B8CVHinR')

// Middleware to parse JSON bodies
app.use(express.json());

const plans = [
    {
        plan_id: 'price_1Q7efB04SlICrxjsrBdlBVW1',
        plan_name: 'standard',
        duration: 'month'
    },
    {
        plan_id: 'price_1Q7efa04SlICrxjsTiqYc7As',
        plan_name: 'standard',
        duration: 'year'
    },    
]

app.post("/create-subscription", async(req, res) => {

    const {plan_name, duration} = req.body;
    const selectedPlan = plans.find(planName => plan_name === planName.plan_name && duration === planName.duration)

    if(!selectedPlan) {
        return res.status(400).json({
            message: 'Plan not found'
        })
    }

   try {
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: selectedPlan.plan_id,
                    quantity: 1,
                }
            ],
            success_url: 'http://127.0.0.1:5173/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://127.0.0.1:5173/cancel?session_id={CHECKOUT_SESSION_ID}',
            customer_email: 'gaurav.singh@flairminds.com'
        })

        return res.status(200).json({session})
    } catch (error) {
        console.log('error', error);
    }
})

// save payment
app.post('/save-payment', async(req, res) => {
    const {session_id} = req.body;

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        if(session.status === 'complete') {
            console.log({session, subscription});
            return res.status(200).json({session, subscription}) 
        }
    } catch (error) {
        console.log("error",error);
        throw error
    }
})

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// create subscription

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
