import moment from 'moment';



export const TimesItemChange = (item, filter) =>{
        let times = 1;
        if(item.recurring){
            const duedate = moment(item.duedate);
            const recurringsize = item.recurringsize;
            let startF= moment(filter.startDate).startOf('day');
            let endF = moment(filter.endDate).startOf('day');
            if(duedate.isBefore(startF, 'day')){
                times = 0
                console.log(item.name);         
                startF = findNewStart(duedate, startF, recurringsize)
                console.log(startF);
                
            }else{
                startF = duedate;
            }
                
            if(item.enddate){
                const endR = moment(item.endrecurring);
                if(endR.isBefore(endF, 'day'))
                    endF = endR;
            } 
            const tempCount = getNewCount(startF, endF, recurringsize); 
            times = tempCount < 0 ? times: tempCount + times; 
        }
              
        return times;
};

const findNewStart = (duedate, startF, recurringsize) =>{
    const difference = (startF.diff(duedate, 'days'));
    console.log(duedate, startF);
    switch(recurringsize){
        case "daily":
            return startF
        case "weekly":
            return moment(startF).subtract(difference%7, 'days').startOf('day');
        case "biweekly":
            return moment(startF).subtract(difference%14, 'days').startOf('day');
        case "monthly":
            
        default:
            return 1;
    };
}



export const getNewCount = (startF, endF, recurringsize) =>{
    switch(recurringsize){
        case "daily":
            return (endF.diff(startF, 'days'));
        case "weekly":
            console.log(endF,startF);
            return endF.diff(startF, 'weeks');
        case "biweekly":
            return Math.floor((endF.diff(startF, 'weeks'))/2) ;
        case "monthly":
            return (endF.diff(startF, 'month'));
        default:
            return 1;
    };
};