module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    "transform-remove-strict-mode",
    "@babel/plugin-transform-runtime",

    "@babel/plugin-proposal-class-properties",

    ["@babel/plugin-transform-modules-commonjs", { "strictMode": false }]
  ]
}
