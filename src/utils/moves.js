import {getField} from '../utils/fields';

import * as FIGURE from '../constants/figures';
import {BLACK, WHITE} from '../constants/application';

import lines from '../config/lines';

/*
	Moves.js - Логика для поиска доступных полей.
*/

// Проверка - требуется для фигур высшего порядка.
// На вход принимает массив фигур на поле, второй аргумент: предыдущее доступное поле и цвет.
// Пример: Слон A1, вражеская пешка А5. Чтобы слон не мог ее перепрыгнуть, данная функция выполняет работу флага,
// говорящего о том, что есть вражеская преграда.
export const checkBarrier = (figures, prevPosition, color) =>
	!figures.find(figure => figure.position === prevPosition && figure.color !== color);

// Практически идентичная проверка как на вражескую фигуру, но в данном случае, фигура дружественная.
// Разделено, потому что в случае с вражеской фигурой, ее поле можно занять, путем ликвидации.
export const checkIsFieldNotHasFriendlyFigure = (figures, position, color) =>
	!figures.find(figure => figure.position === position && figure.color === color);


// Функция для поиска доступных ходов для коней.
const getKnightMoves = (position, figures, color) => {
	const pos = position.split('/');
	const horizontal = Number(pos[0]);
	const vertical = Number(pos[1]);

	// Собираем массив из всех возможных ходов.
	const moves = [
		getField(horizontal - 1, vertical + 2),
		getField(horizontal - 1, vertical - 2),
		getField(horizontal + 1, vertical + 2),
		getField(horizontal + 1, vertical - 2),
		getField(horizontal - 2, vertical + 1),
		getField(horizontal - 2, vertical - 1),
		getField(horizontal + 2, vertical + 1),
		getField(horizontal + 2, vertical - 1)
	];

	// Фильтруем его от занятых дружественными фигурами, полей.
	return moves
		.map(move => figures.find(figure => figure.position === move && figure.color === color) ? null : move)
		.filter(move => move !== null); // Очищаем от null.
};

// Функция для поиска доступных ходов для ферзей.
const getBishopMoves = (position, figures, color) => {
	// Сплитим идентификатор поля, чтобы получить значение горизонтали и вертикали.
	const pos = position.split('/');
	const horizontal = Number(pos[0]);
	const vertical = Number(pos[1]);
	const available = [];

	// Флаги - реагируют на результат выполнения: checkBarrier и checkIsFieldNotHasFriendlyFigure.
	// Требуются для того, чтобы поля за пределами преграды, не были доступны.
	let isTopLeftNotLock = true;
	let isTopRightNotLock = true;
	let isBottomLeftNotLock = true;
	let isBottomRightNotLock = true;

	// Пробегаем в цикле по всем рядом.
	lines.forEach((line, index) => {
		// Проверяем доступные поля (низ/лево).
		if (vertical - index > 0 && horizontal - index > 0 && index !== 0) {
			const isNoBarrier =
				checkBarrier(figures, getField(horizontal + 1 - index, vertical + 1 - index), color);
			const isNoFriendlyFigure =
				checkIsFieldNotHasFriendlyFigure(figures, getField(horizontal - index, vertical - index), color);

			if (isNoBarrier && isNoFriendlyFigure && isBottomLeftNotLock) {
				// Если все условия выполнены, пушаем значение поля в массив available.
				available.push(getField(horizontal - index, vertical - index));
			} else {
				// Если была обнаружена преграда, закрываем доступ к линии (низ/лево).
				isBottomLeftNotLock = false;
			}
		}

		// Проверяем доступные поля (верх/лево).
		// Структура кода аналогична, отличается только алгоритм и флаг.
		if (horizontal - index > 0 && index !== 0) {
			const isNoBarrier =
				checkBarrier(figures, getField(horizontal + 1 - index, vertical - 1 + index), color);
			const isNoFriendlyFigure =
				checkIsFieldNotHasFriendlyFigure(figures, getField(horizontal - index, vertical + index), color);

			if (isNoBarrier && isNoFriendlyFigure && isTopLeftNotLock) {
				available.push(getField(horizontal - index, vertical + index));
			} else {
				isTopLeftNotLock = false;
			}
		}

		// Проверяем доступные поля (верх/право).
		if (vertical + index < 9 && index !== 0) {
			const isNoBarrier =
				checkBarrier(figures, getField(horizontal - 1 + index, vertical - 1 + index), color);
			const isNoFriendlyFigure =
				checkIsFieldNotHasFriendlyFigure(figures, getField(horizontal + index, vertical + index), color);

			if (isNoBarrier && isNoFriendlyFigure && isTopRightNotLock) {
				available.push(figures, getField(horizontal + index, vertical + index));
			} else {
				isTopRightNotLock = false;
			}
		}

		// Проверяем доступные поля (низ/право).
		if (vertical - index > 0 && index !== 0) {
			const isNoBarrier =
				checkBarrier(figures, getField(horizontal - 1 + index, vertical + 1 - index), color);
			const isNoFriendlyFigure =
				checkIsFieldNotHasFriendlyFigure(figures, getField(horizontal + index, vertical - index), color);

			if (isNoBarrier && isNoFriendlyFigure && isBottomRightNotLock) {
				available.push(getField(horizontal + index, vertical - index));
			} else {
				isBottomRightNotLock = false;
			}
		}
	});

	// Отдаем результат.
	return available;
};

// Функция для поиска доступных ходов для слона.
// Логика функции аналогична getBishopMoves(),
// только флаги служат для сторон (лево/право/верх/низ) и другие алгоритмы.
const getRookMoves = (position, figures, color) => {
	const pos = position.split('/');
	const horizontal = Number(pos[0]);
	const vertical = Number(pos[1]);
	const available = [];

	let isTopNotLock = true;
	let isBottomNotLock = true;
	let isLeftNotLock = true;
	let isRightNotLock = true;

	lines.forEach((line, index) => {
		if (vertical - index > 0 && index !== 0) {
			const isNoBarrier =
				checkBarrier(figures, getField(horizontal, vertical + 1 - index), color);
			const isNoFriendlyFigure =
				checkIsFieldNotHasFriendlyFigure(figures, getField(horizontal, vertical - index), color);

			if (isNoBarrier && isNoFriendlyFigure && isBottomNotLock) {
				available.push(getField(horizontal, vertical - index));
			} else {
				isBottomNotLock = false;
			}
		}

		if (vertical + index < 9 && index !== 0) {
			const isNoBarrier =
				checkBarrier(figures, getField(horizontal, vertical - 1 + index), color);
			const isNoFriendlyFigure =
				checkIsFieldNotHasFriendlyFigure(figures, getField(horizontal, vertical + index), color);

			if (isNoBarrier && isNoFriendlyFigure && isTopNotLock) {
				available.push(getField(horizontal, vertical + index));
			} else {
				isTopNotLock = false;
			}
		}

		if (horizontal - index > 0 && index !== 0) {
			const isNoBarrier =
				checkBarrier(figures, getField(horizontal + 1 - index, vertical), color);
			const isNoFriendlyFigure =
				checkIsFieldNotHasFriendlyFigure(figures, getField(horizontal - index, vertical), color);

			if (isNoBarrier && isNoFriendlyFigure && isLeftNotLock) {
				available.push(getField(horizontal - index, vertical));
			} else {
				isLeftNotLock = false;
			}
		}

		if (horizontal + index < 9 && index !== 0) {
			const isNoBarrier =
				checkBarrier(figures, getField(horizontal - 1 + index, vertical), color);
			const isNoFriendlyFigure =
				checkIsFieldNotHasFriendlyFigure(figures, getField(horizontal + index, vertical), color);

			if (isNoBarrier && isNoFriendlyFigure && isRightNotLock) {
				available.push(getField(horizontal + index, vertical));
			} else {
				isRightNotLock = false;
			}
		}
	});

	return available;
};

// Функция для поиска доступных ходов для дамы.
// Объединяет в себе результат выполнения функций для ферзя и слона.
const getQueenMoves = (position, figures, color) => {
	const bishopMoves = getBishopMoves(position, figures, color);
	const rookMoves = getRookMoves(position, figures, color);

	return [
		...bishopMoves,
		...rookMoves
	];
};

// Функция для поиска доступных ходов для короля.
const getKingMoves = (position, figures, color) => {
	const pos = position.split('/');
	const horizontal = Number(pos[0]);
	const vertical = Number(pos[1]);
	// Собираем массив из всех возможных ходов.
	const moves = [
		getField(horizontal, vertical + 1),
		getField(horizontal, vertical - 1),
		getField(horizontal + 1, vertical),
		getField(horizontal - 1, vertical),
		getField(horizontal - 1, vertical - 1),
		getField(horizontal + 1, vertical + 1),
		getField(horizontal - 1, vertical + 1),
		getField(horizontal + 1, vertical - 1)
	];

	// Возвращаем результат выполнения цикла.
	// Т.к король может ходить только на одно поле, поиск преграды в лице вражеской фигуры, не требуется.
	return moves.map(move => {
		if (checkIsFieldNotHasFriendlyFigure(figures, move, color)) {
			return move;
		}

		return null;
	}).filter(m => m !== null); // Очищаем результат от null
};

/*
	Объект, хранящий в себе все вызовы функций для поиска доступных ходов для фигур.
	Почему так - чтобы не нужно было указывать множесто if и/или кострукцию switch, тем самым затормаживать процесс,
	усложнять код и его читабельность.
	Достаточно вызвать func[цвет фигуры][название фигуры](позиция фигуры, массив со всеми фигурами, цвет).
*/
export default {
	[WHITE]: {
		// Функция для поиска доступных ходов для пешки.
		// В случае пешки, нет необходимости выводить ее в оидельную функцию, т.к. она практически вся
		// состоит из алгоритмов.
		[FIGURE.PAWN]: (position, figures) => {
			const pos = position.split('/');
			const horizontal = Number(pos[0]);
			const vertical = Number(pos[1]);
			// Узнаем свободно ли поле +1 по вертикали.
			// Почему не используем checkBarrier() - потому что нам не важно какой команды фигура,
			// нам нужно узнать свободно ли поле.
			const isBarrierForField = figures
				.find(figure => figure.position === getField(horizontal, vertical + 1));
			// Узнаем свободно ли поле +2 по вертикали.
			const isBarrierForSecondField = figures
				.find(figure => figure.position === getField(horizontal, vertical + 2));
			// Узнаем есть ли вражеская фигура слева.
			const isEnemyLeft = !checkBarrier(figures, getField(horizontal - 1, vertical + 1), WHITE);
			// Узнаем есть ли вражеская фигура справа.
			const isEnemyRight = !checkBarrier(figures, getField(horizontal + 1, vertical + 1), WHITE);
			const available = [];

			// Если +1 по вертикали свободно, пушаем в массив новое доступное поле.
			if (!isBarrierForField) {
				available.push(getField(horizontal, vertical + 1));

				// Если пешка находится в начальном положении и +2 по вертикали свободно, добавляем в массив.
				if (vertical === 2 && !isBarrierForSecondField) {
					available.push(getField(horizontal, vertical + 2));
				}
			}

			// Если вражеская фигура присутствует слева от пешки, добавляем в массив.
			if (isEnemyLeft) {
				available.push(getField(horizontal - 1, vertical + 1));
			}

			// Если вражеская фигура присутствует справа от пешки, добавляем в массив.
			if (isEnemyRight) {
				available.push(getField(horizontal + 1, vertical + 1));
			}

			// Отдаем результат.
			return available;
		},
		[FIGURE.KNIGHT]: getKnightMoves,
		[FIGURE.BISHOP]: getBishopMoves,
		[FIGURE.ROOK]: getRookMoves,
		[FIGURE.QUEEN]: getQueenMoves,
		[FIGURE.KING]: getKingMoves
	},
	[BLACK]: {
		// Аналогично как и для пешки белого цвета, только алгоритмы используются в отрицательную сторону.
		[FIGURE.PAWN]: (position, figures) => {
			const pos = position.split('/');
			const horizontal = Number(pos[0]);
			const vertical = Number(pos[1]);
			const isBarrierForField = figures
				.find(figure => figure.position === getField(horizontal, vertical - 1));
			const isBarrierForSecondField = figures
				.find(figure => figure.position === getField(horizontal, vertical - 2));
			const isEnemyLeft = !checkBarrier(figures, getField(horizontal + 1, vertical - 1), BLACK);
			const isEnemyRight = !checkBarrier(figures, getField(horizontal - 1, vertical - 1), BLACK);
			const available = [];

			if (!isBarrierForField) {
				available.push(getField(horizontal, vertical - 1));

				if (vertical === 7 && !isBarrierForSecondField) {
					available.push(getField(horizontal, vertical - 2));
				}
			}

			if (isEnemyLeft) {
				available.push(getField(horizontal + 1, vertical - 1));
			}

			if (isEnemyRight) {
				available.push(getField(horizontal - 1, vertical - 1));
			}

			return available;
		},
		[FIGURE.KNIGHT]: getKnightMoves,
		[FIGURE.BISHOP]: getBishopMoves,
		[FIGURE.ROOK]: getRookMoves,
		[FIGURE.QUEEN]: getQueenMoves,
		[FIGURE.KING]: getKingMoves
	}
};