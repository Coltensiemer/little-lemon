import { dateComparison } from './dateComparison';

test('Takes in date and compares the dates', () => {
    const data = [
      {
        date: '2023-08-31T04:00:00.000Z',
        email: 'email@email.com',
        full_name: 'first',
        group_total: 20,
        reservation_id: 78,
        time: '12:14:00',
      },
    ];

    const results = dateComparison(data);

    expect(results).toEqual(['Past'])
});


test('Takes in date and compares the dates', () => {
    const data = [
      {
        date: '2050-08-31T04:00:00.000Z',
        email: 'email@email.com',
        full_name: 'first',
        group_total: 20,
        reservation_id: 78,
        time: '12:14:00',
      },
    ];

    const results = dateComparison(data);

    expect(results).toEqual(['Future'])
});