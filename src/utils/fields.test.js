import {getField} from './fields';


describe('fields test', () => {
	test('get field id', () => {
		expect(getField(1, 2)).toBe('1/2');
		expect(getField(5, 7)).toBe('5/7');
		expect(getField(1, 2)).toBe('1/2');
		expect(getField(4, 1)).toBe('4/1');
		expect(getField(7, 6)).toBe('7/6');
	});
});
