import FormField from './FormField';
import formFieldWithSelect from '../utils/formFieldWithSelect';

class Textarea extends FormField {

  getField() {

    const props = {
      id: (this.props.uniqueName || this.props.name) + '-' + this.id,
      name: this.props.uniqueName || this.props.name,
      onChange: this.handleChange,
      placeholder: this.props.placeholder || '',
      ref: this.formFieldRef,
      required: this.props.required || false,
      rows: this.props.rows || 3,
      value: this.props.val
    };

    return <textarea {...props} />;
  }

}

export default formFieldWithSelect(Textarea);
