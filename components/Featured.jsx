import React, { useState } from 'react';
import styles from '../styles/Featured.module.css'
import Image from 'next/image';


const Featured = () => {
    const [index, setIndex] = useState(0);
    const handleArrow=(direction)=>{
        if(direction==='l'){
            setIndex(index!==0? index-1 : 2)
        }
        else{
            setIndex(index!==2? index+1 : 0)
        }
    }
    const images = [
        "/img/bike.png",
        "/img/bake.png",
        "/img/delivered.png",
    ];
    return (
        <div className={styles.container}>
            <div className={styles.arrowContainer} style={{left:0}} onClick={()=>handleArrow("l")}>
                <Image src='/img/arrowl.png' layout='fill' position="absolute" objectFit='contain' />
            </div>
            <div className={styles.wrapper}>
                {images.map((img,i)=>(
                     <div key={i} className={styles.imgContainer} style={{transform:`translateX(${-100*index}vw)`}} >
                        <Image src={img} alt ="" layout='fill' objectFit='contain'/>
                     </div>
                ))}
               
            </div>
            <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleArrow("r")}>
                <Image src='/img/arrowr.png' layout='fill' position="absolute" objectFit='contain' />
            </div>
        </div>
    );
};

export default Featured;
