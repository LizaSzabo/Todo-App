import React from 'react';
import './App.css';
import TodoList from './Pages/page1';
import ColumnView from './Pages/page2';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';


function App() {
    return (

        <Switch>
            <Route exact path="/" component={TodoList} />
            <Route path="/page1" component={TodoList} />
            <Route path="/page2" component={ColumnView} />
        </Switch>

    );
}

export default App;
