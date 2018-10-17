import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Item_Div = styled.div`
    align: center;
    text-align: center;
    border: 1px solid black;
`

const Item = (props) => (
 <Item_Div>
    <Link to={`/edit/${props.index}`}>
    {props.times !== 1 ? <h3>x{props.times} {props.name}</h3> :<h2>{props.name}</h2>}
    </Link>
    ${props.cost/100 * props.times} 
    {props.description}
 </Item_Div>
);


export default Item;