import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import getSelectorSum from '../Redux/SelectorSum';
import getVisableItem from '../Redux/SelectorItemOrder';
const getVisableItemNumber = (props) =>{
    return(
        <div>
        {props.Items.length > 0 ? 
            <div>
            <p>Page contains {props.Items.length} which totals to ${props.Sum/100}</p>
            <NavLink to="/add" activeClassName="is-active" exact={true} > add Page </NavLink> 
            </div>:
            <div>
            <p>Page contains no items</p>
            <NavLink to="/add" activeClassName="is-active" exact={true} > add Page </NavLink>
            </div>}
        </div>
    );
}

const MapInfo=(state)=>{
    const currentItems = getVisableItem(state.items, state.filter)
    return{
        Sum: getSelectorSum(currentItems),
        Items: currentItems,
        sort: state.filter
    }
}

export default connect(MapInfo)(getVisableItemNumber);
