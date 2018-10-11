import React from 'react';
import ItemList from './ItemList';
import { connect } from 'react-redux';
import FilterPicker from './FilterPicker';
import PageInformation from './PageInformation';
const DatePicker= (props) =>{ 
        return(
            <div>
            {(!props.User.isAuthenticated) &&
                <div>
                    please log in
                </div> } 
            {(props.User.isAuthenticated) &&
                <div>
                    <FilterPicker/>
                    <PageInformation/>
                    <ItemList/>
                </div> } 
            </div>
        );
}

const MapUserInfo=(state)=>{
    return{
        User: state.user
    }
}

export default connect(MapUserInfo)(DatePicker);