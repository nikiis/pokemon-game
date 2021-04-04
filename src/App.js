import './styles/App.scss';
import Introduction from './components/Introduction';
import Quiz from './components/Quiz';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact component={Introduction}></Route>
                    <Route path="/quiz" component={Quiz} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
