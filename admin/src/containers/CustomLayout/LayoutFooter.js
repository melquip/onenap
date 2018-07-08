import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	children: PropTypes.node,
};

const defaultProps = {};

class LayoutFooter extends Component {
	render() {
		// eslint-disable-next-line
		const {children, ...attributes} = this.props;
		return (
			<React.Fragment>
				<span><a href="https://onenapp.io">onenapp</a> &copy; 2018 Melquisedeque Pereira.</span>
				<span className="ml-auto">Powered by <a href="https://coreui.io/react">NodeJS, React, CoreUI</a></span>
			</React.Fragment>
		);
	}
}

LayoutFooter.propTypes = propTypes;
LayoutFooter.defaultProps = defaultProps;

export default LayoutFooter;
