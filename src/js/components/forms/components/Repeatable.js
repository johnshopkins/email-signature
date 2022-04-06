const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;
const { createElement, createRef, Component } = wp.element;
import { ReactSortable } from 'react-sortablejs';
import Button from './Button';
import FormComponents from './index';
import FormField from './FormField';
import formFieldWithSelect from '../utils/formFieldWithSelect';

class Repeatable extends FormField {

  constructor(props) {

    super(props);

    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.sort = this.sort.bind(this);

    this.classes = ['repeatable', 'force'].concat(this.props.classes || []);

    this.max = this.props.max;
    this.min = this.props.required && this.props.min === 0 ? 1 : this.props.min; // if required, make sure this.min is at least 1

    this.fieldset = createRef();

    this.repeatable = true;

  }

  componentDidMount() {

    const value = this.min > 0 ?
      new Array(this.min).fill(this.getDefaultValue()) :
      [];

    this.props.setInitialValue(this.props.name, value, true);

  }

  componentDidUpdate(prevProps) {

    if (prevProps.length !== null && this.props.length === (prevProps.length + 1)) {

      // selected first element in newly added field group
      const groups = this.fieldset.current.querySelectorAll('.repeatable-group');
      const justAdded = groups[groups.length - 1];
      justAdded.querySelector('.form_field input, .form_field select, .form_field checkbox, .form_field radio, .form_field textarea').focus();
      
    }
  }

  getDefaultValue() {

    const defaultValue = {};

    this.props.content.map((content) => {

      let value = '';

      if (typeof content.props.defaultValue === 'function') {
        value = content.props.defaultValue.call(null, this.props);
      } else if (content.props.defaultValue) {
        value = content.props.defaultValue;
      }

      defaultValue[content.props.name] = value;
    });

    return defaultValue;
    
  }

  add() {

    this.props.addValue(this.props.name, this.getDefaultValue());

  }

  delete(i) {

    this.props.removeValue(this.props.name, i);

  }

  sort(values) {

    this.props.updateValue(this.props.name, values);

  }

  ensureUniqueOptions(name, currentValue, options) {

    const takenValues = this.props.val.map(value => {
      if (value[name] !== '') {
        return value[name];
      }
    }).filter(value => typeof value !== 'undefined');

    const newOptions = options.filter(option => {

      const isCurrentValue = currentValue === option.value;
      const isAlreadyTaken = takenValues.indexOf(option.value) > -1;

      return isCurrentValue || !isAlreadyTaken;

    });

    return newOptions;

  }

  render() {

    if (!this.props.val) {
      // before initial value
      return '';
    }

    const sort = this.props.length > 1;
    const trash = this.props.length > this.min;
    const add = this.max ? this.props.length < this .max : true;

    if ((sort || trash) && this.classes.indexOf('with-controls') === -1) {
      this.classes.push('with-controls');
    }
    
    return (
      <fieldset className={this.classes.join(' ')} ref={this.fieldset}>
        <legend>{this.props.required && <span className={'required'}>*</span>}{this.props.label}</legend>
        {this.props.help && <p className="help">{this.props.help}</p>}
        <ReactSortable
          animation={150}
          ghostClass={'drag'}
          handle={'.sort'}
          list={this.props.val}
          setList={this.sort}
        >
          {this.props.val.map((currentValue, i) => {
            return (
              <div className={'repeatable-group force'} key={`group-${i}`}>
                <div className={'repeatable-fields'}>
                  {this.props.content.map((item, j) => {
                    const TagName = item.type;
                    const Tag = FormComponents[TagName];
                    const parent = { name: this.props.name, i: i };
                    let props = Object.assign({}, item.props);
                    props.onChange = (name, value) => {
                      this.handleChange(name, value, i);
                      if (typeof item.props.onChange === 'function') {
                        item.props.onChange.call(null, parent, value, this.props.updateValue);
                      }
                      if (item.type === 'Select' && item.props.unique) {
                        // removes newly taken value from already existing selects
                        this.forceUpdate()
                      }
                    };
                    props.uniqueName = `${this.props.name}_${props.name}[${i}]`;
                    props.parent = parent; // signal individual FormField class not to save values to session storage
                    props.storeName = this.props.storeName;
                    

                    if (item.type === 'Select' && item.props.unique) {
                      props.options = this.ensureUniqueOptions(props.name, this.props.val[i][props.name], props.options);
                    }

                    props.key = j;
                    return <Tag {...props} />;
                  })}
                </div>
                <div className={'repeatable-controls'} key={`controls-${i}`}>
                  {sort && <img className={'sort'} src={'/build/images/forms/sort-1a4da3b24a.svg'} />}
                  {trash && <img className={'trash'} src={'/build/images/forms/trash-5a0ff6b5ee.svg'} onClick={() => this.delete(i)} />}
                </div>
              </div>
            );
          })}
          </ReactSortable>
        {add && <Button name={'add'} value={this.props.addText || 'Add another'} onClick={this.add} />}
      </fieldset>
    );
  };

}

Repeatable.defaultProps = {
  content: [],
  min: 0,
  required: false,
};

export default formFieldWithSelect(Repeatable);
