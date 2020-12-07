import * as React from 'react';
import {useState} from 'react';
import {connect} from 'react-redux';
import { DefaultButton, Callout, Link, getTheme, FontWeights, mergeStyleSets, Text } from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';
import {resendEmail} from './../../../store/app/app.actions'
import './resend.css'

const theme = getTheme();
const styles = mergeStyleSets({
  buttonArea: {
    verticalAlign: 'top',
    textAlign: 'center',
    margin: '0 auto',
    
    height: 32,
  },
  callout: {
     margin: '0 auto',
    justifySelf : 'center',
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

interface IResendProps {
  resendEmail : any;
}
const ResendReceipt: React.FunctionComponent<IResendProps> = (props) => {
  const [isCalloutVisible, toggleIsCalloutVisible ] = useState(false);

  const toggleCallout = () => {
    toggleIsCalloutVisible(!isCalloutVisible)
  }

  const labelId: string = useId('callout-label');
  const descriptionId: string = useId('callout-description');

  const resend = () => {
    props.resendEmail()
  }
  return (
    <>
      <div className={styles.buttonArea}>
        <span className={'link-txt'} onClick={toggleCallout}>Didn't receive an email?</span>
      </div>
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          role="alertdialog"
          gapSpace={0}
          target={`.link-txt`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
          <div className={styles.header}>
            <Text className={styles.title} >
              Try looking in your junk folder
            </Text>
          </div>
          <div className={styles.inner}>
            <Text className={styles.subtext}>
              If it isn't in your junk folder. 
            </Text>
            <div className={styles.actions}>
              <Link className={styles.link} onClick={resend}>
                Click To Resend Receipt
              </Link>
            </div>
          </div>
        </Callout>
      )}
    </>
  );
};




const mapStateToProps = (state : any) => ({
  
});

const mapDispatchToProps = {
  resendEmail
};

export default connect(mapStateToProps, mapDispatchToProps)(ResendReceipt)

