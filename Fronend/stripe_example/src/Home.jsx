import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

export const Home = () => {
  return (
    <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      <h1>(React + Node + Stripe)</h1>
      <a href='/subscription'>Go to the Subscription Page</a>
    </div>
  )
}
