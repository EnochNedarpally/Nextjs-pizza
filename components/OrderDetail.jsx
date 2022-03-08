import React, { useState } from 'react';
import styles from '../styles/OrderDetail.module.css'
const OrderDetail = ({total,createOrder}) => {
    console.log(total);
    const [name, setName] = useState();
    const [phoneno, setPhoneno] = useState();
    const [address, setAddress] = useState();

    const handleClick=()=>{
        createOrder({customer:name,address,total,method:0})
    }
    
  return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>
                    Pay Rs 609 at delivery
                </h2>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.name}>
                        Name
                    </label>
                   <input  className={styles.input} type="text" name="name" placeholder='Enter you Name' onChange={(e)=>setName(e.target.value)} />
                 </div>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.name}>
                        Phone No
                    </label>
                   <input  className={styles.input} type="text" name="phone" placeholder='Enter you Phone No' onChange={(e)=>setPhoneno(e.target.value)}  />
                </div>
                <div className={styles.item}>
                    <label htmlFor="" className={styles.name}>
                        Address
                    </label>
                   <textarea  className={styles.input} name="address" rows={4} placeholder='Enter you address' onChange={(e)=>setAddress(e.target.value)}  />
                </div>
                <button className={styles.order} onClick={handleClick} >Order</button>
            </div>
        </div>
    );
};

export default OrderDetail;
