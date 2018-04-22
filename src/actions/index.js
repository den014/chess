import getMoves from '../utils/moves';
import {checkVictory} from '../utils/fields';

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

// Положить в стейт номер активного поля.
export const setActiveFigure = id => ({
	type: SET_ACTIVE_FIGURE,
	id
});

// Очистить стейт от номера активного поля.
export const unsetActiveFigure = () => ({
	type: UNSET_ACTIVE_FIGURE
});

// Положить в стейт массив с номерами доступных полей.
export const setAvailableFields = fields => ({
	type: SET_AVAILABLE_FIELDS,
	fields
});

// Очистить стейт от массива с номерами доступных полей.
export const unsetAvailableFields = () => ({
	type: UNSET_AVAILABLE_FIELDS
});

// Изменить положение активной фигуры.
export const setMove = id => ({
	type: SET_MOVE,
	id
});

// Изменить активный цвет.
export const changePlayer = () => ({
	type: CHANGE_PLAYER
});

// Удалить фигуру.
export const removeFigure = id => ({
	type: REMOVE_FIGURE,
	id
});

// Изменить состояние игры на "завершенное".
export const setVictory = () => ({
	type: SET_VICTORY
});


export const setNewMove = id =>
	function setNewMoveThunk(dispatch) {
		// Выполняем переход на новое поле.
		dispatch(setMove(id));

		// Достаем значение состояния игры на данный момент.
		const isVictory = dispatch(checkVictory());

		// В случае положительного результата, завершаем игру.
		if (isVictory) {
			dispatch(setVictory());
			return;
		}

		// В противном случае меняем цвет активного игрока.
		dispatch(changePlayer());
	};

// Функция для поиска доступных полей.
export const getAvailableFields = () =>
	function getAvailableFieldsThunk(dispatch, getState) {
		const state = getState();
		const {active, figures} = state.application;
		const {figure, position, color} = figures.find(figure => figure.position === active);

		// Диспатчим экшен для изменения доступных полей в стейте.
		// Аргументом передаем ей результат выполнения функции поиска подходящих полей (линейно).
		dispatch(setAvailableFields(getMoves[color][figure](position, figures, color)));
	};