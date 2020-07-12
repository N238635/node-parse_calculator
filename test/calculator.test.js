const assert = require('assert');
const solveEquation = require('../components/calculator');

describe('Числа без операций', () => {
    it('1 === 1', () => {
        assert.equal(solveEquation('1'), 1);
    });
    it('0 === 0', () => {
        assert.equal(solveEquation('0'), 0);
    });
    it('0.5 === 0.5', () => {
        assert.equal(solveEquation('0.5'), 0.5);
    });
    it('-1 === -1', () => {
        assert.equal(solveEquation('-1'), -1);
    });
    it('-0.5 === -0.5', () => {
        assert.equal(solveEquation('-0.5'), -0.5);
    });
});

describe('Простые операции', () => {
    it('1+1 === 2', () => {
        assert.equal(solveEquation('1+1'), 2);
    });
    it('0+1 === 1', () => {
        assert.equal(solveEquation('0+1'), 1);
    });
    it('3-1 === 2', () => {
        assert.equal(solveEquation('3-1'), 2);
    });
    it('1-3 === -2', () => {
        assert.equal(solveEquation('1-3'), -2);
    });
    it('2*3 === 6', () => {
        assert.equal(solveEquation('2*3'), 6);
    });
    it('3/2 === 1.5', () => {
        assert.equal(solveEquation('3/2'), 1.5);
    });
    it('2*0.5 === 1', () => {
        assert.equal(solveEquation('2*0.5'), 1);
    });
    it('0.5/0.1 === 5', () => {
        assert.equal(solveEquation('0.5/0.1'), 5);
    });
});

describe('Операции с отрицательными числами', () => {
    it('-3+2 === -1', () => {
        assert.equal(solveEquation('-3+2'), -1);
    });
    it('-3*2 === -6', () => {
        assert.equal(solveEquation('-3*2'), -6);
    });
    it('2*-3 === -6', () => {
        assert.equal(solveEquation('2*-3'), -6);
    });
    it('-2*-3 === 6', () => {
        assert.equal(solveEquation('-2*-3'), 6);
    });
    it('-3/3 === -1', () => {
        assert.equal(solveEquation('-3/3'), -1);
    });
    it('3/-3 === -1', () => {
        assert.equal(solveEquation('3/-3'), -1);
    });
    it('-2/-2 === 1', () => {
        assert.equal(solveEquation('-2/-2'), 1);
    });
});

describe('Операции с разным приоритетом', () => {
    it('2+2*3 === 8', () => {
        assert.equal(solveEquation('2+2*3'), 8);
    });
    it('2*3+2 === 8', () => {
        assert.equal(solveEquation('2*3+2'), 8);
    });
    it('2+3/3-2 === 1', () => {
        assert.equal(solveEquation('2+3/3-2'), 1);
    });
    it('3/3+2*2 === 5', () => {
        assert.equal(solveEquation('3/3+2*2'), 5);
    });
});

describe('Операции со скобками', () => {
    it('(1) === 1', () => {
        assert.equal(solveEquation('(1)'), 1);
    });
    it('(1+1) === 2', () => {
        assert.equal(solveEquation('(1+1)'), 2);
    });
    it('(1+1)/2 === 1', () => {
        assert.equal(solveEquation('(1+1)/2'), 1);
    });
    it('2*(1+1)*2 === 8', () => {
        assert.equal(solveEquation('2*(1+1)*2'), 8);
    });
    it('-0.5*-2+(-3.123+0.123)/3 === 0', () => {
        assert.equal(solveEquation('-0.5*-2+(-3.123+0.123)/3'), 0);
    });
    it('-5+2*(2+2/4*4-10*-0.25+(1/4)-(0))/2 === 1.75', () => {
        assert.equal(solveEquation('-5+2*(2+2/4*4-10*-0.25+(1/4)-(0))/2'), 1.75);
    });
});