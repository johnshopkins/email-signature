const { createElement, render } = wp.element;

import EmailSignatureGenerator from './components/EmailSignatureGenerator';

wp.domReady(() => {

  render(
    createElement(EmailSignatureGenerator),
    document.querySelector('.email-signature-generator')
  );

});
