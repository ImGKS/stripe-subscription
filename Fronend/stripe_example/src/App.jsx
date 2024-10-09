
import './App.css'
import { Home } from './Home'
import { Routes, Route} from 'react-router-dom';
import Subscription from './subscriptions/subscription';
import Success from './subscriptions/success';
import Error from './subscriptions/error';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Error />} />
      </Routes>
    </>
  )
}

export default App
