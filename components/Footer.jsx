import Image from 'next/image';
import React from 'react';
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit='cover' alt='' layout='fill' priority />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            BEST BAKED PIZZA IN TOWN!
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> Pune, 411001
            <br /> (602) 867-1010
          </p>
          <p className={styles.text}>
            2356 K. Laquie Rd #235.
            <br /> Pune, 411031
            <br /> (602) 867-1011
          </p>
          <p className={styles.text}>
            1614 E. Erwin St #104.
            <br /> Pune, 411048
            <br /> (602) 867-1012
          </p>
          <p className={styles.text}>
            1614 W. Caroll St #125.
            <br /> Pune, 411010
            <br /> (602) 867-1013
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br /> 9:00AM – 10:00PM
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 10:00AM – 11:00PM
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
