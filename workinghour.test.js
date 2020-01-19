const { find, getCloseTime, schedule, getOpenTime } = require("./workinghour");


describe("Utility Functions", () => {
  it("should return the close time to the working day", () => {
    let expected =
      "Mon Jan 20 2020 18:00:00 GMT+0800 (Singapore Standard Time)";
    let actual = getCloseTime(
      new Date("2020-01-20T17:00:00+0800"),
      schedule
    ).toString();
    expect(actual).toBe(expected);

    expected = "Wed Jan 15 2020 18:00:00 GMT+0800 (Singapore Standard Time)";
    actual = getCloseTime(
      new Date("2020-01-15T23:00:00+0800"),
      schedule
    ).toString();
    expect(actual).toBe(expected);
  });

  it("should return the start time to the working day", () => {
    let expected =
      "Mon Jan 20 2020 09:00:00 GMT+0800 (Singapore Standard Time)";
    let actual = getOpenTime(
      new Date("2020-01-20T17:00:00+0800"),
      schedule
    ).toString();
    expect(actual).toBe(expected);

    expected = "Wed Jan 15 2020 09:00:00 GMT+0800 (Singapore Standard Time)";
    actual = getOpenTime(
      new Date("2020-01-15T23:00:00+0800"),
      schedule
    ).toString();
    expect(actual).toBe(expected);
  });
});


describe("Set the expiry datetime", () => {
  let expireyTime = 3 * 60 * 60 * 1000;

  it("should return the expiry date with todays date", () => {
      let expected = 'Tue Jan 21 2020 11:55:07 GMT+0800 (Singapore Standard Time)';
      let actual = find(new Date("2020-01-20T17:55:07+0800"), schedule, expireyTime).toString();
      expect(actual).toBe(expected);
  });

  it("should return the expiry date to next working day", () => {
    let expected = 'Mon Jan 20 2020 12:00:07 GMT+0800 (Singapore Standard Time)';
    let actual = find(new Date("2020-01-19T11:00:07+0800"), schedule, expireyTime).toString();
    expect(actual).toBe(expected);
})

it("should return the expiry date on Monday", () => {
  let expected = 'Mon Jan 20 2020 12:55:07 GMT+0800 (Singapore Standard Time)';
  let actual = find(new Date("2020-01-18T14:55:07+0800"), schedule, expireyTime).toString();
  expect(actual).toBe(expected);
})

it("should add the expiry today and next day", () => {
  let expected = 'Wed Jan 22 2020 11:30:07 GMT+0800 (Singapore Standard Time)';
  let actual = find(new Date("2020-01-21T17:30:07+0800"), schedule, expireyTime).toString();
  expect(actual).toBe(expected);
})

});
