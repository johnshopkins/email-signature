const { createElement, createRef, Component } = wp.element;

class FormField extends Component {

  constructor(props) {

    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.classes = ['form_field', 'force'].concat(this.props.classes || []);

    // for labels
    this.id = this.props.name + '-id';

    // some fields should not show the default label (ex: checkboxes)
    this.showLabel = typeof this.props.showLabel === 'boolean' ? this.props.showLabel : true;

    this.parent = this.props.parent || false;

    this.formFieldContainer = true;

    this.formFieldRef = createRef();

    this.defaultInitialValue = '';
    
  }

  componentDidMount() {

    if (this.parent) {
      // child of repeatable (repeatable handles initial value setting)
      return;
    }

    let value = this.defaultInitialValue;

    if (typeof this.props.defaultValue === 'function') {
      value = this.props.defaultValue.call();
    } else if (typeof this.props.defaultValue !== 'undefined') {
      value = this.props.defaultValue;
    }

    this.props.setInitialValue(this.props.name, value);

  }

  handleChange() {

    const field = this.formFieldRef.current;

    if (!field) {
      // button
      return;
    }

    const value = this.getFieldValue(field);

    this.props.updateValue(this.props.name, value, this.parent);

    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.name, value);
    }

  }

  getFieldValue(field) {
    return field.type === 'checkbox' ? field.checked : field.value;
  }

  getFieldLabel() {

    if (!this.props.label) {
      return '';
    }

    let labelClasses = [];
    if (!this.showLabel) {
      labelClasses.push('visuallyhidden');
    }
    
    return (
      <label htmlFor={this.id} className={labelClasses}>
        {this.props.required && <span className={'required'}>*</span>}
        {this.props.label}
      </label>
    );
  }

  getFieldHelp() {
    if (!this.props.help) {
      return ''
    }

    return <div className={'help'}>{this.props.help}</div>;
  }

  getFieldElements() {
    return (
      <>
        {this.getFieldLabel()}
        {this.getFieldHelp()}
        {this.getField()}
      </>
    )
  }

  render() {
    
    if (this.formFieldContainer) {
      return (
        <div className={this.classes.join(' ')}>
          {this.getFieldElements()}
        </div>
      );
    } else {
      return this.getFieldElements();
    }
  };

}

export default FormField;
