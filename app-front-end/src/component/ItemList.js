import React from 'react';
import Item from './Item';
import { connect } from 'react-redux';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';

const ItemList_Div = styled.div`
    padding: 0;
    text-align: center;
    position: relative;
    border: 20px solid black;
    border-bottom: none;
    width: 70%;
    margin auto;
`
const ItemList_Table = styled.table`
    position: relative;
    margin: 0 auto;
    padding: 0;
    text-align: center;
    width: 100%;
` 
//position: relative or absolute;
const ItemList_Td = styled.td`
position: relative;
`

const ItemList =(props)=>{
    console.log(props.items);
    return(
        <ItemList_Div>
            <ItemList_Table>
            <tbody>
                    {props.items.map((item,index)=>{
                        return(<tr><ItemList_Td><Item key={index} {...item} index={index+1}/></ItemList_Td></tr>)})}
            </tbody>
            </ItemList_Table>
        </ItemList_Div>
    );
}

const MapInfo=(state)=>{
    return{
        items: getVisableItem(state.items, state.filter)
    }
}

export default connect(MapInfo)(ItemList);
