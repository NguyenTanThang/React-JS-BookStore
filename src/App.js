import 'antd/dist/antd.css';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/home/Home';
import BrowsePage from './pages/browse/BrowsePage';
import BookDetailsPage from './pages/book-details/BookDetailsPage';
import Layout from './components/Partials/Layout';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderDetailsPage from './pages/order-details/OrderDetailsPage';
import ProfilePage from './pages/profile/ProfilePage';
import SignUpPage from './pages/authentication/SignUpPage';
import SignInPage from './pages/authentication/SignInPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/books/:bookID" component={BookDetailsPage}/>
            <Route path="/browse" component={BrowsePage}/>
            <Route path="/cart" component={CartPage}/>
            <Route path="/checkout" component={CheckoutPage}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/signup" component={SignUpPage}/>
            <Route path="/signin" component={SignInPage}/>
            <Route path="/order-details/:orderID" component={OrderDetailsPage}/>
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
