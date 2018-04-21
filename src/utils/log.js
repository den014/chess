// Маленькое API, для хранения ходов

const moves = [];

export const pushMove = ({id, figure, color, position}, secondPosition) => {
	moves.push({
		id,
		figure,
		color,
		position,
		secondPosition
	});
};

export const getMoves = () => moves;

