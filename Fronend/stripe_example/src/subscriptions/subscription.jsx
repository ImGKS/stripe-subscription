import style from './subscription.module.css'
import axios from 'axios'

const Subscription = () => {

    const plans = [
        {
            name : "Standard Monthly ",
            price: "49",
            pkg: 'standard',
            duration: 'month',
            features : [
                "feature 1",
                "feature 2",
                "feature 3",
            ]
        },
        {
            name : "Standard Yearly ",
            pkg: 'standard',
            price: "490",
            duration: 'year',
            features : [
                "feature 1",
                "feature 2",
                "feature 3",
                "feature 4",
            ]
        },
    ]

    const handlePayment = async (plan) => {
        console.log(plan, "plan")

        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/create-subscription',
            data: {
                plan_name: plan.pkg,
                duration: plan.duration
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(response?.data) {
            window.location.href = response?.data?.session?.url;
        }
    }

  return (
    <div className={style.container}>
      {plans.map((item)=>{
          return (
                <div className={style.cardContainer} key={item.name}>
                    <h2 className={style.name}>{item.name}</h2>
                    <p className={style.price}>${item.price}/month</p>
                    <ul className={style.featureList}>
                    {item.features.map((feature) => (
                        <li key={feature.id}>
                        {feature}
                        </li>
                    ))}
                    </ul>
                    <button
                        className={style.button}
                        onClick={() => handlePayment(item)}
                    >
                    Subscribe
                    </button>
                </div>
            )
        })}
    </div>
  )
}

export default Subscription