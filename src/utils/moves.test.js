import move, {
	checkBarrier,
	checkIsFieldNotHasFriendlyFigure
} from './moves';
import * as FIGURE from '../constants/figures';
import {WHITE, BLACK} from '../constants/application';
import * as POS from '../constants/position';


const figures = [
	{
		id: 1,
		figure: FIGURE.PAWN,
		position: POS.A2,
		color: WHITE
	},
	{
		id: 2,
		figure: FIGURE.PAWN,
		position: POS.B2,
		color: WHITE
	},
	{
		id: 3,
		figure: FIGURE.PAWN,
		position: POS.C2,
		color: WHITE
	}
];

const figures2 = [
	{
		id: 1,
		figure: FIGURE.PAWN,
		position: POS.A2,
		color: WHITE
	},
	{
		id: 2,
		figure: FIGURE.PAWN,
		position: POS.A4,
		color: WHITE
	},
	{
		id: 3,
		figure: FIGURE.PAWN,
		position: POS.A5,
		color: WHITE
	},
	{
		id: 4,
		figure: FIGURE.PAWN,
		position: POS.A4,
		color: WHITE
	}
];


describe('move test - checkBarrier', () => {
	test('checkBarrier - to be true', () => {
		expect(checkBarrier(figures, '1/1', WHITE)).toBe(true);
	});

	test('checkBarrier - to be true', () => {
		expect(checkBarrier(figures, '1/3', WHITE)).toBe(true);
	});

	test('checkBarrier - to be true', () => {
		expect(checkBarrier(figures, '1/2', WHITE)).toBe(true);
	});
});

describe('move test - checkIsFieldNotHasFriendlyFigure', () => {
	test('checkIsFieldNotHasFriendlyFigure - to be false', () => {
		expect(checkIsFieldNotHasFriendlyFigure(figures, '1/2', WHITE)).toBe(false);
	});

	test('checkIsFieldNotHasFriendlyFigure - to be true', () => {
		expect(checkIsFieldNotHasFriendlyFigure(figures, '1/2', BLACK)).toBe(true);
	});
});

describe('move test - move[WHITE][FIGURE.PAWN]', () => {
	test('move - toEqual [\'1/3\', \'1/4\']', () => {
		expect(move[WHITE][FIGURE.PAWN]('1/2', figures, WHITE)).toEqual(['1/3', '1/4']);
	});

	test('move - toEqual [\'1/3\']', () => {
		expect(move[WHITE][FIGURE.PAWN]('1/2', figures2, WHITE)).toEqual(['1/3']);
	});

});

describe('move test - move[BLACK][FIGURE.PAWN]', () => {
	test('move - toEqual [\'5/6\', \'5/5\']', () => {
		expect(move[BLACK][FIGURE.PAWN]('5/7', figures, WHITE)).toEqual(['5/6', '5/5']);
	});

	test('move - toEqual [\'1/6\']', () => {
		expect(move[BLACK][FIGURE.PAWN]('1/7', figures2, WHITE)).toEqual(['1/6']);
	});
});

describe('move test - figures test', () => {
	test('move KNIGHT - toEqual [\'2/8\', \'2/4\', \'4/8\', \'4/4\', \'1/7\', \'1/5\', \'5/7\', \'5/5\']', () => {
		expect(move[WHITE][FIGURE.KNIGHT]('3/6', figures, WHITE)).toEqual(['2/8', '2/4', '4/8', '4/4', '1/7', '1/5', '5/7', '5/5']);
	});

	test('move ROOK - toEqual [\'2/3\', \'3/3\', \'4/3\', \'5/3\', \'6/3\', \'7/3\', \'8/3\']', () => {
		expect(move[WHITE][FIGURE.ROOK]('1/3', figures2, WHITE)).toEqual(['2/3', '3/3', '4/3', '5/3', '6/3', '7/3', '8/3']);
	});

	test('move KING - toEqual [\'3/5\', \'3/3\', \'4/4\', \'2/4\', \'2/3\', \'4/5\', \'2/5\', \'4/3\']', () => {
		expect(move[WHITE][FIGURE.KING]('3/4', figures2, WHITE)).toEqual(['3/5', '3/3', '4/4', '2/4', '2/3', '4/5', '2/5', '4/3']);
	});
});
