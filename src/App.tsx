import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Switch,
 // withRouter,
  Route} from 'react-router-dom'
import {Home} from './containers/Home';
import Gallery from './containers/Gallery';
import Bio from './containers/Bio';
import Dashboard from './containers/Dashboard';
import Shop from './containers/Shop';
import Mixes from './containers/Mixes';
import NavBar from './components/ui/Navigation/NavigationBar';
import {connect} from "react-redux";
import LoadingSplash from './components/ui/loadingSplash/LoadingSplash';
import Activism from './containers/Activism';
import {initializeSite} from './store/app/app.actions'
import TermsAndConditions from './containers/TermsAndConditions';
import Test from './containers/Test';


interface IAppProps {
  checkoutModalShow : boolean;
  initializeSite : any;
  isInitialized : boolean;
  sitePages  : any[];
  siteStatus : string;
  testing : boolean;
}

interface IAppState {
 
  loadingSite : boolean;


}
export class App extends React.Component<IAppProps, IAppState> {
  constructor(props : IAppProps){
    super(props);
    this.state ={
    
    loadingSite : true,
   }
  }
  public componentDidMount = () => {
   
    if(!this.props.isInitialized){
      this.props.initializeSite()
    }
    
    setTimeout(() => {
      this.setState({
        loadingSite : false
        })
      }, 2000)

  }
    


 
    public render(){
        return (
          <div className="App">
          <LoadingSplash show={this.state.loadingSite}/>
            <NavBar/>
                {this.props.siteStatus !== 'Maintenance' && this.props.siteStatus !== 'Down' && this.props.testing !== true ?
                  <Switch>
                      <Route exact path="/"  component={Home} />
                      <Route path="/Gallery" component={Gallery} />
                      <Route path="/Shop" component={Shop} />
                      <Route path="/Bio" component={Bio} />
                      <Route path='/Mixes' component={Mixes} />
                      <Route path='/Activism' component={Activism} />
                      <Route path="/Dashboard" component={Dashboard} />
                      <Route path='/TermsAndConditions' component={TermsAndConditions} />
                      <Route path="*" component={Home} />
                  </Switch>
                    : 
                     <Switch>
                      <Route exact path="/"  component={Home} />
                       <Route path="/Dashboard" component={Dashboard} />
                       <Route path="/TestMode" component={Test} />
                       <Route path="*" component={Home} />
                    </Switch>
                }
            </div>
          );
      }
}

const mapStateToProps = (state: any) => ({
  checkoutModalShow : state.shop.checkoutModalShow,
  isInitialized : state.app.isInitialized,
  siteStatus :  state.app.siteStatus,
  sitePages :  state.app.sitePages,
  testing : state.app.testingOn
})
 
const mapDispatchToProps = {
  initializeSite
};
 
export default connect(mapStateToProps, mapDispatchToProps)(App);
 