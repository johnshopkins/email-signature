/**
 * Look in session storage for initial values
 */
export default function (name, repeatable) {

  if (!Modernizr.sessionstorage) {
    return null;
  }

  let value = sessionStorage.getItem(name);

  if (repeatable) {
    // catch any json parsing errors
    try {

      value = JSON.parse(value);

    } catch (error) {
      logger.log('Malformed JSON in repeatable element', {
        level: 'warning',
        data: {
          error: error,
          field_name: name,
          session_data: value
        }
      });
    }
  }

  return value;
}
