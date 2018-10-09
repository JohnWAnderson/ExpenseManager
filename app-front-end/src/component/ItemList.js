import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';

const ItemList =(props)=>{
    return(
        <div>
         { props.User.map((item,index)=>
             <Item key={index} {...item} index={index+1}/>)}
        </div>
    );
}

const MapInfo=(state)=>{
    return{
        User: state.items
    }
}

export default connect(MapInfo)(ItemList);
