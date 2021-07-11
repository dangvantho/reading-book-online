import React, { lazy, Suspense} from "react";
import { Route, Switch, Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Circular from "./components/Circular";
const Home = lazy(() => import("./Pages/Home/Home"));
const Genre= lazy(()=>import('./Pages/Genre/Genre'))
const Book= lazy(()=>import('./Pages/Book/Book'))
// import Home from "./Pages/Home/Home";
// import Genre from "./Pages/Genre/Genre";
// import Book from "./Pages/Book/Book";

Router.propTypes = {};

function Router(props) {
  return (
    <Suspense fallback={<Circular/>}>
      <Switch>
        <Route path={`/the-loai/:category`} exact>
          <Genre />
        </Route>
        <Route path={"/doc-truyen/:name/:chapter"} exact>
          <Book />
        </Route>
        <Route path={"/doc-truyen/:name"} exact>
          <Book />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default Router;
