import React from 'react';
import PropTypes from 'prop-types';
import Main from 'src/Main';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    return this.setState({ hasError: true });
  }

  render() {
    return <Main />;
  }
}

App.propTypes = {
};

export default App;