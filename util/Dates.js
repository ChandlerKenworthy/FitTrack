export function getPrevMonth(date) {
    let month = date.getMonth() - 1;
    if(month < 0) {
      month += 12;
    }
    return month;
  }