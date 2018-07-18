import React from 'react';
import { connect } from 'react-redux'
import * as actions from './store/actions'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { DefaultContainer } from './Layouts'
import { MainNavigation, PrivateRoute } from './Components'
import { HomePage,
         BlogPage,
         AboutPage,
         ContactPage,
         RegisterPage,
         LoginPage,
         DashboardPage } from './Pages'

class App extends React.Component
{
    componentDidMount()
    {
        this.props.onAutoSignup()
    }

    render() {
        return (
            <Router>
                <div>
                    <MainNavigation />

                    <DefaultContainer>
                        <Route exact path="/" component={ HomePage } />
                        <Route path="/blog" component={ BlogPage } />
                        <Route path="/about" component={ AboutPage } />
                        <Route path="/contact" component={ ContactPage } />
                        <Route path="/register" component={ RegisterPage } />
                        <Route path="/login" component={ LoginPage } />
                        <PrivateRoute path="/dashboard" component={ DashboardPage } />
                    </DefaultContainer>
                </div>
            </Router>
        )
    }
}

const mapDispatchToProps = (dispatch)=> {
    return {
        onAutoSignup: ()=> dispatch(actions.authCheck())
    }
}

export default connect(null, mapDispatchToProps)(App);
