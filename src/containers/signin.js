import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import {signUp, logIn} from '../entities/auth/actions';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.logIn = this.logIn.bind(this);
        this.signUp = this.signUp.bind(this);

        this.state = {
            registration: { username: '', password: '', email: '' },
            login: { username: '', password: '' },
        };
    }

    signUp() {
        this.props.dispatch(signUp(this.state.registration, this.props.handleLogin));
    }

    logIn() {
        this.props.dispatch(logIn(this.state.login, this.props.handleLogin));
    }

    render() {
        const {registration, login} = this.state;

        return (
            <div className="sign-in">
                <h1>Glimpse</h1>

                <form id="login-form" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <input type="username" value={login.username} placeholder="Enter username" onChange={e => this.setState({login: {...login, username: e.target.value}})}/>
                    <input type="password" value={login.password} placeholder="Enter password" onChange={e => this.setState({login: {...login, password: e.target.value}})}/>
                    <button onClick={this.logIn}>Log in</button>
                </form>
                <br />
                <br />
                <form id="registration-form" onSubmit={(e) => {
                    e.preventDefault();
                }}>
                    <input type="text" value={registration.username} placeholder="Enter user name" onChange={e => this.setState({registration: {...registration, username: e.target.value}})}/>
                    <input type="password" value={registration.password} placeholder="Enter password" onChange={e => this.setState({registration: {...registration, password: e.target.value}})}/>
                    <input type="email" value={registration.email} placeholder="Enter email" onChange={e => this.setState({registration: {...registration, email: e.target.value}})}/>
                    <button onClick={this.signUp}>Sign up</button>
                </form>
            </div>
        );
    }
}

SignIn.propTypes = {
    dispatch: PropTypes.func,
    handleLogin: PropTypes.func,
};

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps)(SignIn);
