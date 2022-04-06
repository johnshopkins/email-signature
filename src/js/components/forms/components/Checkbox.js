import FormField from './FormField';
import formFieldWithSelect from '../utils/formFieldWithSelect';

class Checkbox extends FormField {

  constructor(props) {
    super(props);
    this.showLabel = this.props.showLabel || false;
    this.defaultInitialValue = false;
  }

  getCheckboxValue(source) {
    if (typeof source.value === 'boolean') {
      return source.value;
    } else {
      // value from session storage (always strings)
      return source.value === 'true' ? true : false;
    }
  }

  getField() {

    const props = {
      type: 'checkbox',
      name: this.props.uniqueName || this.props.name,
      onChange: this.handleChange,
      checked: this.getCheckboxValue(this.props.val),
      ref: this.formFieldRef,
      required: this.props.required || false,
    };

    return (
      <label>
        <input {...props} />
        <span>{this.props.label}</span>
      </label>
    );
  }

}

export default formFieldWithSelect(Checkbox);
