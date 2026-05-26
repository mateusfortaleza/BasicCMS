import { describe, it, expect, vi } from "vitest";

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

// Also mock unused imports in page.tsx
vi.mock("./herocard/page", () => ({
  default: vi.fn(),
}));
vi.mock("./herocard/loading", () => ({
  default: vi.fn(),
}));

import { redirect } from "next/navigation";
import Home from "../app/page";

describe("Home page (app/page.tsx)", () => {
  it("redirects to /herocard", () => {
    expect(() => Home()).toThrow("NEXT_REDIRECT:/herocard");
    expect(vi.mocked(redirect)).toHaveBeenCalledWith("/herocard");
  });

  it("calls redirect exactly once", () => {
    vi.mocked(redirect).mockClear();
    try { Home(); } catch {}
    expect(vi.mocked(redirect)).toHaveBeenCalledOnce();
  });
});

// Tests for the create page route
vi.mock("@/components/create-page", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="create-page">{title}</div>
  ),
}));

import { render, screen } from "@testing-library/react";
import HeroCardCreatePage from "../app/herocard/create/page";

describe("HeroCardCreatePage (herocard/create/page.tsx)", () => {
  it("renders CreatePage with title 'Create Hero Card'", async () => {
    const jsx = await HeroCardCreatePage();
    render(jsx);
    expect(screen.getByTestId("create-page")).toBeInTheDocument();
    expect(screen.getByText("Create Hero Card")).toBeInTheDocument();
  });
});