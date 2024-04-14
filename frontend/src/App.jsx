import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import LandingPage from './components/LandingPage/LandingPage';
import ProductDetailPage from './components/ProductDetailPage/ProductDetailPage';
import AddInventory from './components/Inventory/AddInventory'
import EditProduct from './components/Inventory/EditProduct';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/Products/:itemId',
        element: <ProductDetailPage />
      },
      {
        path: `/products/add`,
        element: <AddInventory />
      },
      {
        path: '/products/:itemId/edit',
        element: <EditProduct />
      },

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
