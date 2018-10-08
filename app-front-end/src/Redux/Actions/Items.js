export const addItem = ({name ='', description='', cost=0, duedate=0} = {}) =>(
    {
    type: 'ADD_ITEM',
    item:{
        name,
        description,
        cost,
        duedate
    }
});

export const removeItem = ({name}) => ({
    type: 'REMOVE_ITEM',
    name
});

export const editItem = (name, updates) => ({
    type: 'EDIT_ITEM',
    name,
    updates
});


export const clearItems = () => ({
    type: 'CLEAR_ITEMS'
});