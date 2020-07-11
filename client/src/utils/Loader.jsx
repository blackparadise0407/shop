import React from 'react';
import { css } from "@emotion/core";
import { ClipLoader, SyncLoader, PropagateLoader } from "react-spinners";
import styles from './Loader.module.css';
const override = css`
`;

export const ClipSpinner = ({ className }) => {
    return (
        <div className={className}>
            <ClipLoader
                css={override}
                size={25}
                color={"#999"}
            />
        </div>
    );
}

export const SyncSpinner = () => {
    return (
        <div className={styles.SyncSpinner}>
            <SyncLoader
                css={override}
                size={5}
                color={"#999"}
            />
        </div>
    );
}

export const PropagateSpinner = () => {
    return (
        <div className={styles.PropagateSpinner}>
            <PropagateLoader
                css={override}
                size={15}
                color={"#121212"}
            />
        </div>
    );
}






