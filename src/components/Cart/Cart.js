import { useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CheckOut from './CheckOut';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { placeOrder } from '../../store/cart-actions';

const Cart = (props) => {
  
  const [checkoutForm,setCheckoutForm] = useState(false);

  const [hasErrorSubmitting, setHasErrorSubmitting] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const dispatch = useDispatch();

  const cartItemsList = useSelector(state=>state.cart.items);
  const totalAmount = useSelector(state=>state.cart.totalAmount);
  const cartQuantity = useSelector(state=>state.cart.totalQuantity);

  const cartItemRemoveHandler = (id) => {
        dispatch(cartActions.removeItem(id));
  };

  const cartItemAddHandler = (item) => {
        const updatedItem = {
          ...item,
          amount:1
        }
        dispatch(cartActions.addItem(updatedItem))
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartItemsList.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const checkout = async userData =>{
    setIsSubmitting(true);
    try{
      const response = dispatch(placeOrder(userData,cartItemsList));
      if(response){
        setIsSubmitting(false);
        setDidSubmit(true)
      }else{
        throw new Error();
      }
    }catch(error){
      setIsSubmitting(false);
      setHasErrorSubmitting(true);
    }
  }

  const wholeCartModalContent = <>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${totalAmount}</span>
      </div>
      {checkoutForm ? <CheckOut onCancel={props.onClose} onCheckout={checkout}/>:
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {cartQuantity>0 && <button onClick={()=>setCheckoutForm(true)} className={classes.button}>Proceed to CheckOut</button>}
      </div>
      }
  </> 

  const submitSuccessful = <>
  <p>Order Placed Successfully. Thank You...</p>
  <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
  </div>
  </>
  const errorSubmitting = <p>Something Went Wrong. Please Try Again...</p>;
  const submittingInProgress = <p>Placing your Order. Please wait...</p>;

  return (
    <Modal onClose={props.onClose}>
      {isSubmitting && submittingInProgress}
      {didSubmit &&!isSubmitting && submitSuccessful}
      {hasErrorSubmitting && !isSubmitting && errorSubmitting}
      {!isSubmitting && !didSubmit && !hasErrorSubmitting && wholeCartModalContent}
    </Modal>
  );
};

export default Cart;
