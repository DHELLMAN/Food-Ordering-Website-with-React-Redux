import React, { useRef, useState } from 'react'
import classes from './CheckOut.module.css';

const CheckOut = (props) => {

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const cityInputRef = useRef();
    const postalInputRef = useRef();

    const [formInputValidity,setFormInputValidity] = useState({
        name:true,
        street:true,
        city:true,
        postal:true
    });

    const isEmpty = value => value.trim()==='';
    const isSixChar = value => value.length===6;

    const validate = () =>{
        const enteredNameValidity = !isEmpty(nameInputRef.current.value);
        const enteredStreetValidity = !isEmpty(streetInputRef.current.value);
        const enteredCityValidity = !isEmpty(cityInputRef.current.value);
        const enteredPostalCodeValidity = isSixChar(postalInputRef.current.value);

        setFormInputValidity({
            name: enteredNameValidity,
            city: enteredCityValidity,
            street: enteredStreetValidity,
            postal: enteredPostalCodeValidity
        })

        const formValidity = enteredNameValidity && enteredCityValidity && enteredStreetValidity && enteredPostalCodeValidity;

        if(!formValidity){
            return false;
        }else{
            return true;
        }

    }

    const inputClasses = {
        name: formInputValidity.name ? classes.control : `${classes.invalid} ${classes.control}`,
        city: formInputValidity.city ? classes.control : `${classes.invalid} ${classes.control}`,
        street: formInputValidity.street ? classes.control : `${classes.invalid} ${classes.control}`,
        postal: formInputValidity.postal ? classes.control :`${classes.invalid} ${classes.control}`
    }

    const submitHandler = async (event)=>{
        event.preventDefault();
        const data = validate();
        if(data){
            const userData = {
                name: nameInputRef.current.value,
                city: cityInputRef.current.value,
                street: streetInputRef.current.value,
                postal: postalInputRef.current.value
            }
            props.onCheckout(userData);
        }
    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={inputClasses.name}>
                <label htmlFor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name'/>
            </div>
            {!formInputValidity.name && <p>Please Enter A Valid Name...</p>}
            <div className={inputClasses.street}>
                <label htmlFor='street'>Street</label>
                <input ref={streetInputRef} type='text' id='street'/>
            </div>
            {!formInputValidity.street && <p>Please Enter A Valid Street Address...</p>}
            <div className={inputClasses.city}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city'/>
            </div>
            {!formInputValidity.city && <p>Please Enter A Valid City Name...</p>}
            <div className={inputClasses.postal}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalInputRef} type='text' id='postal'/>
            </div>
            {!formInputValidity.postal && <p>Please Enter A Valid Postal Code...</p>}
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Place Order</button>
            </div>
        </form>
    )
}

export default CheckOut