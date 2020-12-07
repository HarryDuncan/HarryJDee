import * as React from 'react';
import {useState} from 'react';
import { DefaultButton, Callout, Link, getTheme, FontWeights, mergeStyleSets, Text } from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';

const theme = getTheme();
const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    display: 'inline',
  },
  callout: {
    maxWidth: 300,
  },
  header: {
    padding: '18px 24px 12px',
  },
  title: [
    theme.fonts.xLarge,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  inner: {
    height: '100%',
    padding: '0 24px 20px',
  },
  actions: {
    position: 'relative',
    marginTop: 20,
    width: '100%',
    whiteSpace: 'nowrap',
  },
  subtext: [
    theme.fonts.small,
    {
      margin: 0,
      fontWeight: FontWeights.semilight,
    },
  ],
  link: [
    theme.fonts.medium,
    {
      color: theme.palette.neutralPrimary,
    },
  ],
});


interface IInfoCalloutProps{
  linkText : string;
  innerComponent : JSX.Element;
  id : string
}
export const InfoCallout: React.FunctionComponent<IInfoCalloutProps> = (props) => {
  const [isCalloutVisible, toggleIsCalloutVisible ] = useState(false);

 
  const descriptionId: string = useId('callout-description');


  const toggleVis = () =>{
    toggleIsCalloutVisible(!isCalloutVisible)
  }

  return (
    <>
      <div id={props.id} className={styles.buttonArea}>
        <Link onClick={toggleVis}>{props.linkText}</Link>
      </div>
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
         
          ariaDescribedBy={descriptionId}
          role="alertdialog"
          gapSpace={0}
          target={`#${props.id}`}
          onDismiss={toggleVis}
          setInitialFocus
        >
          <div className={styles.inner}>
           {props.innerComponent}
          </div>
        </Callout>
      )}
    </>
  );
};
