import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import axios from 'axios';
import AddButton from '../components/AddButton';
import { useState } from 'react';
import AddPizza from '../components/AddPizza';
// import styles from '../styles/Home.module.css'

export default function Home({pizzaList,admin}) {
  const [close, setClose] = useState(false);
  console.log(close);
  return (
    <>
      <Head>
        <title>Pizza Ordering App</title>
        <meta name="description" content="Get Pizza Delivered at your doorstep" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured/>
      {admin && <AddButton setClose={setClose}/>}
      <PizzaList pizzaList={pizzaList} />
      {!close && <AddPizza/> }
    </>
  )
}

export const getServerSideProps=async(ctx)=>{
  const myCookie = ctx.req?.cookies || "";
  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  const res = await axios.get("http://localhost:3000/api/products");
  return{
    props:{
      pizzaList:res.data,
      admin
    }
  }
}
