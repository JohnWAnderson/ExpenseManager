import React from 'react';
import { signup, signin , UsernameAvailabile, EmailAvailabile, ACCESS_TOKEN, getCurrentUser} from '../ApiMethods/Account';
import { addUser } from '../Redux/Actions/Users';
import styled from 'styled-components';

const SingUp_h1 = styled.h1`
    text-align: left ;
    padding-bottom: 25px;
`
const SignUp_Input = styled.input`
margin: 2px 0;
display: inline-block;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing: border-box;
height 30;
`
const Signup_Td_Label = styled.td`
text-align: left ;
`

const Signup_Td_Error = styled.td`
text-align: right ;
width: 100px; height: auto;
color: red;
`

class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: {
                value: '',
                valid: false,
                error: ''
            },
            username: {
                value: '',
                valid: false,
                error: ''
            },
            email: {
                value: '',
                valid: false,
                error: ''
            },
            password: {
                value: '',
                valid: false,
                error: ''
            }

        }
        this.validateEmail = this.validateEmail.bind(this);
        this.resetInput = this.resetInput.bind(this);
        this.signedup = this.signedup.bind(this);
    }  


    onSubmit = (e) =>{
        e.preventDefault();
        
        if(this.state.username.valid && this.state.name.valid && this.state.email.valid && this.state.password.valid){
            const signupRequestObject = {
                name: this.state.name.value,
                email: this.state.email.value,
                username: this.state.username.value,
                password: this.state.password.value
            };
            signup(signupRequestObject).then(response => {
                if(response.available){
                    this.signedup(signupRequestObject.username, signupRequestObject.password);
                }
            });
        }
        else{
            console.log("no");
        }       
        this.resetInput(e);
    };


    signedup=(username, password)=>{
        const signinRequestObject = {
            usernameOrEmail: username,
            password: password
        };
        signin(signinRequestObject)
        .then(response => {
            console.log(response);
            // localStorage.setItem(ACCESS_TOKEN, response.accessToken);
            // getCurrentUser()
            // .then(response => {
            //     this.props.dispatch(addUser({currentUser: response, isAuthenticated: true}))
            // })
        });
    }

    resetInput = (e) =>{
        e.target.elements.name.value = '';
        e.target.elements.email.value = '';
        e.target.elements.username.value = '';
        e.target.elements.password.value = '';
        this.setState({name: {
            value: '',
            valid: false,
            error: ''
        },
        username: {
            value: '',
            valid: false,
            error: ''
        },
        email: {
            value: '',
            valid: false,
            error: ''
        },
        password: {
            value: '',
            valid: false,
            error: ''
        }})
    };

        validateEmail =(email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        PasswordChange = (e) =>{         
            const password = e.target.value
            if(password.length >= 6 && password.length <= 20){
                this.setState({
                    password: {
                        value: password,
                        valid: true,
                        error: ''
                    }})
            }
            else if(password.length === 0){
                this.setState({
                    password: {
                        value: password,
                        valid: false,
                        error: ''
                    }})
            }
            else{
                this.setState({
                    password: {
                        value: password,
                        valid: false,
                        error: 'Invalid Length'
                    }})
            }
        }
    
        NameChange = (e) =>{
            const name = e.target.value
            if(name.length >= 3 && name.length <= 40){
                this.setState({
                    name: {
                        value: name,
                        valid: true,
                        error: ''
                    }
                })
            }
            else if(name.length === 0){
                this.setState({
                    name: {
                        value: name,
                        valid: false,
                        error: ''
                    }})
            }
            else{
                this.setState({
                    name: {
                        value: name,
                        valid: false,
                        error: "Invalid Length"
                    }
                })  
            }
        }
    
        UserNameChange = (e) =>{
            const UserName = e.target.value
            if(UserName.length >= 3 && UserName.length <= 20){
                UsernameAvailabile(UserName).then(response =>
                    {
                        if(response.available){
                            this.setState({
                                username: {
                                    value: UserName,
                                    valid: true,
                                    error: ''
                                }
                            })
                        }
                        else{
                    this.setState({
                            username: {
                                value: UserName,
                                valid: false,
                                error: 'taken'
                            }
                    })
                    }
                });
            }
            else if(UserName.length === 0){
                this.setState({
                    username: {
                        value: UserName,
                        valid: false,
                        error: ''
                    }
                })
            }
            else{
                this.setState({
                    username: {
                        value: UserName,
                        valid: false,
                        error: 'Invalid Length'
                    }
            })
            }
        }
    
        EmailChange = (e) =>{
            const email = e.target.value
            if(email.length=== 0){
                this.setState({
                    email: {
                        value: email,
                        valid: false,
                        error: ''
                    }
                })
            }
            else if(this.validateEmail(email)){
                if(email.length <= 50){
                    EmailAvailabile(email).then(response =>
                        {
                            if(response.available){
                                this.setState({
                                    email: {
                                        value: email,
                                        valid: true,
                                        error: ''
                                    }
                                })
                            }
                            else{
                                this.setState({
                                    email: {
                                        value: email,
                                        valid: false,
                                        error: 'taken'
                                    }
                                })
                            }
                        });      
            }
            else{
                this.setState({
                    email: {
                        value: email,
                        valid: false,
                        error: 'email to long'
                    }
                })
            }
        }else{
                this.setState({
                    email: {
                        value: email,
                        valid: false,
                        error: 'invalid email'
                    }
                })
            }
        }
    

    render= () =>(
        <div>
        <SingUp_h1>Sign Up</SingUp_h1>
        <form  onSubmit= {this.onSubmit}>
            <table>
            <tbody>
            <tr>
                <td><SignUp_Input type = "text" name = "Name"  id="name" placeholder="Name" onChange = {this.NameChange} required /> </td>
                <Signup_Td_Error>{!this.state.name.valid && this.state.name.error}</Signup_Td_Error>
            </tr>
            <tr>
                <td><SignUp_Input type = "text" name = "Username" id="username" placeholder="Username" onChange = {this.UserNameChange} required /></td>
                <Signup_Td_Error>{!this.state.username.valid && this.state.username.error}</Signup_Td_Error>
            </tr>
            <tr>
                <td><SignUp_Input type = "email" name = "Email" id= "email" placeholder="Email"  onChange = {this.EmailChange} required/></td>
                <Signup_Td_Error>{!this.state.email.valid && this.state.email.error}</Signup_Td_Error>
            </tr>
            <tr>
                <td><SignUp_Input type = "password" name = "Password" id="password" placeholder="Password" onChange = {this.PasswordChange} required/></td>
                <Signup_Td_Error>{!this.state.password.valid && this.state.password.error}</Signup_Td_Error>
            </tr>
            <tr>
                <Signup_Td_Label><button className= "button">Signup Submit</button></Signup_Td_Label>
            </tr>
            </tbody>
            </table>
        </form>
        </div>
    );

}

export default Signup;