import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import WhatTheHell from "./pages/WhatTheHell"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route element={<Home/>} path="/"/>
          <Route element={<WhatTheHell/>} path="/whatthehell"/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App