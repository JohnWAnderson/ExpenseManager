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
    text-align: right;
    padding: 2rem 3 rem;   
    position: absolute;
    top: auto;
    right: 0px; 
`

const Main_Div = styled.div`
height: 92%;
background: #D4D7EF
`

const Main_Signup_Block = styled.div`
    position: relative
    border-radius: 5px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-right: auto;
    margin-left: auto;
    width: 900px; height: 100%;
    position: relative;
`


const App_DashBoard = styled.div`
    padding: 0;
    align: center;
    text-align: center;
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
                    <Box_Div>
                        <Signup/>
                    </Box_Div>
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