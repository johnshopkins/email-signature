const getAvailableLogos = () => {

  /*
  Possible values: 
  Whiting School of Engineering
  School of Public Health
  Academic Centers
  SAIS
  School of Medicine
  School of Arts & Sciences
  University Student Services
  University Administration
  Carey Business School
  School of Nursing
  School of Education
  Libraries
  Peabody
  SPSBE
  APL
  Center for Talented Youth
  */

  let availableLogos = [
    { value: 'university', label: 'University' }
  ];

  const logos = {
    'APL': [{ value: 'apl', label: 'Applied Physics Laboratory' }],
    'School of Public Health': [{ value: 'bloomberg', label: 'Bloomberg School of Public Health' }],
    'Center for Talented Youth': [{ value: 'cty', label: 'Center for Talented Youth' }],
    'Carey Business School': [{ value: 'carey', label: 'Carey Business School' }],
    'School of Education': [{ value: 'education', label: 'School of Education' }],
    'School of Arts & Sciences': [{ value: 'krieger', label: 'Krieger School of Arts & Sciences' }],
    'School of Medicine': [{ value: 'medicine', label: 'School of Medicine' }],
    'School of Nursing': [{ value: 'nursing', label: 'School of Nursing' }],
    'Peabody': [{ value: 'peabodyInstitute', label: 'Peabody Institute' }],
    'SAIS': [{ value: 'sais', label: 'School of Advanced International Studies' }],
    'Libraries': [{ value: 'libraries', label: 'Libraries' }, { value: 'libraries_museums', label: 'Sheridan Libraries & University Museums' }],
    'Whiting School of Engineering': [{ value: 'whiting', label: 'Whiting School of Engineering' }]
  };

  if (serverData.other.unit && logos[serverData.other.unit]) {
    logos[serverData.other.unit].forEach(logo => availableLogos.push(logo));
  }

  return availableLogos;

};

const getSocialUrl = (platform) => {
  const values = {
    facebook: 'http://www.facebook.com/johnshopkinsuniversity',
    twitter: 'http://www.twitter.com/JohnsHopkins',
    instagram: 'http://instagram.com/johnshopkinsu',
    linkedin: 'https://www.linkedin.com/edu/the-johns-hopkins-university-18560',
    youtube: 'http://www.youtube.com/johnshopkins'
  };

  return values[platform] || '';
};

export default {
  content: [
    {
      type: 'Textbox',
      props: {
        name: 'name',
        label: 'Full name',
        required: true
      }
    },
    {
      type: 'Textbox',
      props: {
        name: 'pronouns',
        label: 'Pronouns',
        help: 'Example: she, her, hers'
      }
    },
    {
      type: 'Repeatable',
      props: {
        name: 'title_department',
        label: 'Title and department',
        max: 2,
        required: true,
        classes: ['title_department'],
        content: [
          {
            type: 'Textbox',
            props: {
              name: 'title',
              label: 'Title',
              placeholder: 'Title',
              required: true,
              classes: ['title-field'],
            }
          },
          {
            type: 'Textbox',
            props: {
              name: 'department',
              label: 'Department',
              placeholder: 'Department',
              required: true,
              classes: ['department-field'],
            }
          }
        ]
      }
    },
    {
      type: 'Textbox',
      props: {
        name: 'division',
        label: 'Division'
      }
    },
    // {
    //   type: 'Textbox',
    //   props: {
    //     name: 'email',
    //     label: 'Email',
    //     textBoxType: 'email',
    //     required: true
    //   }
    // },
    {
      type: 'Repeatable',
      props: {
        name: 'phone_numbers',
        label: 'Phone number(s)',
        addText: 'Add phone number',
        // required: true,
        classes: ['phone_numbers'],
        max: 3,
        content: [
          {
            type: 'Select',
            props: {
              name: 'phone_label',
              label: 'Label',
              classes: ['label-field'],
              required: true,
              unique: true,
              options: [
                { value: '', label: 'Choose type' },
                { value: 'O', label: 'Office' },
                { value: 'C', label: 'Cell' },
                { value: 'F', label: 'Fax' }
              ],
            }
          },
          {
            type: 'Textbox',
            props: {
              name: 'phone_number',
              label: 'Phone number',
              classes: ['number-field'],
              textBoxType: 'tel',
              placeholder: '555-555-5555',
              required: true
            }
          },
        ]
      }
    },
    {
      type: 'Repeatable',
      props: {
        name: 'address',
        label: 'Address',
        addText: 'Add address line',
        classes: ['address no-labels'],
        max: 3,
        content: [
          {
            type: 'Textbox',
            props: {
              name: 'line',
              label: 'Line',
              showLabel: false,
              required: true
            }
          }
        ]
      }
    },
    {
      type: 'Repeatable',
      props: {
        name: 'social_media',
        label: 'Social Media',
        addText: 'Add social media',
        help: 'Please do not link to personal accounts, but rather to departmental, divisional or university level accounts. Remember to include https:// in the URL.',
        classes: ['social_media'],
        max: 5,
        content: [
          {
            type: 'Select',
            props: {
              name: 'platform',
              label: 'Platform',
              classes: ['platform-field'],
              required: true,
              unique: true,
              onChange: (parent, newValue, updateValue) => {
                updateValue('url', getSocialUrl(newValue), parent);
              },
              options: [
                { value: '', label: 'Choose platform' },
                { value: 'facebook', label: 'Facebook' },
                { value: 'twitter', label: 'Twitter' },
                { value: 'instagram', label: 'Instagram' },
                { value: 'linkedin', label: 'LinkedIn' },
                { value: 'youtube', label: 'YouTube' }
              ]
            }
          },
          {
            type: 'Textbox',
            props: {
              name: 'url',
              label: 'URL',
              classes: ['url-field'],
              textBoxType: 'url',
              defaultValue: (platform) => {
                return getSocialUrl(platform);
              },
              required: true
            }
          },
        ]
      }
    },
    {
      type: 'Repeatable',
      props: {
        name: 'links',
        label: 'Links',
        addText: 'Add link',
        max: 2,
        help: 'Add up to two custom links. Remember to include https:// in the URL.',
        classes: ['links'],
        content: [
          {
            type: 'Textbox',
            props: {
              name: 'text',
              label: 'Link text',
              classes: ['text-field'],
              required: true
            }
          },
          {
            type: 'Textbox',
            props: {
              name: 'url',
              label: 'URL',
              classes: ['url-field'],
              textBoxType: 'url',
              placeholder: 'https://',
              required: true
            }
          },
        ]
      }
    },
    {
      type: 'Textarea',
      props: {
        name: 'confidentiality_notice',
        label: 'Confidentiality notice',
        defaultValue: 'This e-mail contains information that may be confidential. If you have received this in error, please notify me immediately and delete this e-mail.',
        rows: 5
      }
    },
    {
      type: 'Fieldset',
      props: {
        label: 'Logo(s)',
        content: [
          {
            type: 'RadioGroup',
            props: {
              name: 'logo',
              label: 'Johns Hopkins University logo',
              required: true,
              defaultValue: 'university',
              options: getAvailableLogos()
            }
          },
          {
            type: 'RadioGroup',
            props: {
              name: 'optional_logo',
              label: 'Optional logos',
              defaultValue: '',
              options: [
                { value: '', label: 'None' },
                { value: 'socialcompact', label: 'JHU Social Compact' }
              ]
            }
          }
        ]
      }
    }
  ],
  // className: 'horizontal',
  id: 'email-signature-generator',
  submitText: 'Generate'
};
