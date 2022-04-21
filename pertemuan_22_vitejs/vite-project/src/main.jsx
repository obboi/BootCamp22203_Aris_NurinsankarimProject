import React from 'react'
import ReactDOM from "react-dom"
import App from './App'
import './index.css'
import Nav from "./nav"
import Increment from "./increment"
import 'bootstrap/dist/css/bootstrap.min.css'
import Textlist from "./testList"
import CardContatcs from './cardContatcs'

function renderDOM(content, id) {
    ReactDOM.render(content, document.getElementById(id))
}

renderDOM(<App />, "root");
renderDOM(<Nav />, "nav");
renderDOM(<Increment />, "inc");
renderDOM(<Textlist />, "text");
renderDOM(<CardContatcs />, "cc");


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
