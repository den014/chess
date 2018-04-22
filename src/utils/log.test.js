import {pushMove, getMoves} from './log';

const moveData = {
	id: 1,
	figure: 'spawn',
	color: 'WHITE',
	position: '1/2'
};

const secondPosition = '1/3';

describe('log test', () => {
	test('push and get back information about move', () => {
		pushMove(moveData, secondPosition);

		expect(getMoves()).toEqual([{...moveData, secondPosition}]);
	});

	test('move array length is 4', () => {
		pushMove(moveData, secondPosition);
		pushMove(moveData, secondPosition);
		pushMove(moveData, secondPosition);

		expect(getMoves().length).toBe(4);
	});

	test('move array length is not 5', () => {
		expect(getMoves().length).not.toBe(5);
	});
});