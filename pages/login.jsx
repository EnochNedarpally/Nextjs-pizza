import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../styles/Login.module.css'
const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);
    const router=useRouter();

    const handleClick=async()=>{
        try {
            await axios.post("http://localhost:3000/api/login",{username,password});
            setError(false);
            router.push("/admin")
        } catch (error) {
            setError(true)
        }
    }
  return (
        <div className={styles.container}>
                <div className={styles.wrapper}>
                    <input type="text" className={styles.input} onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
                    <input type="password" className={styles.input} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
                    <button className={styles.button} onClick={handleClick}>
                        Login
                    </button>
                    {error && <span className={styles.error} >Wrong Credentials</span> }
                </div>
        </div>
    )
};

export default Login;
