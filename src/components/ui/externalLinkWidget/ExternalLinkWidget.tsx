import * as React from 'react';
import { Stack, IStackTokens, IStackStyles } from 'office-ui-fabric-react';
import {LinkImage} from './LinkImage';


const stackStyles: IStackStyles = {
  root: {
   flexGrow: '100',
   justifyContent : 'center'
  },
};

export interface IExternalLinkWidgetProps {
 
  links : any[];
  colour? : string;
  styles? : IStackStyles;
}

const stackTokens: IStackTokens = { childrenGap: 10 };

export const ExternalLinkWidget: React.FunctionComponent<IExternalLinkWidgetProps> = props => {
	 return (
	    <Stack styles={props.styles !== undefined? props.styles : stackStyles} horizontal tokens={stackTokens}>
	      {props.links.map(item => (<LinkImage links={item} colour={props.colour} />))}
	    </Stack>
	  );
};