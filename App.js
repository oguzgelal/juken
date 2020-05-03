import React from 'react';
import PropTypes from 'prop-types';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from 'src/Main';
import Loading from 'src/screens/Loading'
import { store, persistor } from 'src/redux/store';

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
    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <ActionSheetProvider>
            <Main />
          </ActionSheetProvider>
        </PersistGate>
      </Provider>
    );
  }
}

App.propTypes = {
};

export default App;