import { globalIgnores } from 'eslint/config';
import pluginJs from '@eslint/js';
import pluginTypeScriptESLint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginNode from 'eslint-plugin-n';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import parserTypeScript from '@typescript-eslint/parser';
import pluginImport from 'eslint-plugin-import';
import configPrettier from 'eslint-config-prettier';

import globals from 'globals';

export default pluginTypeScriptESLint.config(
  pluginReact.configs.flat.recommended,
  pluginJs.configs.recommended,
  pluginReactHooks.configs['recommended-latest'],
  pluginTypeScriptESLint.configs.recommended,
  pluginImport.flatConfigs.electron,
  pluginJsxA11y.flatConfigs.recommended,
  pluginNode.configs['flat/recommended-script'],
  globalIgnores([
    '**/node_modules',
    '**/dist',
    '**/release',
    '**/.idea',
    '**/.git',
    '**/.vscode',
    '**/.github',
    '**/buildAssets',
    '**/src/renderer/public',
    '**/tests/results',
    '**/package-lock.json',
  ]),
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: parserTypeScript,
        ecmaVersion: 2022,
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
      },
    },
    rules: {
      eqeqeq: 'error',
      'no-case-declarations': 'off',
      'no-trailing-spaces': 'error',
      'no-unsafe-optional-chaining': 'off',
      'no-control-regex': 'off',
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/node-builtins': 'off',
      'react/require-default-props': [
        'error',
        {
          forbidDefaultForRequired: true,
          functions: 'defaultArguments',
        },
      ],
      'react-hooks/exhaustive-deps': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      'react/jsx-filename-extension': [
        2,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.mts'],
        },
      ],
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/label-has-associated-control': 1,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  configPrettier,
);
