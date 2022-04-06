const { createElement } = wp.element;

import jhuLogos from './jhu-logos';
import optionalLogos from './optional-logos';

const joinWith = (array, tag) => {
  return array.length > 0
    ? array.reduce((result, item) => <>{result}{tag}{item}</>)
    : null;
};

const compileTitles = (data) => {

  let titles = [];

  if (data.length > 1 && data[0].department.toLowerCase() === data[1].department.toLowerCase()) {
    // more than one title for the same department
    titles = [
      data[0].title.trim(),
      data[1].title.trim(),
      data[0].department.trim()
    ];
  } else {
    // one title or different titles for multiple departments
    titles = data.map(value => `${value.title.trim()} | ${value.department.trim()}`)
  }

  return titles;

};

const compileAddress = (data) => {
  // console.log(data);
  const address = data.map(item => item.line);
  return joinWith(address, <>, </>)
};

const compilePhoneNumbers = (data) => {
  const numbers = data.map(item => <>{item.phone_label.trim()}: {item.phone_number.trim()}</>);
  return joinWith(numbers, <>&nbsp;&nbsp;</>)
};

const compileLinks = (data) => {
  if (!data) {
    return null;
  }
  
  const array = data.map((item, i) => <a href={item.url} key={i} style={{ color: '#3d528c' }}>{item.text}</a>);
  return joinWith(array, <>&nbsp;|&nbsp;</>);
};

const compileSocialMedia = (data) => {
  if (!data) {
    return null;
  }

  const array = data.map((item, i) => {
    return (
      <a href={item.url} key={i}>
        <img src={`https://www.jhu.edu/assets/uploads/email-signature/${item.platform}.gif`} alt={item.platform} width={'26'} height={'26'} />
      </a>
    );
  });

  return joinWith(array, <>&nbsp;</>);
};

export default function ({ data }) {

  const logo = jhuLogos[data.logo];
  const optionalLogo = optionalLogos[data.optional_logo] ?? null;
  
  let lines = [<><strong style={{ color: '#000000' }}>{data.name}</strong>{ data.pronouns && <>&nbsp;({data.pronouns})</> }</>]
    .concat(compileTitles(data.title_department));
  
  if (data.division) {
    lines = lines.concat([data.division]);
  }
  
  lines = lines.concat(['Johns Hopkins University'])
    .concat([compileAddress(data.address)])
    .concat([compilePhoneNumbers(data.phone_numbers)]);

  return (
    <table border="0" cellSpacing="0" cellPadding="0" style={{ backgroundColor: '#ffffff' }}>
      <tbody>
        <tr>
          <td>
            <table border="0" cellSpacing="0" cellPadding="0">
              <tbody>
                <tr>
                  <td style={{ padding: '30px 0px', borderTop: '1px solid #002d72', borderBottom: '1px solid #002d72', borderLeft: 'none', borderRight: 'none' }}>
                    <table border="0" cellSpacing="0" cellPadding="0">
                      <tbody>
                        <tr>
                          <td style={{ padding: '0px 10px', color: '#555555', fontFamily: 'Tahoma, sans-serif', fontSize: '12px', lineHeight: '20px' }}>
                            <em>{joinWith(lines, <br />)}</em>
                          </td>
                        </tr>
                        {data.links.length > 0 &&
                          <tr>
                            <td style={{ padding: '8px 10px 0px 10px', color: '#555555', fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
                              {compileLinks(data.links)}
                            </td>
                          </tr>
                        }
                        {data.social_media.length > 0 &&
                          <tr>
                            <td style={{ padding: '12px 0px 0px 9px' }}>
                              {compileSocialMedia(data.social_media)}
                            </td>
                          </tr>
                        }
                        <tr>
                          <td style={{ padding: '20px 0px 0px 6px' }}>
                            {logo.link ? (
                              <a href={logo.link}>
                                <img src={`https://www.jhu.edu/assets/uploads/email-signature/${logo.filename}`} width={logo.width} height={logo.height} alt={logo.alt} />
                              </a>
                              ) : (
                                <img src={`https://www.jhu.edu/assets/uploads/email-signature/${logo.filename}`} width={logo.width} height={logo.height} alt={logo.alt} />
                              )}
                          </td>
                        </tr>
                        {data.confidentiality_notice.length > 0 &&
                          <tr>
                            <td style={{ padding: '20px 10px 0px 10px', color: '#888888', fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
                              <em>{data.confidentiality_notice}</em>
                            </td>
                          </tr>
                        }
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        {optionalLogo && 
        <tr>
          <td style={{ padding: '30px 7px', border: 'none' }}>
            <img src={`https://www.jhu.edu/assets/uploads/email-signature/${optionalLogo.filename}`} width={optionalLogo.width} height={optionalLogo.height} alt={optionalLogo.alt} />
          </td>
        </tr>
        }
      </tbody>
    </table>
  );
};
