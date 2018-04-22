import {
	SET_ACTIVE_FIGURE,
	UNSET_ACTIVE_FIGURE,
	SET_AVAILABLE_FIELDS,
	UNSET_AVAILABLE_FIELDS,
	SET_MOVE,
	REMOVE_FIGURE,
	CHANGE_PLAYER,
	SET_VICTORY
} from '../constants/actions';

import {
	WHITE,
	BLACK
} from '../constants/application';

import * as POS from '../constants/position';
import * as FIGURE from '../constants/figures';

export const initialState = {
	walk: WHITE,
	active: null,
	available: [],
	victory: false,
	figures: [
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
		},
		{
			id: 4,
			figure: FIGURE.PAWN,
			position: POS.D2,
			color: WHITE
		},
		{
			id: 5,
			figure: FIGURE.PAWN,
			position: POS.E2,
			color: WHITE
		},
		{
			id: 6,
			figure: FIGURE.PAWN,
			position: POS.F2,
			color: WHITE
		},
		{
			id: 7,
			figure: FIGURE.PAWN,
			position: POS.G2,
			color: WHITE
		},
		{
			id: 8,
			figure: FIGURE.PAWN,
			position: POS.H2,
			color: WHITE
		},
		{
			id: 9,
			figure: FIGURE.KNIGHT,
			position: POS.B1,
			color: WHITE
		},
		{
			id: 10,
			figure: FIGURE.KNIGHT,
			position: POS.G1,
			color: WHITE
		},
		{
			id: 11,
			figure: FIGURE.BISHOP,
			position: POS.C1,
			color: WHITE
		},
		{
			id: 12,
			figure: FIGURE.BISHOP,
			position: POS.F1,
			color: WHITE
		},
		{
			id: 13,
			figure: FIGURE.ROOK,
			position: POS.A1,
			color: WHITE
		},
		{
			id: 14,
			figure: FIGURE.ROOK,
			position: POS.H1,
			color: WHITE
		},
		{
			id: 15,
			figure: FIGURE.QUEEN,
			position: POS.D1,
			color: WHITE
		},
		{
			id: 16,
			figure: FIGURE.KING,
			position: POS.E1,
			color: WHITE
		},
		{
			id: 17,
			figure: FIGURE.PAWN,
			position: POS.A7,
			color: BLACK
		},
		{
			id: 18,
			figure: FIGURE.PAWN,
			position: POS.B7,
			color: BLACK
		},
		{
			id: 19,
			figure: FIGURE.PAWN,
			position: POS.C7,
			color: BLACK
		},
		{
			id: 20,
			figure: FIGURE.PAWN,
			position: POS.D7,
			color: BLACK
		},
		{
			id: 21,
			figure: FIGURE.PAWN,
			position: POS.E7,
			color: BLACK
		},
		{
			id: 22,
			figure: FIGURE.PAWN,
			position: POS.F7,
			color: BLACK
		},
		{
			id: 23,
			figure: FIGURE.PAWN,
			position: POS.G7,
			color: BLACK
		},
		{
			id: 24,
			figure: FIGURE.PAWN,
			position: POS.H7,
			color: BLACK
		},
		{
			id: 25,
			figure: FIGURE.KNIGHT,
			position: POS.B8,
			color: BLACK
		},
		{
			id: 26,
			figure: FIGURE.KNIGHT,
			position: POS.G8,
			color: BLACK
		},
		{
			id: 27,
			figure: FIGURE.BISHOP,
			position: POS.C8,
			color: BLACK
		},
		{
			id: 28,
			figure: FIGURE.BISHOP,
			position: POS.F8,
			color: BLACK
		},
		{
			id: 29,
			figure: FIGURE.ROOK,
			position: POS.A8,
			color: BLACK
		},
		{
			id: 30,
			figure: FIGURE.ROOK,
			position: POS.H8,
			color: BLACK
		},
		{
			id: 31,
			figure: FIGURE.QUEEN,
			position: POS.D8,
			color: BLACK
		},
		{
			id: 32,
			figure: FIGURE.KING,
			position: POS.E8,
			color: BLACK
		}
	],
};

export default function (state = initialState, action) {
	switch(action.type) {
		case SET_ACTIVE_FIGURE:
			return ({
				...state,
				active: action.id
			});
		case UNSET_ACTIVE_FIGURE:
			return ({
				...state,
				active: null
			});
		case SET_AVAILABLE_FIELDS:
			return ({
				...state,
				available: action.fields
			});
		case UNSET_AVAILABLE_FIELDS:
			return ({
				...state,
				available: []
			});
		case CHANGE_PLAYER:
			return ({
				...state,
				walk: state.walk === BLACK ? WHITE : BLACK
			});
		case SET_MOVE:
			return ({
				...state,
				figures: state.figures
					.map(figure => figure.position === state.active ? {...figure, position: action.id} : figure)
			});
		case REMOVE_FIGURE:
			return ({
				...state,
				figures: state.figures
					.filter(figure => figure.position !== action.id)
			});
		case SET_VICTORY:
			return ({
				...state,
				victory: true
			});
		default:
			return state;
	}
}
