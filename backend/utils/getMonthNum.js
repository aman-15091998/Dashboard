export const getMonthNum=(monthName)=> {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june',
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    return months.indexOf(monthName) + 1; 
}