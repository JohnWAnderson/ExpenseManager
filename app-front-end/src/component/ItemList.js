import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/SelectorItemOrder';
const ItemList =(props)=>{
    console.log(props.items);
    return(
        <div>
         {props.items.map((item,index)=>{
            return(<Item key={index} {...item} index={index+1}/>)})}
        </div>
    );
}

const MapInfo=(state)=>{
    return{
        items: getVisableItem(state.items, state.filter)
    }
}

export default connect(MapInfo)(ItemList);
