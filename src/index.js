import 'babel-polyfill'

// For material-ui, might not needed after React 1.0 is released
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Sync "window.location" with "routing" object in store so that
// reducers can access route params without a window DOM reference
import configureStore from './store/configureStore.dev'
import { useRouterHistory } from 'react-router' //coupling between History and Router with simpler APIs
import { createHashHistory } from 'history'
import { syncHistory, syncHistoryWithStore } from 'react-router-redux'
// import MuiThemeProvider from 'material-ui/MuiThemeProvider'

const store = configureStore(window.__INITIAL_STATE__)

const history = syncHistoryWithStore(useRouterHistory(createHashHistory)({ queryKey: false }), store);

// Render the app
import React from 'react'
import { render } from 'react-dom'
import App from './app/App'

// const MyApp = () => (
//   <MuiThemeProvider>
//     <App />
//   </MuiThemeProvider>
// );

render(<App store={store} history={history}/>, document.getElementById('root'))
