import { useEffect, useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartData, sendCartData } from './store/cart-actions';

let initial = true;

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const cart = useSelector(state=>state.cart);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCartData());
  },[dispatch]);

  useEffect(()=>{
    if(initial){
      initial = false;
      return;
    }
    dispatch(sendCartData(cart))
  },[cart,dispatch]);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
