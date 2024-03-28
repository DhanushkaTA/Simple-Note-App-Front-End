import './App.css'
import Header from "./components/header/Header.tsx";
import LoginView from "./view/LoginView.tsx";
import NotesView from "./view/NotesView.tsx";
import AddNote from "./view/AddNote.tsx";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {useState} from "react";

function App() {

    const [islog, setIslog] = useState(false)

  return (
      <BrowserRouter>
          <Header log={islog}/>
          <Routes>
              <Route path={'/login'} element={<LoginView isLogin={setIslog}/>}/>
              <Route path={'/'} element={<NotesView/>}/>
              <Route path={'/add'} element={<AddNote/>}/>
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