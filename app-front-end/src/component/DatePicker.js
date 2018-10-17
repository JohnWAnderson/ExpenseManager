import React from 'react';
import ItemList from './ItemList';
import { connect } from 'react-redux';
import {NavLink, Link} from 'react-router-dom';
import FilterPicker from './FilterPicker';
import PageInformation from './PageInformation';
import styled from 'styled-components';
import Signup from '../Account/Signup';

const Box_Div = styled.div`
    position:absolute;
    border-radius: 5px;
    text-align: right;
    align: center;
    padding: 2rem 3 rem;    
`

const Main_Signup_Block = styled.div`
    position: relative
    border-radius: 5px;
    text-align: center;
    align: center;
    padding-right: 30px;
    padding-left: 80px;
    width: 500px; height: 500px;
    float: right;
`


const App_DashBoard = styled.div`
    padding: 0;
    height: 90%;
    align: center;
    text-align: center;
`

const Small_Link = styled(NavLink)`
    color: blue
`

const Big__Link = styled(NavLink)`
    color: red
`


const DatePicker= (props) =>{ 
        return(
            <div>
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
            </div>
        );
}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(DatePicker);