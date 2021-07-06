import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";


interface IDropdownNavItems{
  title : string;
  link : string;
}

interface INavItemProps{
  // String to be displayed
  title : string;
  // Link - URL
  link : string;
  // If item is active
  isActive : boolean;
  // Callback for onclick back to main parent component
  onClickCallback : (link : string ) => void;

  // If the nav is a dropdown
  dropdown? : boolean;
  dropdownItems? : IDropdownNavItems;

  // Toggle to set change on top to true or false. Default - true
  changeOnTop? : boolean;

}

export const NavItem : React.FunctionComponent<INavItemProps> = (props) => {

  // ###########################################
  // State Declarations
  // ###########################################
  const [isTop, toggleIsTop] = useState(false)
  // ######################################
  // USE EFFECTS
  // #####################################

  useEffect(() => {
      window.addEventListener('scroll', _handleScroll)
  }, [])

  // ####################################
  // Component Methods
  // ####################################

  const _handleScroll = (ev : any) => {
    if(window.pageYOffset > 20){
      toggleIsTop(false)
    }else if(window.pageYOffset < 20){
      toggleIsTop(true)
    }
  }

  const _navClicked = () => {
    props.onClickCallback(props.link)
  }

  if(props.dropdown){
    return (<li className={'nav-item'}>
              <Link className={'nav-item-link ' + (isTop? 'no-scroll-item-link ' : 'scrolled-nav-item ') + (props.isActive ? 'active-nav ' : '')} onClick={_navClicked} to={props.link}><h2>{props.title}</h2></Link>
            </li>
          )
  }else{
    return (<li className={'nav-item'}>
              <Link className={'nav-item-link ' + (isTop? 'no-scroll-item-link ' : 'scrolled-nav-item ') + (props.isActive ? 'active-nav ' : '')} onClick={_navClicked} to={props.link}><h2>{props.title}</h2></Link>
            </li>
          )
  }



};
