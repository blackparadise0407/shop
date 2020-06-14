import React, { useState } from "react";
import { Form, Input, FormGroup } from 'reactstrap';
import styles from './Hero.module.css';

import { search } from '../../utils/search';
import { ClipSpinner } from '../../utils/Loader';

import Searchbox from './Searchbox';

const Hero = () => {
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);
    const [isErr, setIsErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = async (value) => {
        setIsErr(false);
        setIsLoading(true);
        const searchURL = `/api/products/search?q=${value}`;
        try {
            if (value !== "") {
                const res = await search(searchURL);
                setData(res);
                setIsLoading(false);
            } else {
            }
        } catch (error) {
            setIsErr(true);
        }
    };
    const handleOnChange = (e) => {
        fetchData(e.target.value);
        setValue(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(value);
    }

    const clearQuery = () => {
        if (value) setValue("");
    }

    const RenderSearch = () => {
        if (!value) {
            setIsLoading(false)
            return <div></div>
        }
        else return (
            <ul className={styles.ul}>
                {data ? data.map(datum => <Searchbox key={datum._id} _id={datum._id} name={datum.name} />) : null}
            </ul>
        )
    }

    if (isErr) return (<div>An loz</div>);
    return (
        <section className={styles.hero}>
            <div className="container">
                <h2 className={styles.subHeadline}>
                    Jorlux
                </h2>
                <h1 className={styles.headline}>Living your dream</h1>
                <div className={styles.headlineDescription}>
                    <h5>Stylish, modern, trendy</h5>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className={styles.formContainer}>
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
                            {isLoading ? <ClipSpinner /> : null}
                        </FormGroup>
                    </Form>
                    <RenderSearch />
                </div>
            </div>
        </section>
    );
};

export default Hero;
