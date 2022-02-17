let data = [{
    "mstar_id": "F00000ZMXD",
    "thailand_fund_code": "PRINCIPAL VNEQ-A",
    "nav_return": 74.80117,
    "nav": 14.154,
    "nav_date": "2021-09-07T00:00:00.000Z",
    "avg_return": 63.633823
},

{
    "mstar_id": "F0000109C9",
    "thailand_fund_code": "PRINCIPAL VNEQ-I",
    "nav_return": 74.79997,
    "nav": 14.2656,
    "nav_date": "2021-09-07T00:00:00.000Z",
    "avg_return": 63.633823
},

{
    "mstar_id": "F00000HHFC",
    "thailand_fund_code": "KT-OIL",
    "nav_return": 73.33466,
    "nav": 3.4868,
    "nav_date": "2021-09-03T00:00:00.000Z",
    "avg_return": 65.394614
}]

const onTextChanged = (values) => {
    const value = values;
    let suggestions = [];
    if (value.length > 0) {
        const regex = new RegExp(`^${value}`, "i");
        suggestions = data.sort().filter((v) => regex.test(v.thailand_fund_code));
    }

    return suggestions

};

describe('suggestions', () => {
    it('should return length 2 ', () => {
        expect(onTextChanged("PRINCIPAL").length).toBe(2)
    })

    it('should return 5 length 0 ', () => {
        expect(onTextChanged("XXX").length).not.toEqual(1)
    })

    it('should return  empty array ', () => {
        expect(onTextChanged("XXX")).toEqual([])
    })

    it('should return  2 datas ', () => {
        expect(onTextChanged("PRINCIPAL".toLocaleLowerCase())).toEqual([{
            "mstar_id": "F00000ZMXD",
            "thailand_fund_code": "PRINCIPAL VNEQ-A",
            "nav_return": 74.80117,
            "nav": 14.154,
            "nav_date": "2021-09-07T00:00:00.000Z",
            "avg_return": 63.633823
        },
        {
            "mstar_id": "F0000109C9",
            "thailand_fund_code": "PRINCIPAL VNEQ-I",
            "nav_return": 74.79997,
            "nav": 14.2656,
            "nav_date": "2021-09-07T00:00:00.000Z",
            "avg_return": 63.633823
        },])
    })
})