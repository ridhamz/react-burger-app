import React from 'react';

import Logo from '../../logo/logo';
import NavigationItems from '../navigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../ui/backdrop/backdrop';
import Aux from '../../../hoc/aux';

const SideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    );
};

export default SideDrawer;