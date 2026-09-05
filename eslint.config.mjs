import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import stylistic from '@stylistic/eslint-plugin'

const eslintConfig = defineConfig([
  ...nextVitals,

  {
    plugins: {
      '@stylistic': stylistic,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next', '^[a-z]'],
            ['^@/i18n'],
            ['^@/constant'],
            ['^@/app/actions'],
            ['^@/context', '^@/hooks', '^@/utils', '^@/helpers'],
            ['^@/components', '^@/modules', '^@/widgets', '^@/sections', '^\\.\\./'],
            ['^\\./action'],
            ['^\\./(?!(index\\.module\\.scss|.*\\.css$))'],
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      '@stylistic/comma-spacing': ['error', { before: false, after: true }],
      '@stylistic/object-curly-spacing': ['error', 'always'],

      '@stylistic/object-curly-newline': [
        'error',
        {
          ImportDeclaration: { multiline: true, minProperties: 4 },
          ExportDeclaration: { multiline: true, minProperties: 4 },
          // Звичайні об'єкти в коді НЕ чіпаємо:
          ObjectExpression: { consistent: true },
          ObjectPattern: { consistent: true },
        },
      ],

      '@stylistic/object-property-newline': 'off',

      '@stylistic/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          ignoredNodes: [
            'JSXElement',
            'JSXElement *',
            'JSXFragment',
            'JSXFragment *',
            'ConditionalExpression',
            'JSXAttribute',
            'JSXExpressionContainer',
            'CallExpression > ObjectExpression',
          ],
        },
      ],

      '@stylistic/jsx-indent': 'off',
      '@stylistic/jsx-indent-props': 'off',
      '@stylistic/jsx-wrap-multilines': 'off',
      '@stylistic/jsx-curly-newline': 'off',
      '@stylistic/jsx-one-expression-per-line': 'off',

      '@stylistic/semi': ['error', 'never'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
    },
  },

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
])

export default eslintConfig
