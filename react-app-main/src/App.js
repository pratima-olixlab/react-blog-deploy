import React from "react"
import { Footer } from "./components/footer/Footer"
import { Header } from "./components/header/Header"
import { Home } from "./pages/home/Home"
import { Login } from "./pages/login/Login"
import { Register } from "./pages/login/Register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { DetailsPages } from "./pages/details/DetailsPages"
import { Account } from "./pages/account/Account"
import { Create } from "./components/create/Create"
import { Category } from "./components/create-category/CreateCategory"
import { Page } from "./pages/page/page"
import { CategoryDetailsPages } from "./pages/details/CategoryDetailsPages"
import { About } from "./pages/about/about"

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/details/:id' component={DetailsPages} />
          <Route exact path='/c-details/:id' component={CategoryDetailsPages} />
          <Route exact path='/account' component={Account} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/category' component={Category} />
          <Route exact path='/pages' component={Page} />
          <Route exact path='/about' component={About} />
        </Switch>
        <Footer />
      </Router>
    </>
  )
}
export default App
