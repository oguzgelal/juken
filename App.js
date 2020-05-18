import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Main from 'src/Main';
import Message from 'src/screens/Message/Message'
import device from 'src/utils/device';
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
      errorMessage: device('web')
        ? e.stack
        : `${e.toString()}\n${e.stack}`,
    });
  }

  render() {
    return (
      <SafeAreaProvider>
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
                      "Something went wrong and Juken has crashed. Reporting " +
                      "this error along with the screenshot of this screen and " +
                      "steps of reproduction would be very much appreciated!"
                    }
                  />
                )}
              </>
            </ActionSheetProvider>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

App.propTypes = {
};

export default App;