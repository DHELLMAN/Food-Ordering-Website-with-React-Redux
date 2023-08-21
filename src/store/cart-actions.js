import { cartActions } from "./cart-slice";

export const fetchCartData = ()=>{
    return (dispatch)=>{
        const getData = async()=>{
            const response = await fetch('https://react-http-e7949-default-rtdb.firebaseio.com/cart.json');

            if(!response.ok){
                throw new Error('Error while fetching previously added items. Please Try Again...');
            }
            const data = await response.json();
            dispatch(cartActions.replaceCart({
                items: data.items || [],
                totalAmount: data.totalAmount,
                totalQuantity: data.totalQuantity
            }))
        };

        getData().catch(error=>{
            console.log(error.message);
        })
    }
}

export const sendCartData = (cart)=>{
    return ()=>{
        const sendData = async(cart)=>{
            const response = await fetch('https://react-http-e7949-default-rtdb.firebaseio.com/cart.json',{
                method:'PUT',
                headers: {
                    'content-type':'application/json'
                },
                body:JSON.stringify(cart)
            })
            if(!response.ok){
                throw new Error('Something Went Wrong in Saving Cart Details. Please Try Again.');
            }
        };

        sendData(cart).catch(error=>{
            console.log(error.message);
        })
    }
}

export const placeOrder = (userData,cartItemsList)=>{
    return async(dispatch)=>{
        const response = await fetch('https://react-http-e7949-default-rtdb.firebaseio.com/orders.json',{
        method:'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            user: userData,
            orderItems: cartItemsList
        })
        });
        if(response.ok){
        dispatch(cartActions.emptyCart());
        return true;
        }else{
        return false;
        }
}
}