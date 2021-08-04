import React from "react";
import { Route } from 'react-router-dom';

import Home from "./vistas/Home";

export default function App() {
  return (
    <>
      <Route path='/home' component={Home} />
      {/* <Route path='/post:id' component={Post} /> */}
    </>
  );
}
