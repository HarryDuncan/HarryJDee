import * as React from 'react';
import { Nav, INavLinkGroup, INavStyles } from 'office-ui-fabric-react/lib/Nav';


const navStyles: Partial<INavStyles> = { 
                                        navItem : {
                                                  'float': 'left',
                                                  'width': '100%'
                                                } 
                                      };


interface INavLinkProps {
  navType : string;
  navItems : string[];
  onClickCallback : (section: string) => void;
}

export const NavLinks: React.FunctionComponent<INavLinkProps> = props => {


  const navLinkGroups: INavLinkGroup[] = [
   {
      name: 'General Settings',
      links: [
        { name: 'Site Settings', key: 'keySite', url : '', onClick : () => {props.onClickCallback('Site Settings')}},
        { name: 'Accounts', key: 'keyAccounts', url : '', onClick : () => {props.onClickCallback('Accounts')}},
        { name: 'Server Settings', key: 'keyServer', url : '', onClick : () => {props.onClickCallback('Server Settings')}},
      ]
    },
    {
      name: 'Page Settings',
      links: [
        { name: 'Home', key: 'key1', url : '', onClick : () => {props.onClickCallback('Home')}},
        { name: 'Bio', key: 'key2', url : '', onClick : () => {props.onClickCallback('Bio')}},
        { name: 'Mixes', key: 'key3', url : '', onClick :  () => {props.onClickCallback('Mixes')}},
        { name: 'Gallery', key: 'key4', url : '', onClick :  () => {props.onClickCallback('Gallery')}},
        {name: 'Activisim', key: 'key5', url :  '',  onClick :  () => {props.onClickCallback('Activisim')}},
         {name: 'Shop', key: 'key6', url :  '',  onClick :  () => {props.onClickCallback('Shop')}},

      ]
    }
   
  ];




  return (
    <Nav 
      styles={navStyles}
      onRenderGroupHeader={_onRenderGroupHeader}
      ariaLabel="Nav example with custom group headers"
      groups={navLinkGroups}
    />
  );
};

function _onRenderGroupHeader(group: INavLinkGroup|undefined): JSX.Element {
  if(group !== undefined){
    return <h3>{group.name}</h3>;
  }else{
    return <h3/>
  }
  
}
