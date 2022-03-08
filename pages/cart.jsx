import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles/Cart.module.css';
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from 'axios';
import { reset } from '../redux/cartSlice';
import OrderDetail from '../components/OrderDetail';

const Cart = () => {
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const router=useRouter()
    const currency = "USD";
    const style = { "layout": "vertical" };
    const cart = useSelector(state => state.cart);
    const dispatch=useDispatch();
    const  tempamount=cart.total/70
    const amount =tempamount.toFixed(2);

    const createOrder = async (data) => {
        try {
          const res = await axios.post("http://localhost:3000/api/orders", data);
           res.status === 201 &&  router.push(`/order/${res.data._id}`);
           dispatch(reset());
           
          
        } catch (err) {
          console.log(err);
        }
      };

    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        // Your code here after capture the order
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                          customer: shipping.name.full_name,
                          address: shipping.address.address_line_1,
                          total: cart.total,
                          method: 1,
                        });
                    });
                }}
            />
        </>
        );
    }


    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>

                        <tr className={styles.trTitle}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </tbody>
                    <tbody>

                        {cart.products.map(product => (
                            <tr key={product._id} className={styles.trData} >
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image src="/img/pizza.png" alt="" layout="fill" />
                                    </div>
                                </td>
                                <td>
                                    <p className={styles.pizzaName}>{product.title}</p>
                                </td>
                                <td>
                                    <p className={styles.extras}>
                                        {product.extras.map(extra => (
                                            <span key={extra._id} >{extra.text}</span>
                                        ))}
                                    </p>
                                </td>
                                <td>
                                    <p className={styles.price}>{product.price}</p>
                                </td>
                                <td>
                                    <p className={styles.quantity}>{product.quantity}</p>
                                </td>
                                <td>
                                    <p className={styles.total}>Rs {product.price * product.quantity}</p>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h3 className={styles.cartTotal}>Cart Total</h3>
                    <p className={styles.totalInfo}><strong>Subtotal : </strong>Rs {cart.total} </p>
                    <p className={styles.totalInfo}><strong>Discount : </strong>RS 0 </p>
                    <p className={styles.totalInfo}><strong>Total : </strong>RS {cart.total}</p>
                    {open ?
                        (
                            <div className="paymentMethod">
                                <button className={styles.cod} onClick={()=>setCash(true)}>Cash on Delivery</button>
                                <PayPalScriptProvider
                                    options={{
                                        "client-id": "test",
                                        components: "buttons",
                                        currency: "USD",
                                        "disable-funding": "credit,card,p24"
                                    }}
                                >
                                    <ButtonWrapper
                                        currency={currency}
                                        showSpinner={false}
                                    />
                                </PayPalScriptProvider>
                            </div>
                        ) :
                        <button onClick={() => setOpen(true)} className={styles.checkout}>Checkout</button>
                    }

                </div>
            </div>
            {cash && <OrderDetail total={cart.total} createOrder={createOrder} />}
        </div>
    );
};

export default Cart;
