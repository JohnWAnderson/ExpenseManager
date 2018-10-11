import React from 'react';
import { connect } from 'react-redux';
import getSelectorSum from '../Redux/SelectorSum';
import getVisableItem from '../Redux/SelectorItemOrder';
const getVisableItemNumber = (props) =>{
    return(
        <div>
            <p>Page contains {props.Items.length} which totals to ${props.Sum/100}</p>
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
