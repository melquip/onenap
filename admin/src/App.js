import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './App.css';
// Styles
// CoreUI Icons Set
import '@coreui/icons/css/coreui-icons.min.css';
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.css'
// Containers
import {Layout} from './containers';
// Pages
import {Login, Page404, Page500, Register} from './views/Pages';

// import { renderRoutes } from 'react-router-config';

class App extends Component {
	render() {
		return (
			<BrowserRouter>{/*<!-- HashRouter -->*/}
				<Switch>
					<Route exact path="/admin/login" name="Login Page" component={Login}/>
					<Route exact path="/admin/register" name="Register Page" component={Register}/>
					<Route exact path="/admin/404" name="Page 404" component={Page404}/>
					<Route exact path="/admin/500" name="Page 500" component={Page500}/>
					<Route path="/admin" name="Home" component={Layout}/>
				</Switch>
			</BrowserRouter>
		);
	}
}

export default App;
