import React from 'react';
import { signin, ACCESS_TOKEN } from '../ApiMethods/Account';
import { connect } from 'react-redux';

const Login =(props)=> {
    return(
        <div>
            <form onSubmit={(e)=>{
                e.preventDefault();
                const signupRequestObject = {
                    usernameOrEmail: e.target.elements.username.value,
                    password: e.target.elements.password.value
                };
                signin(signupRequestObject)
                .then(response => {
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    props.handleLogOn();
                    props.history.push('/');
                });
            }} >
                {props.User.isAuthenticated && <p>{props.history.push('/')}</p>}
                <label >Username or Email:</label>
                <input type = "text" name = "username" onChange = {this.UserNameChange} required/>
                <label >Password:</label>
                <input type = "password" name = "password" onChange = {this.PasswordChange} required/>
                <button className= "button">Login Submit</button>
            </form>
        </div>
    );

}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(Login);