import React from 'react';
import { Pivot, PivotItem, PivotLinkFormat, PivotLinkSize } from 'office-ui-fabric-react/lib/Pivot';
import ContentEditor from './ContentEditor/ContentEditor';
import OrderList from './Market/OrderList';
import SettingsPage from './Settings/SettingsPage';
import './DashboardStyles.scss';


export const DashboardPage = () => {
		return(
		<div className='page'>
			<div className={'pivot-wrapper'}>
		        <Pivot
		          aria-label="OnChange Pivot Example"
		          linkSize={PivotLinkSize.large}
		          linkFormat={PivotLinkFormat.tabs}
		        >
		         <PivotItem headerText="View Orders">
		            <OrderList />
		          </PivotItem>
		          <PivotItem headerText="Edit Art">
		            <ContentEditor type={'art'}/>
		          </PivotItem>
		           <PivotItem headerText="Edit Products">
		            <ContentEditor type={'products'} />
		          </PivotItem>
		           <PivotItem headerText="Edit Bio">
		            <ContentEditor type={'content'}/>
		          </PivotItem>
		           <PivotItem headerText="Campaigns">
		            <ContentEditor type={'campaigns'}/>
		          </PivotItem>
		          <PivotItem headerText="Edit Mixes">
		            <ContentEditor type={'mixes'}/>
		          </PivotItem>
		           <PivotItem headerText="Site Settings">
		            <SettingsPage/>
		          </PivotItem>
		        </Pivot>
		      </div>
		</div>
		);

} 

