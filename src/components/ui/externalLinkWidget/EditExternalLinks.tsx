import * as React from 'react';
import {EditLinkItem} from './EditLinkItem';
import {useState} from 'react'
import { Stack, IStackTokens } from 'office-ui-fabric-react';
import {AddExternalLink} from './AddExternalLink';


export interface IExternalLinkWidgetProps {
  links : any[]
}

const stackTokens: IStackTokens = { childrenGap: 40 };

export const EditExternalLinks: React.FunctionComponent<IExternalLinkWidgetProps> = props => {

	const _setLinks = (links: any): any[] =>  {
		if(links === undefined || links === null){
			return []
		}else{
			return links
		}
	}

  const [externalLinks, updateLinks] = useState(_setLinks(props.links))

  const _removeLink = (index : number) => {
    let newLinks :any = [...externalLinks]
    newLinks.splice(index, 1)
    updateLinks(newLinks)
   
  }

  const _updateLink = (index : number, newURL : string) => {
    let newLinks :any = [...externalLinks]
    newLinks[index]['url'] = newURL
    updateLinks(newLinks)
  }
	

  const _newLinkAdded = (newLinkObj: any) => {
    console.log(newLinkObj)
    let newLinks :any = [...externalLinks]
    newLinks.push(newLinkObj)
    updateLinks(newLinks)
  }
  	
  return (
    <Stack tokens={stackTokens}>
      <div key={externalLinks.length} style={{width : '100%'}} >
        {externalLinks.map((item, i) => (<EditLinkItem links={item}index={Number(i)} removeCallback={_removeLink} updateCallback={_updateLink}  key={`Link Div ${item}`} />))}
      </div>
      <AddExternalLink callback={_newLinkAdded} />
    </Stack>
  );
}; 