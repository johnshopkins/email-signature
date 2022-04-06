const { createElement } = wp.element;

export default function ({ disabled, name, onClick, value }) {
  return (
    <input
      type='button'
      name={name}
      className={'btn'}
      value={value}
      disabled={disabled || false}
      onClick={onClick || function () { }}
    />
  );
};
