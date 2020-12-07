import * as React from 'react';
import {useState} from 'react';
import {connect} from 'react-redux'
import {
  PrimaryButton,
  
  Stack,
  IStackTokens,

} from 'office-ui-fabric-react';

import { ITextFieldStyleProps, ITextFieldStyles, TextField } from 'office-ui-fabric-react/lib/TextField';
import {unlockApp} from './../../store/app/app.actions'



const stackTokens: IStackTokens = { childrenGap: 10 };

interface ITestModeProps {
  unlockApp : any;
  testCode : number;
}

const TestMode: React.FunctionComponent<ITestModeProps> = (props) => {
  const [enteredTestCode , updateTestCode ] = useState('')

  const tryTest = () => {
    if(Number(enteredTestCode) === props.testCode){
      props.unlockApp()
    }else{
      alert('Incorrect Test Code')
    }
  }

  const _setData = (ev: any , value? :string) => {
    if(value !== undefined){
       
        updateTestCode(value)
        
    }
  }

  return (
    <div style={{'position' : 'absolute', 'top': '30vh', 'marginLeft' : '4%','width' : '92%'}} >
      <Stack>
        <TextField  required={true} ariaLabel={'Name'} label={'Enter Test Code'} value={enteredTestCode} underlined onChange={_setData}/>         
        <PrimaryButton onClick={tryTest} text="Submit Test Code" />
       </Stack>
    </div>
  );
};


const mapStateToProps = (state : any) => ({
  testCode : state.app.testCode
});

const mapDispatchToProps = {
  unlockApp
};

export default connect(mapStateToProps, mapDispatchToProps)(TestMode)








