import baseConfig, { restrictEnvAccess } from "@tsuro/eslint-config/base";
import nextjsConfig from "@tsuro/eslint-config/next-js";
import reactConfig from "@tsuro/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
