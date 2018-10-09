import React from 'react';
import ItemList from './ItemList';
import { connect } from 'react-redux';
import { SingleDatePicker } from 'react-dates';

const DashBoard = (props) =>{
    return(
        <div>
        {(!props.User.isAuthenticated) &&
            <div>
                please log in
            </div> } 
        {(props.User.isAuthenticated) &&
            <div>
                <ItemList/>
            </div> } 
        </div>
    );
}
const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(DashBoard);