// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
  typescript: true,
  formatters: true,
  stylistic: {
    semi: true,
    indent: 4,
    quotes: 'single',
  },
  rules: {
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
      ignore: ['README.md'],
    }],
  },
});
