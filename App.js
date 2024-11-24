import ReactDOM from 'react-dom/client';
import Header from './src/Components/Header';
import Body from './src/Components/Body';
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
        <Body/>
      </div>
    );
};
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>);