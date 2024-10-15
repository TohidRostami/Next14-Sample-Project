// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Use ts-jest to handle TypeScript files
  testEnvironment: 'jsdom', // For testing React components with DOM
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Handle module aliases if any (update this according to your paths)
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // For custom matchers from @testing-library/jest-dom
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Recognize .ts and .tsx extensions
};

export default config;
