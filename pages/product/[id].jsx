import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';
import styles from '../../styles/Product.module.css';
const Product = ({pizza}) => {
    const dispath=useDispatch();
    const [price, setPrice] = useState(pizza.prices[0]);
    const [size, setSize] = useState(0);
    const [extras, setExtras] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const changePrice=(number)=>{
        setPrice(price + number);
    }
    const handleSize=(sizeIndex)=>{
        const diff=pizza.prices[sizeIndex]-pizza.prices[size];
        setSize(sizeIndex)
        changePrice(diff)
    }
    const handleChange=(e,option)=>{
        const checked=e.target.checked;
        if(checked){
            changePrice(option.price)
            setExtras(prev=>[...prev,option])
        }
        else{
            changePrice(-option.price)
            setExtras(extras.filter(extra=>extra._id!==option._id))
        } 
    }

    const handleClick=()=>{
        dispath(addProduct({...pizza,extras,price,quantity}))
    }
    
  return (
        <div className={styles.container}>
            <div className={styles.left}>
                    <div className={styles.imgContainer}>
                        <Image src={pizza.img} alt={pizza.title} objectFit='contain' layout='fill' priority />
                    </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>
                    {pizza.title}
                </h1>
                <span className={styles.price}>Rs {price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <p className={styles.choose}>Choose the Size</p>
                <div className={styles.selectSize}>
                    <div className={styles.size} onClick={()=>handleSize(0)} >
                        <Image src='/img/size.png' alt="" layout='fill' />
                        <span className={styles.sizeLabel}>
                            Small
                        </span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(1)} >
                        <Image src='/img/size.png' alt="" layout='fill' />
                        <span className={styles.sizeLabel}>
                            Medium
                        </span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(2)} >
                        <Image src='/img/size.png' alt="" layout='fill' />
                        <span className={styles.sizeLabel}>
                            Large
                        </span>
                    </div>
                </div>
                <div className={styles.chooseIng}>
                    <h3 className={styles.ingTitle}>Choose Ingredients Title</h3>
                    <div className={styles.selectIng}>
                        {pizza.extraOptions.map(option=>(

                        <div key={option._id} className={styles.ingredients}>
                            <input 
                            type="checkbox"
                            id={option.text}
                            name={option.text}
                            className={styles.checkbok}
                            onChange={(e)=>handleChange(e, option)}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                        </div>
                        ))}
                    </div>
                </div>
                <div className={styles.amount}>
                    <input type="number" onChange={(e)=>setQuantity(e.target.value)} value={quantity} className={styles.quantity} />
                    <button className={styles.addCart} onClick={handleClick}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Product;
export const getServerSideProps=async({params})=>{
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return{
      props:{
        pizza:res.data,
      }
    }
  }