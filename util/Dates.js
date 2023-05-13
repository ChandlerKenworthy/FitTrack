export function getPrevMonth(date, nPrevious=1) {
    let month = date.getMonth() - nPrevious;
    if(month < 0) {
      month += 12;
    }
    return month;
  }