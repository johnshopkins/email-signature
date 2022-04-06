import FormField from './FormField';
import formFieldWithSelect from '../utils/formFieldWithSelect';

class TextBox extends FormField {

  constructor(props) {
    super(props);
    this.type = this.props.textBoxType || 'text';
  }

  getField() {

    let props = {
      type: this.type,
      id: (this.props.uniqueName || this.props.name) + '-' + this.id,
      name: this.props.uniqueName || this.props.name,
      onChange: this.handleChange,
      placeholder: this.props.placeholder || '',
      ref: this.formFieldRef,
      required: this.props.required || false,
      value: this.props.val
    };

    if (this.props.pattern) {
      props.pattern = this.props.pattern;
    }

    return <input {...props} />;
  }

}

export default formFieldWithSelect(TextBox);
