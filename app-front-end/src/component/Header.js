import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Login from '../Account/Login';
const Main_header = styled.header`
    padding: 0;
    height: 8%;
    background: #5dade9
    position: relative;
    min-width: 750px;
`

const Header_Link = styled(Link)`
    color: #383951;
    text-decoration: none;
    font-family: Georgia;
    text-align: left ;
    position: absolute;
    bottom: 0;
`

const Header_h1 = styled.h1`
    left: 0; bottom: 0
    font-size: 40px;
`

const LogOut_Text_Div = styled.text`
    font-size: 30px;
    padding-right: 10px;
`

const LogOut_Div = styled.div`
    position: absolute;
    right: 0; bottom: 0
    text-align: right ;
`

const LogOut_Button = styled.button`
background: #4a8aba;
border: none;
padding: 2px 2px;
border-radius: 3px;
text-align: center;
text-decoration: none;
display: inline-block;
`

const LogIn_Div = styled.div`
    position: absolute;
    right: 0; bottom: 0
    text-align: right ;
`

const Header =(props)=>{
    return(
    <Main_header>
        <Header_h1>
        <Header_Link to="/">
            Item Manager
        </Header_Link>
        </Header_h1>
    {(props.User.isAuthenticated) ?
            <LogOut_Div>
            <LogOut_Text_Div>Hello, {props.User.currentUser.username}</LogOut_Text_Div>
            <LogOut_Button onClick = {props.handleLogOut}>LogOut</LogOut_Button>
            </LogOut_Div> :
            <LogIn_Div><Login handleLogOn={props.handleLogOn}/></LogIn_Div>}
    </Main_header>   
    );
}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(Header);