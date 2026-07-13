import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      '_ds_bundle.js',
      'support.js',
      'templates/**',
      'guidelines/**',
      'ui_kits/**',
      '*.dc.html',
    ],
  },
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
];

export default eslintConfig;
