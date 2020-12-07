import * as React from 'react';
import { IconButton, IIconProps, IContextualMenuProps, Stack, Link } from 'office-ui-fabric-react';

export interface ICustomIconButtonProps {
  type : string;
  callback : () => void;
  disabled?: boolean;
}

const emojiIcon: IIconProps = { iconName: 'Emoji2' };


export const CustomIconButton: React.FunctionComponent<ICustomIconButtonProps> = props => {
  const { disabled} = props;

  const _getIcon = (type :string) => {
    switch(type){
      case 'Cancel':
        return { iconName: 'Cancel' };
      case 'Add':
         return { iconName: 'CalculatorAddition' };
      default:
        return { iconName: 'Cancel' };
    }
  } 
  return (
    <div>
        <IconButton iconProps={_getIcon(props.type)} title={props.type} ariaLabel={props.type} disabled={props.disabled} onClick={props.callback} />
    </div>
  );
};
