var request = require("request");


describe('calc', () => {
    it('should mutipley 2 and 2', () => {
        expect(2*2).toBe(4);
    })
})

describe('get messages', () => {

    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3001/messages', (err,res) => {
            expect(res.statusCode).toBe(200)
            done();
        });
    })

    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3001/messages', (err,res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done();
        });
    })
})


describe('get messages from a user', () => {
    it('should return 200 Ok', (done) => {
        request.get('http://localhost:3001/messages/demo1', (err,res) => {
            expect(JSON.parse(res.body)[0].name).toEqual("demo1")
            done();
        });
    });
})

function myfunction(num1, num2) {
    return num1 * num2;
} 

describe('Calculator Functions', () => {
    it('should return multiply numbers', () => {
        expect(myfunction(2,6)).toBe(12)
    });
})