import React from 'react';
import styles from '../styles/AddButton.module.css'
const AddButton = ({setClose}) => {
  return(
    <div className={styles.container} onClick={()=>setClose(false)}>
            Add New Pizza
    </div>
  );
};

export default AddButton;
