import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Login from '../Account/Login';
const Main_header = styled.header`
    padding: 0;
    height: 8%;
    background: #4A8ABA
    align-items: stretch
    position: relative;
`

const Header_Link = styled(Link)`
    color: green;
    text-decoration: none;
    font-family: Georgia;
    text-align: left ;
    position: absolute;
    bottom: 0;
`

const Header_h1 = styled.h1`
    float: left;
`

const LogOut_Div = styled.div`
    position: absolute;
    right: 0; bottom: 0
    text-align: right ;
    float: right;
`

const LogIn_Div = styled.div`
    position: absolute;
    right: 0; bottom: 0
    text-align: right ;
    float: right;
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
            Hello, {props.User.currentUser.username}  
            <button onClick = {props.handleLogOut}>LogOut</button>
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