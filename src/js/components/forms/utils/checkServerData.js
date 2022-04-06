/**
   * Look in the server data for the inital value
   */
export default function (name, repeatable) {

  let value = null;

  const serverDataValue = serverData.form_fields[name];
  if (typeof serverDataValue !== 'undefined') {
    value = serverDataValue;
  }

  return value;

}
