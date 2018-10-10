import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => (
 <div>
    <Link to={`/edit/${props.index}`}>
    <h2>{props.name}</h2>
    </Link>
     <p>${props.cost/100}</p> 
     <p>{props.description}</p>
 </div>
);


export default Item;