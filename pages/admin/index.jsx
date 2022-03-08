import axios from 'axios';

import Image from 'next/image';
import React, { useState } from 'react';
import styles from '../../styles/Admin.module.css';
const Admin = ({ products, orders }) => {
    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["Preparing", "On The Way", "Delivered"];
    const handleDelete = async (id) => {
        try {
            //  await axios.delete(
            //     "http://localhost:3000/api/products/" + id
            //   );
        } catch (error) {
            console.log(error);
        }
        setPizzaList(pizzaList.filter(pizza => pizza._id !== id))
    }
    const handleStatus=async(id)=>{
        const item=orderList.filter(order=>order._id===id)[0];
        let currentStatus=item.status;
        try {
           currentStatus>=2 ? currentStatus=-1 : currentStatus
                
            const res=await axios.put("http://localhost:3000/api/orders/" + id,{status:currentStatus + 1})
            setOrderList(
                [
                    res.data,
                    ...orderList.filter((order) => order._id !== id),
                ]  
            )
        } catch (error) {
            res.status(500).json(error)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <h2 className={styles.title}>
                    Products
                </h2>
                <table className={styles.table}>
                    <tbody>
                        <tr>
                            <th>Image</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {pizzaList.map(product => (
                        <tbody key={product._id}>
                            <tr className={styles.trData}>
                                <td>
                                    <Image src={product.img} width={50} height={50} objectFit='cover' alt={product.title} />
                                </td>
                                <td>{product._id}</td>
                                <td>{product.title}</td>
                                <td>Rs {product.prices[0]}</td>
                                <td className={styles.buttons}>
                                    <div className={styles.button}>
                                        Edit
                                    </div>
                                    <div className={styles.button} onClick={() => handleDelete(product._id)}>
                                        Delete
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    ))}

                </table>
            </div>
            <div className={styles.right}>
                <h2 className={styles.title}>
                    Orders
                </h2>
                <div className={styles.wrapper}>

                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </tbody>
                        {orderList.map(order => (
                            <tbody className={styles.tbody} key={order._id}>
                                <tr className={styles.trData}>
                                    <td>{order._id}</td>
                                    <td>{order.customer}</td>
                                    <td>Rs {order.total}</td>
                                    <td>{order.method === 1 ? (<span>Paid</span>) : (<span>Cash</span>)}</td>
                                    <td>{ status[order.status]}</td>
                                    {/* <td>{order.status<3 ? status[order.status] : 'Preparing'}</td> */}
                                    <td>
                                        <button onClick={()=>handleStatus(order._id)} >Next Stage</button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps = async (ctx) => {
    const myCookies =ctx.req?.cookies || ""

    if(myCookies.token!==process.env.token){
        return{
            redirect:{
                destination:'/login',
                permanent: false,
            }
        }
    }
    const productRes = await axios.get("http://localhost:3000/api/products/");
    const orderRes = await axios.get("http://localhost:3000/api/orders/");
    return {
        props: {
            products: productRes.data,
            orders: orderRes.data,
        }
    }

}

export default Admin;
