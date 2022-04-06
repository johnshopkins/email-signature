export default function ({ message }) {
  return (
    <div className={'loading'}>
      <i className={'fa fa-circle-o-notch fa-spin'} aria-hidden={'true'}></i>
      <span>{message}</span>
    </div>
  );
};
