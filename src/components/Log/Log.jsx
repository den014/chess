import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getMoves, pushMove} from '../../utils/log';

import './Log.scss';
import PropTypes from 'prop-types';


class Log extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps) {
		const {active: prevField, figures} = this.props;
		const {figures: nextFigures} = nextProps;

		// При получении новых пропсов, делаем проверку на то, имеется ли номер активного поля.
		if (prevField) {
			// При переходе по старому значению, находим в глобальном стейте конфигурацию фигуры.
			const figureConfig =
				figures.map(figure => figure.position === prevField ? figure : null).find(f => f !== null);
			// По полученному идентификатору фигуры, находим ее нынешнее положение и достаем его.
			const secondPosition =
				nextFigures.map(({id, position}) => id === figureConfig.id ? position : null).find(f => f !== null);

			// Отправляем данные в log api.
			pushMove(figureConfig, secondPosition);
		}
	}

	getTitle() {
		const {walk, victory} = this.props;
		let title;

		// В зависимости от текущего состояния данных, формируем текст заголовка.
		if (victory) {
			title = `Победил: ${walk}`;
		} else {
			title = `Сейчас ходит: ${walk}`;
		}

		return title;
	}

	render() {
		const moves = getMoves();
		const title = this.getTitle();

		return (
			<div className="chess-log">
				<div className="chess-log-info">
					{title}
				</div>

				<div className="chess-log-moves">
					{/* Мапимся по массиву логов и выводим результат */}
					{moves && moves.map(({id, figure, color, position, secondPosition}) =>
						<div
							key={id}
							className="chess-log-move"
						>
							<b>{color}</b> ({figure}) : {position} => {secondPosition}
						</div>
					)}
				</div>
			</div>
		);
	}
}

Log.defaultProps = {
	active: null
};

Log.propTypes = {
	active: PropTypes.string,
	figures: PropTypes.array.isRequired,
	walk: PropTypes.string.isRequired,
	victory: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
	const {active, figures, walk, victory} = state.application;

	return {
		active,
		figures,
		walk,
		victory
	};
}

export default connect(mapStateToProps)(Log);
