import * as React from 'react';
import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';

interface ICustomDropdownMultiProps {
  fieldName : string;
  options : string[];
  value: string;
  label : string;
  callback : (fieldName : string, value : string) => void;
  required : boolean;
  multi?: boolean;

}


const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: 300 } };


export const CustomDropdown: React.FunctionComponent<ICustomDropdownMultiProps> = (props) => {
        // @ts-ignore
    const _createOptions = ():IDropdownOption[]  => {
       let returnOptions : IDropdownOption[] = [{key: 0, text : `Please Select`}]
      for(let i in props.options){
        returnOptions.push({key : props.options[i], text : props.options[i]})
      }
      return returnOptions
    }

  let ddOptions = _createOptions()

  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([props.value]);

 
  const onChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption|undefined): void => {
    if (item) {
      props.callback(props.fieldName, item.text)
      setSelectedKeys([item.text])
    }
  };

  return (
    <Dropdown
      placeholder="Select options"
      label={props.label}
      defaultSelectedKey={selectedKeys}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={onChange}
     
      options={ddOptions}
      styles={dropdownStyles}
    />
  );
};
