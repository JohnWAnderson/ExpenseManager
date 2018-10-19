import React from 'react';
import styled from 'styled-components';

const ItemCostPartDIV =styled.div`
    display: inline-block;
    vertical-align: top;
    width: 33%;
    height: 100%;
`

const ItemCostDiv = styled.div`
    border: 1px solid black;
    position: relative;
    display: block;
`   

const ItemCost = (props) => (
    <ItemCostDiv>
        <ItemCostPartDIV>
            ${props.cost/100 * props.times} 
        </ItemCostPartDIV>
        <ItemCostPartDIV>
            ${props.cost/100 * props.times} 
        </ItemCostPartDIV>
    </ItemCostDiv>
   );
   
   
   export default ItemCost;