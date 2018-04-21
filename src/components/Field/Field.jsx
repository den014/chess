import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';

import './Field.scss';
import './Figures.scss';
import PropTypes from 'prop-types';

// Нет смысла создавать класс, используем функциональную компоненту
function Field(props) {
	const {id, active, isAvailable, onClick, figure, disabled} = props;

	return (
		<button
			key={id}
			className={classNames(
				'chess-board-field',
				{'event-active': active === id},
				{'event-available': isAvailable}
			)}
			disabled={disabled}
			onClick={() => onClick()}
		>
			{figure &&
			<span
				className={classNames(
					'chess-board-figure',
					`chess-board-figure-${figure.color}-${figure.figure}`
				)}
			/>
			}
		</button>
	);
}

Field.defaultProps = {
	active: null,
	figure: null
};

Field.propTypes = {
	id: PropTypes.string.isRequired,
	isAvailable: PropTypes.bool.isRequired,
	figure: PropTypes.object,
	disabled: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
	active: PropTypes.string,
	figures: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	const {active, figures} = state.application;

	return {
		active,
		figures
	};
}

export default connect(mapStateToProps)(Field);
