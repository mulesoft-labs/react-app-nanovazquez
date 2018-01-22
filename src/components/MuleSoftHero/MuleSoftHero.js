import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mulesoft/anypoint-icons/lib/Icon';

import styles from './styles.scss';

const propTypes = {
  message: PropTypes.string,
};

const defaultProps = {
  message: 'Welcome to React',
};

class MuleSoftHero extends React.PureComponent {
  render() {
    const { message } = this.props;
    return (
      <div className={styles.hero}>
        <h2 data-test-id="message-container" className={styles.title}>{ message }</h2>
        <Icon className={styles.logo} name="mulesoft-logo" size="m" />
      </div>
    );
  }
}

MuleSoftHero.propTypes = propTypes;
MuleSoftHero.defaultProps = defaultProps;
export default MuleSoftHero;
