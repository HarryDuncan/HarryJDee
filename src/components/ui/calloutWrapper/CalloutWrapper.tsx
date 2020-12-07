import * as React from 'react';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Callout } from 'office-ui-fabric-react/lib/Callout';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { getId} from 'office-ui-fabric-react/lib/Utilities';
import { Label } from 'office-ui-fabric-react/lib/Label';
import {useState} from 'react'
 
interface IFormWrapperProps{
                childComponent : JSX.Element;
                required: boolean;
                label : string;
                description?: string;
 
}
 
const stackTokens: IStackTokens = {
  childrenGap: 20,
  maxWidth: 300
};
// Wrapper for Form input component - Dynamically renders the description
const CalloutWrapper: React.SFC<IFormWrapperProps> = props => {
 
 
                const [isCalloutVisible, toggleCallout] = useState(false)
 
 
                const _descriptionId: string = getId('description');
                const _iconButtonId: string = getId('iconButton');
               
    const _onHover = () : void =>{
      toggleCallout(true)
    }
     const _onIconClick = (): void => {
       toggleCallout(!isCalloutVisible)
    };
 
    const _onDismiss = (): void => {
        toggleCallout(false)
    };
 
 
 
    return(
                <div>
                                {props.description !== undefined?
                                                <div>
                                                <Stack horizontal verticalAlign="center">
                                            <Label required={props.required} >{props.label}</Label>
                                            <IconButton
                                                        id={_iconButtonId}
                                                        iconProps={{ iconName: 'Info' }}
                                                        title="Info"
                                                        ariaLabel="Info"
 
                                                        onClick={_onIconClick}
                                                        styles={{ root: { marginBottom: -3}}}
                                                        onMouseEnter={_onHover}
                                                        onMouseLeave={_onDismiss}
                                                      />
                </Stack>
                                {props.childComponent}
                                                                                {isCalloutVisible && (
                                  <Callout
                                    target={'#' + _iconButtonId}
                                    setInitialFocus={true}
                                    onDismiss={_onDismiss}
                                    ariaDescribedBy={_descriptionId}
                                    role="alertdialog"
                                  >
                    <Stack tokens={stackTokens} onClick={_onDismiss} horizontalAlign="start" styles={{ root: { padding: 20 } }}>
                      <span id={_descriptionId}>{props.description}</span>
                    </Stack>
                  </Callout>
                  )}
                                                                </div>
                                                :
                                                <div>
                                                                <Stack horizontal verticalAlign="center">
                                         <Label required={props.required} >{props.label}</Label>
                                         </Stack>
                                                                {props.childComponent}
                                                </div>
                                }
                </div>
                )
}

export default CalloutWrapper
 