import React from 'react';
import ItemForm from './ItemForm';
import { UpdateItems, DeleteItem} from '../ApiMethods/Account';
import { connect } from 'react-redux';
import { editItem, removeItem} from '../Redux/Actions/Items';

const EditPage = (props) =>{
    const item=props.User.items[props.match.params.id-1]
    if(!!item){
        const holder = item.name;
        item.cost = item.cost;
        //console.log(props.User.user.currentUser.username);
        
        return(
            <div>
            <button onClick={()=>{
                const newItem = ({...item, userName: props.User.user.currentUser.username})
                DeleteItem(newItem).then(response => {          
                    if(response.available){
                        console.log('yes');  
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
                                console.log('yes');             
                                props.dispatch(editItem(holder,item)); 
                                props.history.push('/')  
                            }
                        });
                    }}
                    />
            </div>
        );
    }
     else{
        return(
            <div>
                no
            </div>
        );
   }
};

const MapUserInfo=(state)=>{
  return{
      User: state
  }
}
export default connect(MapUserInfo)(EditPage);