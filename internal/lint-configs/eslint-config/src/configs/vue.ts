import type {Linter} from "eslint";
import {interopDefault} from "../utils";

export async function vue():Promise<Linter.Config[]> {
  const [pluginVue,parserVue, parserTs] = await Promise.all([
    interopDefault(import('eslint-plugin-vue')),
    interopDefault(import('vue-eslint-parser')),
    // @ts-expect-error missing types
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  return [{
    files:['**/*.vue'],
    languageOptions:{
      parser:parserVue,
      parserOptions:{
        ecmaFeatures: {jsx: true},
        extraFileExtensions: ['.vue'],
        parser: parserTs,
        sourceType: 'module',
      }
    },
    plugins:{
      vue:pluginVue,
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs.base.rules,
      ...pluginVue.configs['vue3-essential'].rules,
      ...pluginVue.configs['vue3-strongly-recommended'].rules,
      ...pluginVue.configs['vue3-recommended'].rules,

      'vue/attribute-hyphenation': [
        'error',
        'always',
        {
          ignore: [],
        },
      ],
      'vue/attributes-order': 'off',
      'vue/block-order': [
        'error',
        {
          order: ['script', 'template', 'style'],
        },
      ],
      'vue/eqeqeq': ['error', 'smart'],
      'vue/html-closing-bracket-newline': 'error',
      'vue/html-indent': 'off',
      // 'vue/html-indent': ['error', 2],
      'vue/html-quotes': ['error', 'double'],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            component: 'always',
            normal: 'never',
            void: 'always',
          },
          math: 'always',
          svg: 'always',
        },
      ],
      'vue/max-attributes-per-line': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/multiline-html-element-content-newline': 'error',
      'vue/no-empty-pattern': 'error',
    }

  }]
}
