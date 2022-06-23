import React ,{Component} from 'react';
import Main from './components/MainComponent';//the brain of the app
import { BrowserRouter } from "react-router-dom";
import './App.css';
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";

//calling configure store 
const store=ConfigureStore();

class App extends Component {
 
  render(){
    console.log("App render is invoked");
  return(
    //now our store is availlable for all components
    <Provider store={store}>
      <BrowserRouter>  
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
    );
  }
}

export default App;
