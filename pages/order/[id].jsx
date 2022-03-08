import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import styles from '../../styles/Order.module.css'
const Order = ({ order }) => {
    const status = order.status;
    const statusClass = (id) => {
        if (id - status < 1) return styles.done;
        if (id - status === 1) return styles.inProgress;
        if (id - status > 1) return styles.undone;
    }
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Order Id</th>
                            <th>Customer</th>
                            <th>Address</th>
                            <th>Total</th>
                        </tr>
                    </tbody>
                    <tbody>

                    <tr className={styles.trData}>
                        <td>
                            <p className={styles.id}>{order._id}</p>
                        </td>
                        <td>
                            <p className={styles.name}>{order.customer}</p>
                        </td>
                        <td>
                            <p className={styles.address}>{order.address}</p>
                        </td>
                        <td>
                            <p className={styles.total}>Rs {order.total}</p>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={styles.statusRow}>
                    <div className={statusClass(0)}>
                        <Image src="/img/paid.png" alt="" width={40} height={40} />
                        <span>Payment</span>
                        <div className={styles.statusIcon}>
                            <Image src="/img/checked.png" alt="" width={20}
                                height={20} />
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <Image src="/img/bake.png" alt="" width={40} height={40} />
                        <span>Preparing</span>
                        <div className={styles.statusIcon}>
                            <Image src="/img/checked.png" alt="" width={20}
                                height={20} />
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src="/img/bike.png" alt="" width={40} height={40} />
                        <span>On the Way</span>
                        <div className={styles.statusIcon}>
                            <Image src="/img/checked.png" alt="" width={20}
                                height={20} />
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src="/img/delivered.png" alt="" width={40} height={40} />
                        <span>Delivered</span>
                        <div className={styles.statusIcon}>
                            <Image src="/img/checked.png" alt="" width={20}
                                height={20} />
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h3 className={styles.cartTotal}>Cart Total</h3>
                    <p className={styles.totalInfo}><strong>Subtotal : </strong>RS {order.total} </p>
                    <p className={styles.totalInfo}><strong>Discount : </strong>RS 0 </p>
                    <p className={styles.totalInfo}><strong>Total : </strong>RS {order.total}</p>
                    <button className={styles.checkout}>PAID</button>
                </div>
            </div>
        </div>
    );
};

export default Order;

export const getServerSideProps = async ({ params }) => {
    const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
    return {
        props: {
            order: res.data,
        }
    }
}
