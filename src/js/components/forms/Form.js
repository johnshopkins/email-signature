const { createElement, createRef, Component } = wp.element;
const { addQueryArgs } = wp.url;

import Errors from './Errors';
import FormStore from './FormStore';
import Loading from './Loading';
import RecaptchaMessage from './RecaptchaMessage';
import SubmitButton from './components/SubmitButton';

import printFields from './utils/printFields';

class Form extends Component {

  constructor(props) {

    super(props);

    this.store = new FormStore(this.props.id);

    this.showRequiredMessage = typeof this.props.showRequiredMessage !== 'undefined' ? this.props.showRequiredMessage : true;

    this.state = {

      // keeps track of the errors to display to the user (from server-side validation)
      displayErrors: [],

      // is the form loading (like when checking recaptcha)
      loading: false,
    };

    this.formRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e) {

    e.preventDefault();

    const formData = this.store.getState();

    if (this.formRef.current.checkValidity()) {

      if (this.props.recaptcha && this.props.action) {

        // recaptcha and server-side integration

        this.setState({ loading: true });
        grecaptcha.ready(() => {
          grecaptcha.execute(this.props.recaptcha, { action: 'submit' }).then((token) => {
            this.submitToServer({ action: this.props.action, recaptcha: token, data: formData });
          });
        });

      } else if (this.props.action) {

        // server-side integration

        this.setState({ loading: true });
        this.submitToServer({ action: this.props.action, data: formData });

      } else {

        // no server-side integration
        this.props.onSuccess(formData);

      }
    }
  }

  submitToServer(data) {
    wp.apiFetch({
      method: 'POST',
      url: addQueryArgs('/wp/wp-admin/admin-ajax.php', data)
    }).then(response => {
      this.setState({ loading: false, displayErrors: [] });
      response.success ? 
        this.props.onSuccess(this.store.getState().values) :
        this.setState({ displayErrors: response.errors });
    });
  }

  render() {
    return (
      <>
        { this.showRequiredMessage && <p>Fields labeled with <span className={'required'}>*</span> are required.</p> }
        <Errors errors={this.state.displayErrors} />

        <form className={this.props.className || ''} onSubmit={this.handleSubmit} ref={this.formRef}>
          <div className={'form-fields force'}>
            {printFields(this.props.content, this.props.id)}
            <SubmitButton
              disabled={this.state.loading}
              value={this.props.submitText || 'Submit'}
            />
            {this.state.loading && <Loading message={this.props.loadingText || 'Submitting...'} />}
          </div>
        </form>

        {this.props.recaptcha && <RecaptchaMessage />}
      </>
    );
  };
}

export default Form;
