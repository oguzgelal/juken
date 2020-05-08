import React from 'react';
import PropTypes from 'prop-types';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from 'src/Main';
import Message from 'src/screens/Message'
import theme from 'src/common/theme';
import os from 'src/utils/os';
import { store, persistor } from 'src/features/store';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(e) {
    return this.setState({
      hasError: true,
      errorMessage: os('web')
        ? e.stack
        : `${e.toString()}\n${e.stack}`,
    });
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Message loading />} persistor={persistor}>
          <ActionSheetProvider>
            <>
              {!this.state.hasError && <Main />}
              {this.state.hasError && (
                <Message
                  error
                  title="ごめんなさい！"
                  errorMessage={this.state.errorMessage}
                  description={
                    "Something went wrong and WaniAnki has crashed. Reporting " +
                    "this error along with the message below and steps of reproduction " +
                    "would be very much appreciated!"
                  }
                />
              )}
            </>
          </ActionSheetProvider>
        </PersistGate>
      </Provider>
    );
  }
}

App.propTypes = {
};

export default App;