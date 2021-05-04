import React from 'react';
import {
    Container,
} from '@material-ui/core';

import Articles from './components/Articles/Articles';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import Styles from './styles';

const App = () => {
    const classes = Styles();

    return (
        <Container maxWidth="xl">
            <NavBar />
        </Container>
    );
}

export default App;