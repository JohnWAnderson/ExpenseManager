import React from 'react';
import { connect } from 'react-redux';
import getSelectorSum from '../Redux/SelectorSum';
import getVisableItem from '../Redux/SelectorItem';
const PageInformation = (props) =>{
    console.log(props);
    
    return(
        <div>
            <p>Page contains {props.Items.length} which totals to ${props.Sum/100}</p>
        </div>
    );
}

const MapInfo=(state)=>{
    
    return{
        Sum: getSelectorSum(state.items, state.filter),
        Items: getVisableItem(state.items, state.filter),
        sort: state.filter
    }
}

export default connect(MapInfo)(PageInformation);
