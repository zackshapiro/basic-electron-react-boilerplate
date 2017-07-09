// import React, { Component } from 'react';

// class App extends React.Component {
//     render() {
//         return ( <
//             div >
//             <
//             h1 > Hello, Electron! < /h1> <
//             p > I hope you enjoy using basic - electron - react - boilerplate to start your dev off right! < /p> {
//                 process.env.NODE_ENV
//             } <
//             /div>
//         );
//     }
// }

// export default App;

import '../assets/css/App.css';

import React, { Component } from 'react';

import { userIsSignedIn } from '../cookie_monster.js';

import SignIn from '../containers/signin';
import Home from '../containers/home';

class Application extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            loggedIn: userIsSignedIn(),
        };
    }

    handleLogin() {
        this.setState({ loggedIn: true });
    }

    render() {
        return (<div> 
        {
            this.state.loggedIn
            ? <Home />
            : <SignIn handleLogin = { this.handleLogin } />
        } </div>);
    }
}

export default Application;
