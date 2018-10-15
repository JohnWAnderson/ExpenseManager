import moment from 'moment';


export const TimesItemChange = (item, filter) =>{
        let times = 1;
        if(item.recurring){
            const duedate = moment(item.duedate);
            const recurringsize = item.recurringsize;
            let startF= moment(filter.startDate);
            let endF = moment(filter.endDate);
            console.log(item.name, duedate.isBefore(startF, 'day'));
            
            if(duedate.isBefore(startF, 'day'))
                times = 0

            if(item.enddate){
                const endR = moment(item.endrecurring);
                if(endR.isBefore(endF, 'day'))
                    endF = endR;
            } 
            console.log(item.name, startF, endF);
            const tempCount = getNewCount(duedate, endF, recurringsize); 
            times = tempCount < 0 ? times: tempCount + times; 
        }
              
        return times;
};

export const getNewCount = (startF, endF, recurringsize) =>{
    switch(recurringsize){
        case "daily":
            return (endF.diff(startF, 'days'));
        case "weekly":
            return endF.diff(startF, 'weeks');
        case "biweekly":
            return Math.floor((endF.diff(startF, 'weeks'))/2) ;
        case "monthly":
            return (endF.diff(startF, 'month'));
        default:
            return 1;
    };
};
