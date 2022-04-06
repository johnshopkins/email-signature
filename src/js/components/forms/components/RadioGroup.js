import FormField from './FormField';
import formFieldWithSelect from '../utils/formFieldWithSelect';

class RadioGroup extends FormField {

  getFieldValue(field) {
    const checked = field.querySelector('input:checked');
    return checked ? checked.value : null;
  }

  getField() {

    const value = this.props.val;

    return (
      <div className={'elements force'} ref={this.formFieldRef}>
        {this.props.options.map(option => {
          let props = {
            type: 'radio',
            name: this.props.uniqueName || this.props.name,
            onChange: this.handleChange,
            checked: value === option.value ? true : false,
            value: option.value,
            required: this.props.required || false
          };

          return (
            <div className={'element'} key={option.value}>
              <label>
                <input {...props} />
                <span>{option.label}</span>
              </label>
            </div>
          )
        })}
      </div>
    );
  }

}

export default formFieldWithSelect(RadioGroup);
