import React from 'react';
import ItemForm from './ItemForm';
import { UpdateItems, DeleteItem} from '../ApiMethods/Account';
import { connect } from 'react-redux';
import { editItem, removeItem} from '../Redux/Actions/Items';
import NotFound from './NotFound';
import getVisableItem from '../Redux/SelectorItemOrder';
import styled from 'styled-components';

const Main_Div = styled.div`
    position:relative;
    min-height: 92%;
    height: auto;
`

const Page_Form_Div = styled.div`
    padding: 0;
    text-align: center;
    position: relative;
    border-bottom: none;
    width: 70%;
    margin auto;
`

const EditPage = (props) =>{
    const item=props.items[props.match.params.id-1]
    if(!!item){
        const holder = item.name;
        return(
            <Main_Div>
            <Page_Form_Div>
            <button onClick={()=>{
                const newItem = ({...item, userName: props.User.currentUser.username})
                DeleteItem(newItem).then(response => {        
                    if(response.available){
                        props.dispatch(removeItem({name: newItem.name}));    
                        props.history.push('/')  
                    }
                });
            }}>Remove</button>
            <ItemForm item={item}        
                    onSubmit={(item) => {
                        const newItem=({...item,oldName: holder})
                        UpdateItems(newItem).then(response => {
                            if(response.available){          
                                props.dispatch(editItem(holder,item)); 
                                props.history.push('/')  
                            }
                        });
                    }}
                    />
            </Page_Form_Div>
            </Main_Div>
        );
    }
     else{
        return(
            <div>
                <NotFound/>
            </div>
        );
   }
};

const MapUserInfo=(state)=>{
  return{
      User: state.user,
      items: getVisableItem(state.items, state.filter)
  }
}
export default connect(MapUserInfo)(EditPage);