import { t } from 'i18next';
import React from 'react';

function PageHeader({ title }) {
  return <h3 className='text-center mt-3 mb-5'>{t(title)}</h3>;
}

export default PageHeader;
