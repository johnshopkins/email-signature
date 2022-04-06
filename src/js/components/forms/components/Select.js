import FormField from './FormField';
import formFieldWithSelect from '../utils/formFieldWithSelect';

class Select extends FormField {

  getField() {

    let props = {
      id: (this.props.uniqueName || this.props.name) + '-' + this.id,
      name: this.props.uniqueName || this.props.name,
      ref: this.formFieldRef,
      onChange: this.handleChange,
      value: this.props.val
    };

    return (
      <select {...props}>
        {this.props.options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)}
      </select>
    );
  }

}

export default formFieldWithSelect(Select);
