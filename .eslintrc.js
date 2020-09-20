// http://eslint.org/docs/user-guide/configuring

module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  env: {
    node: true
  },
  globals: {
    '$': true,
    'jquery': true,
    'CountUp': true,
    'Swiper': true,
    'ActiveXObject': true
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  // add your custom rules here
  'rules': {
    'vue/no-use-v-if-with-v-for': ["error", {
      "allowUsingIterationVar": true
    }],
    'no-unused-vars': ["error", {
      "vars": "all",
      "args": "none",
      "ignoreRestSiblings": false
    }],
    'one-var': [0, 'always'],
    'no-tabs': 0,
    // 'no-console': 0,
    // allow paren-less arrow functions
    "quotes": 0,
    'arrow-parens': 0,
    'no-unreachable': 0,
    "indent": ["off", 2],
    // allow async-await
    "no-case-declarations": 0,
    "no-mixed-spaces-and-tabs": 0,
    "eslint-disable-next-line": 0,
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-expressions': 0,
    'no-useless-escape': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
