import { Route, BrowserRouter as Router } from 'react-router-dom'
import axios from 'axios'
import Landing from './components/Landing'
import Login from './components/Login'
import Logout from './components/Logout'
import BuyerNav from './components/BuyerNav'
import BuyerEntry from './components/BuyerEntry'
import BuyForm from './components/BuyForm'
import BuyItems from './components/BuyItems'
import AllHostedBuys from './components/AllHostedBuys'
import OneHostedBuy from './components/OneHostedBuy'
import BuyPage from './components/BuyPage'
// import AllBuyOrders from './components/AllBuyOrders'
import OrderSuccess from './components/OrderSuccess'
import HostNav from './components/HostNav'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function App() {
  return (
    <>
      <Router>
        <Route exact path='/'>
          <Landing />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/logout'>
          <Logout />
        </Route>
        <Route exact path='/buyer'>
          <BuyerNav />
        </Route>
        <Route exact path='/host'>
          <HostNav />
        </Route>
        <Route exact path='/enterbuyid'>
          <BuyerEntry entryPoint="buyId" />
        </Route>
        <Route exact path='/entermobilenum'>
          <BuyerEntry entryPoint="mobileNum" />
        </Route>
        {/* <Route exact path='/orders/:contact'>
          <AllBuyOrders />
        </Route> */}
        <Route exact path='/ordersuccess'>
          <OrderSuccess />
        </Route>
        <Route exact path='/buys/:id'>
          <BuyPage />
        </Route>
        <Route exact path='/createbuy'>
          <BuyForm />
        </Route>
        <Route exact path='/additems'>
          <BuyItems />
        </Route>
        <Route exact path='/hostedbuys'>
          <AllHostedBuys />
        </Route>
        <Route exact path='/hostedbuys/:id'>
          <OneHostedBuy />
        </Route>
      </Router>
    </>
  );
}

export default App;
