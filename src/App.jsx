import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Redux/Store';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Use persistor here */}
        <Navbar />
        <Outlet />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default App;