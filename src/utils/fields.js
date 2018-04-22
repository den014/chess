import {
	KING
} from '../constants/figures';

// Возвращаем правильный идентификатор поля
export const getField = (horizontal, vertical) =>
	`${horizontal}/${vertical}`;

// Проверка состояния игры
export const checkVictory = () =>
	function checkVictoryThunk(dispatch, getSTate) {
		const state = getSTate();
		const isKingFigure = state.application.figures.filter(figure => figure.figure === KING);

		return isKingFigure.length !== 2;
	};