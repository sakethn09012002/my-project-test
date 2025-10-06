import "@testing-library/jest-dom";

// Mock next-auth core
jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn(() => Promise.resolve()), // mock NextAuth itself
}));

// Mock next-auth/react (hooks and helpers)
jest.mock("next-auth/react", () => ({
  __esModule: true,
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
}));
