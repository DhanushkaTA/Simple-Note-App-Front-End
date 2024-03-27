import './App.css'
import Header from "./components/header/Header.tsx";
import LoginView from "./view/LoginView.tsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path={'/'} element={<LoginView/>}/>
          </Routes>

      </BrowserRouter>
    // <section className={"flex flex-col"}>
    //   <Header/>
    //
    //   <section>
    //       <LoginView/>
    //   </section>
    //
    // </section>
  )

}

export default App