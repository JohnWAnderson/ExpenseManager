import moment from 'moment';

export default (items, {name, sortby, startDate, endDate}) =>{
    return items.filter((item) => {
        const createdAtMoment = moment(item.duedate)
        const startDateMatch = startDate ? moment(startDate).isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? moment(endDate).isSameOrAfter(createdAtMoment, 'day') : true;
        const nameMatch = item.name.toLowerCase().includes(name.toLowerCase());   
        return startDateMatch && endDateMatch && nameMatch
    }).sort((a,b) => {
        if(sortby === 'date'){
            return a.startDate < b.startDate ? 1 : -1;
        }
        else if (sortby === 'cost'){
            return a.cost < b.cost ? 1 : -1;
        }
        else{
            return 0;
        }
    });
};
