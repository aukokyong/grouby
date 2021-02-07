import { Route, BrowserRouter as Router, useParams } from 'react-router-dom'

import Login from './components/Login'

function App() {
  return (
    <>

      <Router>
        <Route exact path='/'>
          <h1>Landing Page</h1>
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/buyer'>
          <h1>Buyer Nav</h1>
        </Route>
        <Route exact path='/enterbuy'>
          <h1>Enter Buy ID</h1>
        </Route>
        <Route exact path='/checkorders'>
          <h1>Enter Mobile Number</h1>
        </Route>
        <Route exact path='/orders'>
          <h1>All Buy Orders</h1>
        </Route>
        <Route exact path='/buys/:id'>
          <h1>View 1 Buy</h1>
        </Route>
        <Route exact path='/createbuy'>
          <h1>Create Buy</h1>
        </Route>
        <Route exact path='/hostedbuys'>
          <h1>All Hosted Buys</h1>
        </Route>
        <Route exact path='/hostedbuys/:id'>
          <h1>One Hosted Buy</h1>
        </Route>
      </Router>
    </>
  );
}

export default App;
