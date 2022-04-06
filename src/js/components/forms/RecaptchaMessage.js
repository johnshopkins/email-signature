const { createElement } = wp.element;

export default function () {
  return (
    <div className={'recaptcha'}>
      This form is protected by reCAPTCHA. The Google <a href="https://policies.google.com/privacy">Privacy Policy</a> and <a href="https://policies.google.com/terms">Terms of Service</a> apply.
    </div>
  );
};
