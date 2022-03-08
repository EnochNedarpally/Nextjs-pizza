import React from 'react';
import styles from '../styles/Navbar.module.css'
import Image from 'next/image';
import {useSelector} from 'react-redux';
import Link from 'next/link'
const Navbar = () => {
    const quantity=useSelector(state=>state.cart.cartQuantity)
    return (
        <>
            <div className={styles.container}>
                <div className={styles.item}>
                    <div className={styles.callButton}>
                        <Image src='/img/telephone.png' width='32px' height='32px' />
                    </div>
                    <div className={styles.texts}>
                        <div className={styles.text}>
                            Order Now!
                        </div>
                        <div className={styles.text}>
                            +91 9876543210
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <ul className={styles.list}>
                        <Link href={"/"} passHref>
                        <li className={styles.listItems}>Home</li>
                        </Link>
                        <li className={styles.listItems}>Product</li>
                        <li className={styles.listItems}>Menu</li>
                        <div className={styles.logo}>Pizza .</div>
                        <li className={styles.listItems}>Events</li>
                        <li className={styles.listItems}>Blog </li>
                        <li className={styles.listItems}>Contact</li>
                    </ul>
                </div>
                <div className={styles.item}>
                    <Link href="/cart" passHref>
                    <div className={styles.cart}>
                        <Image src="/img/cart.png" alt="" width='32' height='32' />
                        <span className={styles.cartNo}>{quantity}</span>
                    </div>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Navbar;
