import React from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';

const Header =(props)=>{
    return(
    <header>
    <h1>Item Manager</h1>
    {(!props.User.isAuthenticated) &&
        <div>
        <NavLink to="/" activeClassName="is-active" exact={true} >Home Page  </NavLink>  
        <NavLink to="/signup" activeClassName="is-active">signin  </NavLink>  
        <NavLink to="/login" activeClassName="is-active">login</NavLink>
        </div> }   
    {(props.User.isAuthenticated) &&
            <div>
            Hello, {props.User.currentUser.username}  
            <NavLink to="/" activeClassName="is-active" exact={true} >Home Page  </NavLink>  
            <NavLink to="/add" activeClassName="is-active" exact={true} > add Page </NavLink>  
            <button onClick = {props.handleLogOut}>LogOut</button>
            </div> }
    </header>   
    );
}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(Header);