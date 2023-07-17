import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import { store } from './services/index';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/react-burger-eng">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
