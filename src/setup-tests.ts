import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Делаем очистку после каждого выполненного теста.
afterEach(() => {
	cleanup();
});
