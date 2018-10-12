import moment from 'moment';



export const TimesItemChange = (item, endDate) =>{
        let times = 1;
        if(item.recurring){
            const duedate = moment(item.duedate);
            const recurringsize = item.recurringsize;
            let endrecurring = moment(endDate);
            if(item.enddate){
                const endR = moment(item.endrecurring);
                if(endR.isBefore(endrecurring))
                    endrecurring = endR;
            } 
            times = times + getNewCount(duedate, endrecurring, recurringsize);     
        }
        return times;
};

const getNewCount = (duedate, endrecurring, recurringsize) =>{
    switch(recurringsize){
        case "daily":
            console.log('daily'); 
            return (endrecurring.diff(duedate, 'days'));
        case "weekly":
            console.log('weekly'); 
            return (endrecurring.diff(duedate, 'weeks'));
        case "biweekly":
            console.log('biweekly'); 
            return Math.floor((endrecurring.diff(duedate, 'weeks'))/2) ;
        case "monthly":
            console.log('monthly'); 
            return (endrecurring.diff(duedate, 'month'));
        default:
            console.log('default'); 
            return 1;
    };
};