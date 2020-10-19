const expect = require('chai').expect;
const verify = require('../lib');

describe('Marijuana Verify Providers Tests', () => {
    it('should test green life verification for response', async () => {
        const greenlife = await verify.greenlife('11111111');
        expect(greenlife).haveOwnProperty('isValid');
        expect(greenlife.isValid).to.eq(false);
    });
});