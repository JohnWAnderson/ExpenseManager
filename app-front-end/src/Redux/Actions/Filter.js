export const setNameFilter = (name = '') =>({
    type: 'SET_NAME_FILTER',
    name
});

export const sortByAmount = () =>({
    type: 'SORT_BY_AMOUNT'
});

export const sortByDate = () =>({
    type: 'SORT_BY_DATE'
});

export const setStartDate = (startDate = undefined) =>({
    type: 'SET_START_DATE_FILTER',
    startDate
});

export const setEndDate = (endDate = undefined) =>({
    type: 'SET_END_DATE_FILTER',
    endDate
});

export const resetFilter = () => ({
    type: 'SET_DEFAULT'
})