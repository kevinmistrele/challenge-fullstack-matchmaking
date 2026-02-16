import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importHelpers from 'eslint-plugin-import-helpers';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist'] },

  // 🔒 STRICT DOMAIN RULES
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import-helpers': importHelpers,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      'prettier/prettier': 'error',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],
      complexity: ['error', 10],
      'no-console': 'warn',

      'import-helpers/order-imports': [
        'error',
        {
          newlinesBetween: 'always',
          groups: [
            'module',
            '/^@application/',
            '/^@features/',
            '/^@screens/',
            '/^@components/',
            '/^@types/',
            '/^@\\//',
            ['parent', 'sibling', 'index'],
          ],
          alphabetize: { order: 'asc', ignoreCase: true },
        },
      ],
    },
  },

  // 🧩 DESIGN SYSTEM FLEXIBILITY
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'max-lines-per-function': 'off',
      complexity: 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react-hooks/purity': 'off',
      'react-refresh/only-export-components': 'off',
    },
  },

  eslintConfigPrettier,
);
