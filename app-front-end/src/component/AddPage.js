import React from 'react';
import ItemForm from './ItemForm';
import { CreateItem } from '../ApiMethods/Account';
import { connect } from 'react-redux';
import { addItem } from '../Redux/Actions/Items';
import styled from 'styled-components';

const MainDiv = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
`
const PageFormDiv = styled.div`
    padding: 0;
    text-align: center;
    position: relative;
    border-bottom: none;
    width: 70%;
    margin auto;
`

const PageFormH1 = styled.h1`
    text-align: center ;
    padding-bottom: 25px;
    padding-left: 2px;
`

const AddPage = (props) =>{
    console.log(props);
    return(
    <MainDiv>
        <PageFormDiv>
        <PageFormH1>Add Item</PageFormH1>
        <ItemForm
            onSubmit={(item) => {
                // props.dispatch(addItem(item))
                // props.history.push('/') 
                CreateItem(item).then(response => {
                    if(response.available){
                        props.dispatch(addItem(item))
                        props.history.push('/')
                    }
                });
            }}
        />
        </PageFormDiv>
    </MainDiv>
    );
};

const MapUserInfo=(state)=>{
    return{
        User: state
    }
  }

export default connect(MapUserInfo)(AddPage);
