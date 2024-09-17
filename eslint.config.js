import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: ["react", "react-hooks"],
    extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  },
];
