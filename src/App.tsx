import './App.css'
import Header from "./components/header/Header.tsx";
import LoginView from "./view/LoginView.tsx";
function App() {

  return (
    <section className={"flex flex-col"}>
      <Header/>

      <section>
          <LoginView/>
      </section>

    </section>
  )

}

export default App