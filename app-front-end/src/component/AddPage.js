import React from 'react';
import ItemForm from './ItemForm';
import { CreateItem } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import { addItem } from '../Redux/Actions/Items';

const AddPage = (props) =>{
    return(
        <div>
    <h1>add expense</h1>
    <ItemForm
        onSubmit={(item) => {
            console.log(item);
            CreateItem(item).then(response => {
                 if(response.available){
                    props.dispatch(addItem(item))
                    props.history.push('/')
                }
            });
        }}
    />
    </div>
    );
};

const MapUserInfo=(state)=>{
    return{
        User: state
    }
  }

export default connect(MapUserInfo)(AddPage);
