const { createElement } = wp.element;

export default function ({ disabled, name, onClick, value }) {
  return (
    <input
      type='submit'
      name={name || 'submit'}
      className={'btn'}
      value={value || 'Submit'}
      disabled={disabled || false}
      onClick={onClick || function () { }}
    />
  );
};
