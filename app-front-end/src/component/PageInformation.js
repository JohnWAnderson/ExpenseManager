import React from 'react';
import { connect } from 'react-redux';
import getSelectorSum from '../Redux/SelectorSum';
import getVisableItem from '../Redux/SelectorItem';
const PageInformation = (props) =>{

    return(
        <div>
            temp
        </div>
    );
}

const MapInfo=(state)=>{
    
    return{
        Sum: getSelectorSum(state.items, state.filter),
        Items: getVisableItem(state.items, state.filter)
    }
}

export default connect(MapInfo)(PageInformation);
