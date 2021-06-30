import React from 'react';
import { Route, Switch, Link, useParams} from 'react-router-dom'
import PropTypes from 'prop-types';
import Genre from './Pages/Genre/Genre'
import Home from './Pages/Home/Home';
import Book from './Pages/Book/Book'

Router.propTypes = {
    
};

function Router(props) {
    return (
        <Switch>
            <Route path={`/the-loai/:category`} exact>
                <Genre/>
            </Route>
            <Route path={'/doc-truyen/:name'} exact>
                <Book/>
            </Route>
            <Route path='/' >
                <Home/>
            </Route>
        </Switch>
    );
}

export default Router;