import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ItemCost from './/ItemCost';

const Item_Div = styled.div`
    border: 1px solid black;
    position: relative;
    display: block;
`   
const Header_Link = styled(Link)`
    color: blue;
    text-decoration: none;
    text-align: left ;
    position: absolute;
    bottom: 0;
    font-size: 12px;
`

const ItemPart_DIV =styled.div`
    display: inline-block;
    vertical-align: top;
    width: 33%;
    height: 100%;
`

const Item_H3 = styled.h3`
    text-align:left;
    position: relative;
    font-size: 26px;
    margin: 0;
`   
const Item = (props) => (
 <Item_Div>
    <ItemPart_DIV>
        <Item_H3>
        {props.name}
        <Header_Link to={`/edit/${props.index}`}>
            <text>edit</text>
        </Header_Link>
        </Item_H3>
    </ItemPart_DIV>
    <ItemPart_DIV>
        {props.description}
    </ItemPart_DIV>
    <ItemPart_DIV>
        <ItemCost {...props}/>
    </ItemPart_DIV>
 </Item_Div>
);


export default Item;