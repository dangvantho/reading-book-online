import React from 'react';
import { Route, Switch, Link, useParams} from 'react-router-dom'
import PropTypes from 'prop-types';
import Genre from './Pages/Genre/Genre'
import Home from './Pages/Home/Home';


Router.propTypes = {
    
};

function Router(props) {
    return (
        <Switch>
            <Route path={`/the-loai/:category`} exact>
                <Genre/>
            </Route>
            <Route path='/' >
                <Home/>
            </Route>
        </Switch>
    );
}

export default Router;