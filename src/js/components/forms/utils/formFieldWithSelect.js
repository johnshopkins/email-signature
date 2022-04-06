const { compose } = wp.compose;
const { withDispatch, withSelect } = wp.data;

export default function (object) {
  return compose([
    withDispatch((dispatch, ownProps) => {

      return {
        addValue: dispatch(ownProps.storeName).addValue,
        setInitialValue: dispatch(ownProps.storeName).setInitialValue,
        removeValue: dispatch(ownProps.storeName).removeValue,
        updateValue: dispatch(ownProps.storeName).updateValue
      };

    }),
    withSelect((select, ownProps) => {

      const returnObj = {
        repeatable: ownProps.content ? true : false,
        val: select(ownProps.storeName).getValue(ownProps.name, ownProps.parent || false)
      };

      if (returnObj.repeatable) {
        // repeatable
        // WordPress doesn't detect changes in array length, so I had to create a
        // separate prop that keeps track of the length and WordPress does detect changes in.
        returnObj.length = select(ownProps.storeName).getLength(ownProps.name);
      }

      return returnObj;
    })
  ])(object);
};


