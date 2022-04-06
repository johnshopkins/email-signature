const { createElement } = wp.element;

export default function ({ errors }) {
  if (errors.length === 0) {
    return null;
  }

  const text = errors.length === 1 ? 'error' : 'errors';

  return (
    <div className={'errors'}>
      <p>Please correct the following {text}:</p>
      <ul>{errors.map((error, i) => <li key={i}>{error}</li>)}</ul>
    </div>
  );
};
