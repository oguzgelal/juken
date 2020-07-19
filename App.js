import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppearanceProvider } from 'react-native-appearance';

import Main from 'src/Main';
import Message from 'src/screens/Message/Message'
import device from 'src/utils/device';
import store from 'src/features/store';

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
        <StoreProvider store={store}>
          <AppearanceProvider>
            <ActionSheetProvider>
              <>
                {!this.state.hasError && <Main/>}
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
          </AppearanceProvider>
        </StoreProvider>
      </SafeAreaProvider>
    );
  }
}

App.propTypes = {};

export default App;