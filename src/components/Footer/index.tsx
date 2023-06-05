import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} Made by Tobit`}
      links={[
        {
          key: 'logicea',
          title: 'Logicea',
          href: 'https://logicea.com',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
