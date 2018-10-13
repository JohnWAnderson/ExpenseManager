import moment from 'moment';



export const TimesItemChange = (item, filter) =>{
        let times = 1;
        if(item.recurring){
            const duedate = moment(item.duedate);
            const recurringsize = item.recurringsize;
            let startF= moment(filter.startDate);
            let endF = moment(filter.endDate);
            if(duedate.isBefore(startF)){
                times = 0
                console.log(startF);
                startF= findNewStart(duedate, startF, recurringsize);
                console.log(startF);
                
            }
            else
                startF= duedate


            if(item.enddate){
                const endR = moment(item.endrecurring);
                if(endR.isBefore(endF))
                endF = endR;
            } 
            const tempCount = getNewCount(startF, endF, recurringsize); 
            console.log(tempCount);
            console.log(times);
            console.log(startF); 
            console.log(endF);
            times = tempCount < 0 ? times: tempCount + times; 
        }
              
        return times;
};

const findNewStart = (duedate, startF, recurringsize) =>{
    const difference = (startF.diff(duedate, 'days'));
    console.log('dif', difference);
    switch(recurringsize){
        case "daily":
            console.log(difference);
        case "weekly":
            console.log(difference%7, 'days');
            return moment(startF).add(difference%7, 'days');
        case "biweekly":
            return startF.add(difference%14);
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
            return (endF.diff(startF, 'weeks'));
        case "biweekly":
            return Math.floor((endF.diff(startF, 'weeks'))/2) ;
        case "monthly":
            return (endF.diff(startF, 'month'));
        default:
            return 1;
    };
};
