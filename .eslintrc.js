module.exports = {
  extends: "next/core-web-vitals",
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: require.resolve("next/dist/compiled/babel/eslint-parser"),
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [require.resolve("next/babel")],
        },
      },
    },
  ],
  rules: {
    "@next/next/no-img-element": "off",
  },
};
