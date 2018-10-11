import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/SelectorItem';

const ItemList =(props)=>{
    return(
        <div>
        {console.log(props.User)}  
         {props.User.map((item,index)=>{
            return(<Item key={index} {...item} index={index+1}/>)})}
        </div>
    );
}

const MapInfo=(state)=>{
    
    return{
        User: getVisableItem(state.items, state.filter)
    }
}

export default connect(MapInfo)(ItemList);
