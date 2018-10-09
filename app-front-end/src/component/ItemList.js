import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/selector';

const ItemList =(props)=>{
    console.log('prop', props);
    return(
        <div>
         { props.User.map((item,index)=>
             <Item key={index} {...item} index={index+1}/>)}
        </div>
    );
}

const MapInfo=(state)=>{
    console.log(state.items, state.filter);
    
    return{
        User: getVisableItem(state.items, state.filter)
    }
}

export default connect(MapInfo)(ItemList);
