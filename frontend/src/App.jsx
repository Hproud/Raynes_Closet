import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import * as sessionActions from "./store/session";
import LandingPage from "./components/LandingPage/LandingPage";
import ProductDetailPage from "./components/ProductDetailPage/ProductDetailPage";
import AddInventory from "./components/Inventory/AddInventory";
import EditProduct from "./components/Inventory/EditProduct";
import Checkout from "./components/Cart/Checkout";
import OrdersPage from "./components/OrderPage/OrdersPage";
import OrderInfoPage from "./components/OrderPage/OrderInfoPage";
import UpdateStatus from "./components/OrderPage/UpdateStatus";
import ViewInventory from "./components/Inventory/ViewInventory";
import EditInv from "./components/Inventory/EditInv";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
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
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/Products/:itemId",
        element: <ProductDetailPage />,
      },
      {
        path: `/products/add`,
        element: <AddInventory />,
      },
      {
        path: "/products/:itemId/edit",
        element: <EditProduct />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path:'/orders',
        element: <OrdersPage />
          },
          {
        path: '/orders/:orderId',
        element: <OrderInfoPage />
              },
              {
        path:'/orders/:orderId/edit',
        element: <UpdateStatus />
      },
      {
        path: '/inventory',
        element: <ViewInventory/>
      },
      {
        path: '/inventory/:itemId',
        element: <EditInv />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
