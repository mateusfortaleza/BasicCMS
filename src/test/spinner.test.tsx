import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "../components/ui/spinner";

describe("Spinner", () => {
  it("renders with role='status' for accessibility", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders with aria-label='Loading' for screen readers", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("applies animate-spin class for the spinning animation", () => {
    render(<Spinner />);
    const icon = screen.getByRole("status");
    expect(icon).toHaveClass("animate-spin");
  });

  it("applies size-4 class by default", () => {
    render(<Spinner />);
    const icon = screen.getByRole("status");
    expect(icon).toHaveClass("size-4");
  });

  it("merges custom className with default classes", () => {
    render(<Spinner className="text-blue-500 size-8" />);
    const icon = screen.getByRole("status");
    // Custom size-8 should override default size-4 via tailwind-merge
    expect(icon).toHaveClass("text-blue-500");
    expect(icon).toHaveClass("animate-spin");
  });

  it("forwards additional SVG props to the underlying icon", () => {
    render(<Spinner data-testid="my-spinner" />);
    expect(screen.getByTestId("my-spinner")).toBeInTheDocument();
  });

  it("is visible in the DOM (not hidden)", () => {
    render(<Spinner />);
    const icon = screen.getByRole("status");
    expect(icon).toBeVisible();
  });
});