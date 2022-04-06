import FormComponents from '../components/index';

export default function (items, storeName) {
  if (!items) return '';
  
  return items.map((item, i) => {
    const TagName = item.type;
    const Tag = FormComponents[TagName]
    let props = item.props || {};
    props.key = i;
    props.storeName = storeName;
    return <Tag {...props} />;
  })
};
