import type { Config } from "jest";

const config: Config = {
  verbose: true,
  // Use ts-jest to transform TypeScript and JSX files
  preset: "ts-jest",
  testEnvironment: "jsdom",

  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },

  // Transform TypeScript and JSX files using ts-jest
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },

  // Ignore transformation of node_modules (except specific cases if needed)
  transformIgnorePatterns: ["/node_modules/(?!@mui)"],

  // Specify file extensions to be handled by Jest
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  moduleNameMapper: {
    // Mock static files (e.g., CSS, images) since Jest can't process them
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
};

export default config;
