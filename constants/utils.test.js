import utils from './utils';

test('Count amount of cycles', () => {
    // 1 is added to the amount of cycles because the first bill counts as a cycle.
    expect(utils.countAmountOfCycles(1, '2022-09-11', '2022-10-13')).toBe(2);
    expect(utils.countAmountOfCycles(1, '2022-10-11', '2022-10-13')).toBe(1);
    expect(utils.countAmountOfCycles(1, '2021-10-11', '2022-10-13')).toBe(13);
    expect(utils.countAmountOfCycles(1, '2012-01-01', '2022-01-02')).toBe(121);
    expect(utils.countAmountOfCycles(1, '2002-01-01', '2022-01-02')).toBe(241);
});

test('Get next bill date', () => {
    expect(utils.calcNewBill('2022-09-11', 1, '2022-10-13')).toEqual('2022-11-11');
    expect(utils.calcNewBill('2018-09-11', 1, '2022-10-13')).toEqual('2022-11-11');
    expect(utils.calcNewBill('2002-01-01', 1, '2022-01-02')).toEqual('2022-02-01');
    expect(utils.calcNewBill('1994-01-01', 1, '2022-01-02')).toEqual('2022-02-01');
});