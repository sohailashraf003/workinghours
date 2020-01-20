/*
# Objective:
write a function to calculateExpiryDate expiry datetime. expiry datetime is 3 working hours from "now".
the working hours is defined in "schedule" input parameter.
You can write the function in java or javascript.

# input parameters:
now: datetime, current datetime. e.g: '2019-10-11T08:13:07+0800'
schedule: an arraylist of map object. which specified the day open or close and also the start and end of working hours
*/
let schedule = [
  { open: false, open_at: "", close_at: "" }, // sunday -> 0
  { open: true, open_at: "09:00", close_at: "18:00" }, // monday -> 1
  { open: true, open_at: "09:00", close_at: "18:00" }, // -> 2
  { open: true, open_at: "09:00", close_at: "18:00" }, // -> 3
  { open: true, open_at: "09:00", close_at: "18:00" }, // -> 4
  { open: true, open_at: "09:00", close_at: "17:00" }, // -> 5
  { open: false, open_at: "", close_at: "" } // - > 6
];

/*
# example:
now is friday 4pm. whith the above schedule, the expiry date should be next monday 10am. because on friday office close
at 5pm and office is closed on weekend.

output: datetime, 3 working hour from input date ("now")
*/

function isopen(date, schedule) {
  return schedule[date.getDay()].open;
}

function getOpenTime(now, schedule) {
  let timestamp = new Date(now.getTime());
  let scheduleDay = schedule[timestamp.getDay()];
  let open_at = scheduleDay.open_at;
  timestamp.setHours(parseInt(open_at));
  return new Date(timestamp);
}

function getCloseTime(now, schedule) {
  let timestamp = new Date(now.getTime());
  let scheduleDay = schedule[timestamp.getDay()];
  let close_at = scheduleDay.close_at;
  timestamp.setHours(parseInt(close_at));
  return new Date(timestamp);
}

/**
 * Return the expiry datetime
 * @param {Date} now: Order placement date
 * @param {*} schedule: Office week schedule (array of object
 * @param {*} expirey: Expiry date of the order in milliseconds
 */
function calculateExpiryDate(now, schedule, expirey) {
  if (
    !isopen(now, schedule) ||
    now.getTime() >= getCloseTime(now, schedule).getTime()
  ) {
    let newDate = new Date(now.getTime());
    let openAt = parseInt(schedule[newDate.getDay()].open_at);
    newDate.setDate(newDate.getDate() + 1);
    if (isNaN(openAt)) newDate.setHours(9);
    else newDate.setHours(openAt);
    return calculateExpiryDate(newDate, schedule, expirey);
  }

  let date = new Date(now.getTime() + expirey);
  if (date.getTime() > getCloseTime(date, schedule).getTime()) {
    let diff = date.getTime() - getCloseTime(date, schedule).getTime();
    let newDate = new Date(now.getTime());
    let openAt = parseInt(schedule[newDate.getDay()].open_at);
    newDate.setDate(newDate.getDate() + 1);
    if (isNaN(openAt)) newDate.setHours(9);
    else newDate.setHours(openAt);
    return calculateExpiryDate(newDate, schedule, diff);
  }
  return date;
}

module.exports = {
  calculateExpiryDate,
  getCloseTime,
  schedule,
  getOpenTime
};
