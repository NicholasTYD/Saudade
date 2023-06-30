import React from 'react';
import MPageUser from './MPageUser';
import MPageVisitor from './MPageVisitor';
import { userIsLoggedIn } from '../Misc/Helpers';

function MainPage() {
    return userIsLoggedIn() ? <MPageUser /> : <MPageVisitor />;
}

export default MainPage;