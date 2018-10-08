import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => (
 <div>
    <Link to={`/edit/${props.index}`}>
    <h2>{props.name}</h2>
    </Link>
     <p>{props.cost}</p> 
     <p>{props.description}</p>
     <p>{props.duedate}</p>
 </div>
);


export default Item;