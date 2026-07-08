const facilities = [
    {
        id: 'facility_a',
        name: 'Facility A',
        capacity: 50,
        available_slots: 12,
        waiting_children: 3,
        hours: '08:00 - 18:00'
    },
    {
        id: 'facility_b',
        name: 'Facility B',
        capacity: 40,
        available_slots: 5,
        waiting_children: 8,
        hours: '07:00 - 19:00'
    },
    {
        id: 'facility_c',
        name: 'Facility C',
        capacity: 60,
        available_slots: 20,
        waiting_children: 1,
        hours: '08:00 - 17:00'
    }
];

function queryDatabase(queryParams) {
    const { type, facility, keyword } = queryParams;

    if (type === 'all_facilities') {
        return facilities.map(f => ({
            name: f.name,
            capacity: f.capacity,
            available: f.available_slots,
            waiting: f.waiting_children,
            hours: f.hours
        }));
    }

    if (type === 'specific_facility' && facility) {
        const fac = facilities.find(f => f.id === facility);
        if (fac) {
            return {
                name: fac.name,
                capacity: fac.capacity,
                available: fac.available_slots,
                waiting: fac.waiting_children,
                hours: fac.hours
            };
        }
    }

    if (type === 'keyword' && keyword) {
        return facilities.filter(f => {
            const str = JSON.stringify(f).toLowerCase();
            return str.includes(keyword.toLowerCase());
        });
    }

    return null;
}

function formatResponse(data) {
    if (!data) {
        return 'すみません、わかりません (Sorry, I don\'t know)';
    }

    if (Array.isArray(data)) {
        if (data.length === 0) {
            return 'すみません、わかりません (Sorry, I don\'t know)';
        }
        return data.map(f => {
            if (typeof f === 'string') return f;
            return `
${f.name}:
  • Capacity: ${f.capacity}
  • Available slots: ${f.available}
  • Waiting list: ${f.waiting}
  • Hours: ${f.hours}`;
        }).join('\n\n');
    }

    return `
${data.name}:
  • Capacity: ${data.capacity}
  • Available slots: ${data.available}
  • Waiting list: ${data.waiting}
  • Hours: ${data.hours}`;
}
