import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from 'src/Main';
import Message from 'src/screens/Message'
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
            <SafeAreaProvider>
              <>
                {!this.state.hasError && <Main />}
                {this.state.hasError && (
                  <Message
                    error
                    title="ごめんなさい！"
                    errorMessage={this.state.errorMessage}
                    description={
                      "Something went wrong and WaniAnki has crashed. Reporting " +
                      "this error along with the screenshot of this screen and " +
                      "steps of reproduction would be very much appreciated!"
                    }
                  />
                )}
              </>
            </SafeAreaProvider>
          </ActionSheetProvider>
        </PersistGate>
      </Provider>
    );
  }
}

App.propTypes = {
};

export default App;