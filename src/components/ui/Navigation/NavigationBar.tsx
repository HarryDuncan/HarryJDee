import * as React from 'react';
import {connect} from 'react-redux';
import {Link, BrowserRouter, } from "react-router-dom";
import CartNotification from './../notification/Notification'
import {NotificationModal} from './../notification/NotificationModal'
import { stack as Menu } from 'react-burger-menu'
import {closeNotification} from './../../../store/shop/shop.actions'
import {openSite} from './../../../store/app/app.actions'
import './Nav.css'
import { createBrowserHistory } from "history";
import Hero from './../hero/Hero'
import {Countdown} from './../../launch/Countdown';


const history = createBrowserHistory()
interface INavProps  {
 
  showReceipt : boolean;
  receiptType : string;
  showNav : boolean;
  closeNotification: any;
  siteStatus : string;
  testing : boolean;
  hero : string|null;
  openSite : any;
  isLight : boolean;
}
interface INavState {
  activeNav : string;
  isOpen : boolean;
  showCountdown : boolean;
  navTop : boolean;

}


class NavBar extends React.Component<INavProps, INavState>{
  constructor(props : INavProps){
    super(props);
    this.state = {
      activeNav : history.location.pathname,
      isOpen : false,
      showCountdown : false,
      navTop : true,
     
    }
  }
  



  public openMenu = (e: any) => {
    this.setState({
      isOpen : true
    })
  }

  public change = (e: any) => {
    this.setState({
      isOpen : false
    })
  }

  public componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)

    // Not Needed currently

    //TODO - Campaign/Product Launch Countdown
    // setTimeout(() => {
    //    if(this.props.testing){
    //       this.setState({
    //         showCountdown : true
    //       })
    //     }
    // }, 2500)
   
  }

  public handleScroll = (ev : any) => {
    if(window.pageYOffset > 20 && this.state.navTop){
     this.setState({
      navTop : false
      })
    }else if(window.pageYOffset < 20 && !this.state.navTop){
      this.setState({
        navTop : true,
      })
    }
  }


  public render (){
    if(this.props.siteStatus === 'Maintenance' || this.props.siteStatus === 'Down'){
      return (
          <div className={ 'mainNav '}>
            <div className={this.state.activeNav === '/' ? 'homeNav'  : ' '} />
              <img onClick={this.navClicked.bind(this, '/')} className={'navLogo start'} src={this.state.navTop? '/images/icons/harryDLogo.png' : '/images/icons/harryDLogoWhite.png'} alt={'Harry J Dee'}/>
              <div style={{ 'margin' : '4%', 'padding': '0.5%', 'clear' : 'both', 'backgroundColor' : 'black'}} ><span style={{'color' : 'white', 'fontSize': '1em', 'letterSpacing': '0.15em','fontWeight':600}}>Sorry... We are down for maintenance. Please Come back a bit later </span></div>
          </div>
        )
    }
    const isMobile = document.documentElement.clientWidth <= 1100 ;
    if(isMobile){
      console.log(this.props.isLight)
        return (
          <div key={`Main Nav Mobile ${this.state.isOpen} `} className={ 'mainNav '}>
          <div className={(this.state.navTop? 'noScroll ' : 'scrolledMainNav ') + (this.state.activeNav === '/' || this.state.activeNav === ''  ? 'homeNav'  : ' ')} />
          <img key={`${this.props.isLight} Logo`} className={'navLogo start'} alt={"Harry J Dee"} src={!this.state.navTop || this.props.isLight ? '/images/icons/harryDLogoWhite.png' : '/images/icons/harryDLogo.png' }/>
              <CartNotification redirectCallback={this.setActiveHome} isMobile={true} customClassName={(this.state.navTop? 'top-nav ' : 'scrolled-top ')}/>
          
            {this.props.showNav && !this.props.testing? 
             <nav key={`Main Nav Mobile ${this.state.isOpen} 22`} className={'navbar-toggler'}>
               <div className="nav-container" onClick={this.openMenu} >
                <div className={"bar1 " + (this.state.navTop? '' : 'bar-item ')} ></div>
                <div className={"bar2 " + (this.state.navTop? '' : 'bar-item ')} ></div>
                <div className={"bar3 " + (this.state.navTop? '' : 'bar-item ')}></div>
              </div>
              
                  <Menu right key={String(this.state.isOpen) + 'nav'} className="MobileMenu" width={200}  >
                    <Link className='link' onClick={this.navClicked.bind(this, '/')} to="/" ><h2>Home</h2></Link>
                    <Link className='link' onClick={this.navClicked.bind(this, '/Bio')} to='/Bio'><h2>Bio</h2></Link>
                    <Link className='link' onClick={this.navClicked.bind(this, '/Mixes')}  to='/Mixes'><h2>Mixes</h2></Link>        
                    <Link className='link' onClick={this.navClicked.bind(this, '/Gallery')}  to='/Gallery'><h2>Gallery</h2></Link>
                    <Link className='link' onClick={this.navClicked.bind(this, '/Activism')} to='/Activism'><h2>Activism</h2></Link> 
                    <Link className='link' onClick={this.navClicked.bind(this, '/Shop')} to='/Shop'><h2>Shop</h2></Link>
                  </Menu>
               
                
            </nav>

              :
              null
            }
                  {this.props.showReceipt?
                <NotificationModal isOpen={true} showType={this.props.receiptType} closeCallback={this.props.closeNotification}/>
                :
                <div/>
                }
                {this.props.hero !== null && this.props.hero.length > 0 ?
              <div key={String(this.props.hero)} style={{ 'margin' : '4%', 'marginTop': '15%', 'padding': '0.5%', 'clear' : 'both', 'backgroundColor' : 'black'}} ><span style={{'color' : 'white', 'fontSize': '1em', 'letterSpacing': '0.15em','fontWeight':600}}>{this.props.hero}</span></div>
              :
              null
            }
            {this.props.testing? 
            <Countdown key={'count-down' + String(this.state.showCountdown)} launchCallback={this._openSite} isOpen={this.state.showCountdown}/>
            :
            null
            }
          </div>
        );
    }else{
      return (
          <div className={ 'mainNav '}>
          <div className={(this.state.navTop? 'noScroll ' : 'scrolledMainNav ') + (this.state.activeNav === '/'  || this.state.activeNav === '' ? 'homeNav' || this.state.activeNav === '' || 'TestMode' : ' ' || this.state.activeNav === '/Activism')} />
          <Link to="/"><img key={`${this.props.isLight} Logo`} onClick={this.navClicked.bind(this, '/')} className={'navLogo start'} src={!this.state.navTop || this.props.isLight ? '/images/icons/harryDLogoWhite.png' : '/images/icons/harryDLogo.png' }/></Link>
                {this.props.showNav && !this.props.testing? 
                   <ul>
                    <li>
                      <CartNotification redirectCallback={this.setActiveHome} customClassName={(this.state.navTop? 'top-nav ' : 'scrolled-top ')}/>
                    </li>
                   <li className={'nav-item'}>
                      <Link className={'nav-item-link ' + (this.state.navTop? 'no-scroll-item-link ' : 'scrolled-nav-item ') + (this.state.activeNav === '/Shop' && !this.props.showReceipt ? 'active-nav ' : '')} onClick={this.navClicked.bind(this, '/Shop')} to="/Shop"><h2>Shop</h2></Link>
                    </li>
                    <li className={'nav-item'}>
                      <Link className={'nav-item-link ' + (this.state.navTop? 'no-scroll-item-link ' : 'scrolled-nav-item ') + (this.state.activeNav === '/Activism' || this.state.activeNav === '/Activism/'? 'active-nav ' : '')} onClick={this.navClicked.bind(this, '/Activism')} to="/Activism"><h2>Activism</h2></Link>
                    </li>
                     <li className={'nav-item'}>
                      <Link className={'nav-item-link ' + (this.state.navTop? 'no-scroll-item-link ' : 'scrolled-nav-item ') + (this.state.activeNav === '/Gallery'  || this.state.activeNav === '/Gallery/' ? 'active-nav ' : '')} onClick={this.navClicked.bind(this, '/Gallery')} to="/Gallery"><h2>Gallery</h2></Link>
                    </li>
                     <li className={'nav-item'}>
                      <Link className={'nav-item-link ' + (this.state.navTop? 'no-scroll-item-link ' : 'scrolled-nav-item ') + (this.state.activeNav === '/Mixes' || this.state.activeNav === '/Mixes/' ? 'active-nav ' : '')} onClick={this.navClicked.bind(this, '/Mixes')}  to="/Mixes"><h2>Mixes</h2></Link>
                    </li>
                     <li className={'nav-item'}>
                      <Link className={'nav-item-link '  + (this.state.navTop? 'no-scroll-item-link ' : 'scrolled-nav-item ') + (this.state.activeNav === '/Bio' || this.state.activeNav === '/Bio/' ? 'active-nav ' : '')} onClick={this.navClicked.bind(this, '/Bio')}  to="/Bio"><h2>Bio</h2></Link>
                    </li>
                    <li className={'nav-item'}>
                      <Link className={'nav-item-link ' + (this.state.navTop? 'no-scroll-item-link ' : 'scrolled-nav-item ') + (this.state.activeNav === '/' && this.props.showReceipt ? 'active-nav ' : '')} onClick={this.navClicked.bind(this, '/')} to="/"><h2>Home</h2></Link>
                    </li>
                  </ul>
                  : 
                  null
                }
            {this.props.showReceipt?
               <NotificationModal isOpen={true} showType={this.props.receiptType} closeCallback={this.props.closeNotification}/>
               :
               <div/>
            }
            {this.props.testing? 
            <Countdown key={'count-down' + String(this.state.showCountdown)} launchCallback={this._openSite} isOpen={this.state.showCountdown}/>
            :
            null
            }
           {this.props.hero !== null && this.props.hero.length > 0 ?
              <div key={String(this.props.hero)} style={{ 'margin' : '4%', 'padding': '0.5%', 'clear' : 'both', 'backgroundColor' : 'black'}} ><span style={{'color' : 'white', 'fontSize': '1em', 'letterSpacing': '0.15em','fontWeight':600}}>{this.props.hero}</span></div>
              :
              null
            }

          </div>
        );
      }
    }

  private _openSite = () => {
    this.props.openSite()
  }
 
 private setActiveHome = () => {
  this.setState({
    activeNav : '/'
  })
 }
private navClicked = (target : string) => {
  this.setState({
    activeNav : target,
    isOpen : false
  })
  setTimeout(() => {
       this.setState({
        isOpen : true
      })
  },200)
 
  this.props.closeNotification()
}
};



const mapStateToProps = (state : any) => ({
  showReceipt : state.shop.showReceipt,
  showNav  : state.app.showNav,
  receiptType : state.shop.receiptType,
  siteStatus : state.app.siteStatus,
  testing : state.app.testingOn,
  hero : state.app.heroMessage,
  isLight : state.app.isLight

})

const mapDispatchToProps = {
  closeNotification,
  openSite
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

