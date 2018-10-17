import React from 'react';
import { signin, ACCESS_TOKEN } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import styled from 'styled-components';
const Login_Input = styled.input`
margin: 2px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing: border-box;
`
const Login_Label_Td = styled.td`
text-align: center ;
`

const Login_Button = styled.button`
background: #4a8aba;
border: none;
padding: 2px 2px;
border-radius: 3px;
text-align: center;
text-decoration: none;
display: inline-block;
`

const Login =(props)=> {
    console.log(props);
    
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
                });
            }} >
                <table>
                <tbody>
                    <tr>
                        <Login_Label_Td><label >Username or Email</label></Login_Label_Td>
                        <Login_Label_Td><label >Password</label></Login_Label_Td>
                    </tr>
                    <tr>
                        <td><Login_Input type = "text" name = "username" onChange = {this.UserNameChange} required/></td>
                        <td><Login_Input type = "password" name = "password" onChange = {this.PasswordChange} required/></td>
                        <td><Login_Button className= "button">Login Submit</Login_Button></td>
                    </tr>
                </tbody>
                </table>
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