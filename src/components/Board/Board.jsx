import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Field from '../Field/Field';
import Log from '../Log/Log';

import lines from '../../config/lines';
import fields from '../../config/fields';
import {
	setActiveFigure,
	unsetActiveFigure,
	getAvailableFields,
	unsetAvailableFields,
	setNewMove,
	removeFigure
} from '../../actions';

import {
	ODD,
	EVEN
} from '../../constants/application';

import './Board.scss';


class Board extends Component {
	// Проверка - можно ли сделать ход на данное поле.
	// Аргументом принимает идентификатор поля и сравниваем с глобальным стейтом.
	isAvailableField(field) {
		const isAvailable = this.props.available.find(fl => fl === field);

		return !!isAvailable;
	}

	// Проверка - будет ли поле заблокировано.
	isDisabledField(id) {
		const {figures, walk, victory} = this.props;
		const figure = figures.find(figure => figure.position === id);

		// Проверка - доступно ли поле для хода.
		const isAvailable = this.isAvailableField(id);
		// Проверка - есть ли на данном поле фигура.
		const isNoFigureAndAvailableMove = !figure && !isAvailable;
		// Проверка для блокировки полей с фигурами противоположного цвета.
		const isNotActiveColor = figure && !isAvailable && figure.color !== walk;

		// Отдаем результат, дополнительно проверив что игра не закончена.
		// В случае победы (ликвидирования короля), вся доска будет заблокирована.
		return isNoFigureAndAvailableMove || isNotActiveColor || victory;
	}

	// Выставляем фигуры на доске.
	setFigure(field) {
		const figure = this.props.figures.find(figure => figure.position === field);

		if (figure) {
			return {
				figure: figure.figure,
				color: figure.color
			};
		}

		return null;
	}

	// Выставляем подходящее действие.
	// При нажатии на поле, могут произойти несколько вариантов событий:
	// Пользователь нажал на фигуру (фокус и поиск подходящих ходов);
	// Пользователь повторно нажал на фигуру (убрать фокус, убрать ходы);
	// Пользователь сделал ход (запустить соответствующий экшен);
	// Пользователь напал на вражескую фигуру (сделать ход и дополнительно удалить фигуру из глобального стейта).
	setMoveAction(field) {
		const {
			unsetActiveFigure,
			unsetAvailableFields,
			setActiveFigure,
			getAvailableFields,
			removeFigure,
			setNewMove,
			active,
			figures
		} = this.props;
		const isAvailableField = this.isAvailableField(field);
		const isFigureInNextField = figures.find(figure => figure.position === field);

		// Если поле доступно и на нем находится вражеская фигура, удаляем ее.
		if (isAvailableField && isFigureInNextField) {
			removeFigure(field);
		}

		// Если поле доступно, переходим на него.
		if (isAvailableField) {
			setNewMove(field);
		}

		// Если пользователь нажимает второй раз по фигуре, убираем фокус (очищаем стейт: active, available).
		// Заканчиваем выполнение.
		if (active === field || isAvailableField) {
			unsetActiveFigure();
			unsetAvailableFields();
			return;
		}

		// Фокус на фигуре.
		setActiveFigure(field);
		getAvailableFields();
	}

	render() {
		return (
			<div className="chess-board-wrap">
				<div className="chess-board">
					<div className="chess-board-container">
						{/* Создаем ряды на доске */}
						{lines.map(line =>
							<div
								key={line.id}
								className={classNames(
									'chess-board-line',
									{'chess-board-line-odd': line.position === ODD},
									{'chess-board-line-even': line.position === EVEN}
								)}
							>
								{/* Создаем поля и отдаем пропсы для правильной отрисовки логики каждого поля */}
								{fields[line.id].map(field =>
									<Field
										key={field.id}
										id={field.id}
										isAvailable={this.isAvailableField(field.id)}
										figure={this.setFigure(field.id)}
										disabled={this.isDisabledField(field.id)}
										onClick={() => this.setMoveAction(field.id)}
									/>
								)}
							</div>
						)}
					</div>

					{/*Добавляем окно информации*/}
					<Log />
				</div>
			</div>
		);
	}
}

Board.defaultProps = {
	active: null
};

Board.propTypes = {
	figures: PropTypes.array.isRequired,
	available: PropTypes.array.isRequired,
	active: PropTypes.string,
	walk: PropTypes.string.isRequired,
	victory: PropTypes.bool.isRequired,
	setActiveFigure: PropTypes.func.isRequired,
	unsetActiveFigure: PropTypes.func.isRequired,
	getAvailableFields: PropTypes.func.isRequired,
	unsetAvailableFields: PropTypes.func.isRequired,
	setNewMove: PropTypes.func.isRequired,
	removeFigure: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	const {figures, available, active, walk, victory} = state.application;
	return {
		figures,
		available,
		active,
		walk,
		victory
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		setActiveFigure,
		unsetActiveFigure,
		getAvailableFields,
		unsetAvailableFields,
		setNewMove,
		removeFigure
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Board);
