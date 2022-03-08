import React from 'react';
import styles from '../styles/AddPizza.module.css'
const AddPizza = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h2 className="title">Add a New Pizza</h2>
                <div className={styles.item}>
                    <label className={styles.label}>
                        Choose an Image
                    </label>
                    <input type="file" className={styles.inputs} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>
                        Title
                    </label>
                    <input type="text" className={styles.inputs} placeholder="Title" />
                </div>

                <div className={styles.item}>
                    <label className={styles.label}>
                        Description
                    </label>
                    <textarea type="text" className={styles.inputs} placeholder="Description" />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>
                        Prices
                    </label>
                    <div className={priceOptions}>
                        <input type="number" className={styles.priceOption} /><input type="number" className={styles.priceOption} /><input type="number" className={styles.priceOption} />
                    </div>
                    <input type="text" className={styles.inputs} placeholder="Description" />
                </div>

            </div>
        </div>
    );
};

export default AddPizza;
