import * as React from 'react'
import {useState} from 'react'
import {FormPageSection} from '../../ui/formComponent/FormComponent'
import { PrimaryButton, Stack, IStackTokens } from 'office-ui-fabric-react';
import {updateSiteSettings} from './../../../store/app/app.actions';
import {connect} from "react-redux";
import {validateData} from './../../../utilities/utilityFunctions';

interface ISettingPageInnerProps {
 type : string;
 data  : any;
updateSiteSettings : any;
}
  
const stackTokens: IStackTokens = { childrenGap: 40 };


const SettingsPageInner: React.SFC<ISettingPageInnerProps> = props => {

  // const [isCalloutVisible, toggleCallout] = useState(false)<FormComponent
 
  const [saveDisabled, toggleDisabled] = useState(true)
  const [settingData, updateSettings] = useState(props.data)
  let settingDataArray = Object.keys(settingData)


  const _updateData = (fieldName : string, value : any) => {
    let updatedField : any = Object.assign({}, settingData[fieldName]);
    updatedField['value'] = value
    updateSettings({...settingData, [fieldName] : updatedField })
    toggleDisabled(!validateData(settingData))
  }

  const _saveChanges = () => {
    // this.props.updateSettings(setting)
    props.updateSiteSettings(props.type, settingData)
  }
    return(
    		<div>
          <Stack tokens={stackTokens}>
      		  <h1>{props.type}</h1>
        		 <div>
              		{
              			settingDataArray.map((item => <FormPageSection 
              												fieldName={item} 
              												fieldItem={settingData[item]} 
              												callback={_updateData} 
              												key={`Order Field ${item}`}/> ) ) 
              		}
          		</div>
            <PrimaryButton text="Save Changes" disabled={saveDisabled} onClick={_saveChanges}   />
          </Stack>
          </div>
        )
}



const mapStateToProps = (state: any) => ({
  
  
})
 
const mapDispatchToProps = {
  updateSiteSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPageInner);
