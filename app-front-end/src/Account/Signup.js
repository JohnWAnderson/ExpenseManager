import React from 'react';
import { signup, UsernameAvailabile, EmailAvailabile } from '../ApiMethods/Account';
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
                console.log(response)});
            this.props.history.push('/login') 
        }
        else{
            console.log("no");
        }       
        this.resetInput(e);
    };

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
            }else{
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
            if(this.validateEmail(email)){
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
            <form  onSubmit= {this.onSubmit}>
            <label >Name:</label>
            <input type = "text" name = "Name"  id="name" onChange = {this.NameChange} required /> 
            {!this.state.name.valid && this.state.name.error}
            <br/>
            <label >UserName:</label>
            <input type = "text" name = "Username" id="username" onChange = {this.UserNameChange} required />
            {!this.state.username.valid && this.state.username.error}
            <br/>
            <label >Email:</label>
            <input type = "email" name = "Email"  id= "email" onChange = {this.EmailChange} required/>      
            {!this.state.email.valid && this.state.email.error}
            <br/>   
            <label >Password:</label>
            <input type = "password" name = "Password" id="password" onChange = {this.PasswordChange} required/>
            {!this.state.password.valid && this.state.password.error}
            <br/>
            <button className= "button">Signup Submit</button>
            </form>
        </div>
    );

}

export default Signup;