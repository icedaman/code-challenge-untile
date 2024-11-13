import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { useState } from 'react';
import CryptoCalculator from './components/CryptoCalculator';
import Tickers from './components/Tickers';

function App() {
  const [history, setHistory] = useState([]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<CryptoCalculator history={history} setHistory={setHistory} />} />
        <Route path='/tickers' element={<Tickers />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
