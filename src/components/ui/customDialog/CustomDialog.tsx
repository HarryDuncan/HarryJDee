import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { hiddenContentStyle, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { ContextualMenu } from 'office-ui-fabric-react/lib/ContextualMenu';
import { useId} from '@uifabric/react-hooks';
import { useState } from 'react';

const dialogStyles = { main: { maxWidth: 450 } };
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
};
const screenReaderOnly = mergeStyles(hiddenContentStyle);


interface ICustomDialogProps{
  btnTxt : string;
  label : string;
  description : string;
  primaryButtonTxt : string;
  primaryButtonCallback : any;
  secondaryButtonTxt : string;
  secondaryButtonCallback? : any;
}



export const CustomDialog: React.FunctionComponent<ICustomDialogProps> = props => {
  const [hideDialog, toggleHideDialog ] = useState(true);
  const labelId: string = useId('dialogLabel');
  const subTextId: string = useId('subTextLabel');

  const dialogContentProps = {
    type: DialogType.normal,
    title: props.label,
    closeButtonAriaLabel: 'Close',
    subText: props.description
  };
  const modalProps = React.useMemo(
    () => ({
      titleAriaId: labelId,
      subtitleAriaId: subTextId,
      isBlocking: false,
      styles: dialogStyles,
    }),
    [false],
  );

  const _openClose = (e : any) => {
    toggleHideDialog(!hideDialog)
  }

  const _btn1 = (e : any) =>{
    props.primaryButtonCallback()
    toggleHideDialog(!hideDialog)
  }

  const _btn2 = (e: any) => {
    if(props.secondaryButtonCallback){
      props.secondaryButtonCallback()
    }
    toggleHideDialog(!hideDialog)
  }
  return (
    <>
      <DefaultButton onClick={_openClose} text={props.btnTxt} />
      <label id={labelId} className={screenReaderOnly}>
       {props.label}
      </label>
      <label id={subTextId} className={screenReaderOnly}>
       {props.description}
      </label>

      <Dialog
        hidden={hideDialog}
        onDismiss={_openClose}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={_btn1} text={props.primaryButtonTxt} />
          <DefaultButton onClick={_btn2} text={props.secondaryButtonTxt} />
        </DialogFooter>
      </Dialog>
    </>
  );
};