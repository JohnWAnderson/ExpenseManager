import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => (
 <div>
    {console.log('itemn', props)}
    <Link to={`/edit/${props.index}`}>
    {props.times !== 1 ? <h3>x{props.times} {props.name}</h3> :<h2>{props.name}</h2>}}
    </Link>
     <p>${props.cost/100 * props.times}</p> 
     <p>{props.description}</p>
 </div>
);


export default Item;