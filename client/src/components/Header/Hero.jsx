import React, { useState } from "react";
import { Form, Input, FormGroup } from 'reactstrap';
import styles from './Hero.module.css';

const Hero = () => {
    const [value, setValue] = useState('');
    const handleOnChange = (e) => {
        setValue(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(value);
    }

    const clearQuery = () => {
        if (value) setValue("");
    }

    return (
        <section className={styles.hero}>
            <div className="container">
                <h2 className={styles.subHeadline}>
                    Jorlux
                </h2>
                <h1 className={styles.headline}>Slogan here</h1>
                <div className={styles.headlineDescription}>
                    <h5>Stylish, modern, trendy</h5>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                className={styles.input}
                                value={value}
                                onChange={e => handleOnChange(e)}
                                placeholder="Search everything"
                            ></Input>
                            {value ? <i className={`${styles.faTimes} fas fa-times`} onClick={clearQuery}></i> : <i className={`${styles.faSearch} fas fa-search`}></i>}
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </section>
    );
};

export default Hero;
