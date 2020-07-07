import React from 'react';
import { connect } from 'react-redux';
import styles from './Dashboard.module.css';
import { Switch, Route, Link } from 'react-router-dom';
import FormikForm from './ProfileEdit';
import Profile from './Profile';

const Dashboard = ({
    user
}) => {
    return (
        <>
            {user &&
                <div className={styles.container}>
                    <div className={styles.navBar}>
                        <div className={styles.sideUserContainer}>
                            <img src="avatar" alt={user.firstName} />
                            <div className={styles.nameContainer}>
                                Welcome, {user.firstName}
                            </div>
                        </div>
                        <ul className={styles.navList}>
                            <Link className={styles.navItem} to="/user/dashboard"><div className={styles.navLink}>Profile</div></Link>
                            <Link className={styles.navItem} to="/user/dashboard/edit" ><div className={styles.navLink}>Edit</div></Link>
                            <Link className={styles.navItem} to="/user/dashboard/example"><div className={styles.navLink}>Example</div></Link>
                        </ul>
                    </div>
                    <div className={styles.userContainer}>
                        <Switch>
                            <Route path="/user/dashboard" exact render={() => <Profile firstName={user.firstName} />} />
                            <Route path="/user/dashboard/edit" exact render={() => <FormikForm confirm={user.confirm} />} />
                        </Switch>
                    </div>



                </div>
            }
        </>
    );
}


export default connect(
    state => ({
        user: state.auth.user
    }),
    null
)(Dashboard);
