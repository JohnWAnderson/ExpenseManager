import moment from 'moment';

export default (items, {name, sortby, startDate, endDate}) =>{
    return items.filter((item) => {
        const createdAtMoment = moment(items.duedate)
        console.log('amount',createdAtMoment);
        console.log('start', moment(startDate));
        console.log(item.name);
        console.log(name);
        
        const startDateMatch = startDate ? moment(startDate).isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? moment(endDate).isSameOrAfter(createdAtMoment, 'day') : true;
        const nameMatch = item.name.toLowerCase().includes(name.toLowerCase());   
        console.log(item.name, startDateMatch, endDateMatch, nameMatch)
        return startDateMatch && endDateMatch && nameMatch
    }).sort((a,b) => {
        if(sortby === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if (sortby === 'amount'){
            return a.amount < b.amount ? 1 : -1;
        }
    });
};