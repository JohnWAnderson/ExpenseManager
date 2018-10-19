import React from 'react';
import styled from 'styled-components';

const ItemCostPart_DIV =styled.div`
    display: inline-block;
    vertical-align: top;
    width: 33%;
    height: 100%;
`

const ItemCost_Div = styled.div`
    border: 1px solid black;
    position: relative;
    display: block;
`   

const ItemCost = (props) => (
    <ItemCost_Div>
        <ItemCostPart_DIV>
            ${props.cost/100 * props.times} 
        </ItemCostPart_DIV>
        <ItemCostPart_DIV>
            ${props.cost/100 * props.times} 
        </ItemCostPart_DIV>
    </ItemCost_Div>
   );
   
   
   export default ItemCost;