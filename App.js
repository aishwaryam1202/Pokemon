import ReactDOM from 'react-dom/client';
import Header from './src/Components/Header';
import Body from './src/Components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import PokemonPage from './src/Components/PokemonPage';
import NotFoundPokemonPage from './src/Components/NotFoundPokemonPage';
/**
 * 
 * Header
 * * Logo
 * * Title
 * Body
 * * DropDown Bar
 * * Pokemon Container 
 * * * Pokemon Card 1
 * * * Pokemon Card 1
 * * * Pokemon Card 1
 * 
 */


const App = () => {
    return (
      <div className="App Layout">
        {" "}
        <Header />
        <Outlet/>
      </div>
    );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/Pokemon/:id",
        element: <PokemonPage />,
        errorElement: <NotFoundPokemonPage />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
const renderBrowser = <RouterProvider router={appRouter} />;
root.render(renderBrowser);