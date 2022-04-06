const { createElement } = wp.element;

import printFields from '../utils/printFields';

export default function ({ classes, content, help, label, storeName }) {

  classes = classes || [];

  return (
    <fieldset className={classes.join(' ')}>
      <legend>{label}</legend>
      {help && <p className={'help'}>{help}</p>}
      {printFields(content, storeName)}
    </fieldset>
  );
};
