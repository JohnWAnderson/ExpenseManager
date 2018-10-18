import React from 'react';
import ItemList from './ItemList';
import { connect } from 'react-redux';
import FilterPicker from './FilterPicker';
import PageInformation from './PageInformation';
import styled from 'styled-components';
import Signup from '../Account/Signup';

const Box_Div = styled.div`
    position:absolute;
    border-radius: 5px;
    align: center;
    text-align: center;
    padding: 2rem 3 rem;   
    top: auto;
    center: 0px; 
    height: auto;
`

const Main_Div = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
`

const Main_Signup_Block = styled.div`
    position:relative;
    border-radius: 5px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
    width: 70%; 
    height: calc(92vh - 40px);
`
const App_DashBoard = styled.div`
    padding: 0;
    align: center;
    text-align: center;
    height: 100%;
    position: relative;
    flex-direction: column;
`

const DatePicker= (props) =>{ 
        return(
            <Main_Div>
            {(props.User.isAuthenticated) ?
                <App_DashBoard>
                    <FilterPicker/>
                    <PageInformation/>
                    <ItemList/>
                </App_DashBoard> :
                <Main_Signup_Block>
                        <Signup/>
                </Main_Signup_Block>} 
            </Main_Div>
        );
}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(DatePicker);