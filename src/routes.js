import React from "react";
// import { Route, BrowserRouter, Routes as Switch} from "react-router-dom";

import Home from "./Pages/Main/Index";
// import Sobre from "./Pages/Sobre";
// import Usuario from "./Pages/Usuario";

const Routes = () => {
   return(
       <Home/>
    //    <BrowserRouter>
    //    <Switch>
    //        <Route component = { Home }  path="/" exact />
    //        <Route component = { Sobre }  path="/sobre" />
    //        <Route component = { Usuario }  path="/usuario" />
    //     </Switch>
    //    </BrowserRouter>
   ) 
}

export default Routes;