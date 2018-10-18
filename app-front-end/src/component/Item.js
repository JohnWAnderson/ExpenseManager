import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item_Div = styled.div`
    align: center;
    border: 1px solid black;
    position: relative;
`   

const Item_H3 = styled.h3`
    text-align:left;
    position: relative;
`   
const Item = (props) => (
 <Item_Div>
    <Item_H3>
    {props.times !== 1 && <text>x{props.times}</text>}
    <Link to={`/edit/${props.index}`}>
        <text>{props.name}</text>
    </Link>
    </Item_H3>
    ${props.cost/100 * props.times} 
    {props.description}
 </Item_Div>
);


export default Item;