const { createElement, Component } = wp.element;

import formProps from './form-props';
import Signature from './signature';
import Form from '../forms/Form';

class EmailSignatureGenerator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null
    };

    this.onCopy = this.onCopy.bind(this);
    this.onSuccess = this.onSuccess.bind(this);

    this.signatureDiv = React.createRef();
  }

  onCopy() {
    const copyBoxElement = this.signatureDiv.current;
    copyBoxElement.contentEditable = true;
    copyBoxElement.focus();
    document.execCommand('selectAll');
    document.execCommand('copy');
    // console.log(document.execCommand('paste'));
    // copyBoxElement.contentEditable = false;
    // this.handleIsCopied();
    // getSelection().empty();
  }

  onSuccess(data) {
    this.setState({ data });
  }

  render() {

    // add onSuccess function
    formProps.onSuccess = this.onSuccess;

    return (
      <>
        <Form {...formProps} />
        {this.state.data &&
          <div className={'generated-signature'}>
          <Form id={'email-signature-copier'} submitText={'Copy to clipboard'} onSuccess={this.onCopy} showRequiredMessage={false} />
            <div ref={this.signatureDiv}>
              <Signature data={this.state.data} />
            </div>
          </div>
        }
      </>
    )
  };

}

export default EmailSignatureGenerator;
