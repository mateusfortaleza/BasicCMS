import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock table components for herocard loading
vi.mock("@/components/ui/table", () => ({
  Table: ({ children }: any) => <table>{children}</table>,
  TableBody: ({ children }: any) => <tbody>{children}</tbody>,
  TableCell: ({ children, className }: any) => <td className={className}>{children}</td>,
  TableHead: ({ children, className }: any) => <th className={className}>{children}</th>,
  TableHeader: ({ children }: any) => <thead>{children}</thead>,
  TableRow: ({ children }: any) => <tr>{children}</tr>,
}));

import HeroCardLoading from "../app/herocard/(herocard-list)/loading";
import EditPageLoading from "../app/herocard/edit/[id]/(herocard-edit)/loading";

describe("HeroCardLoading (herocard/loading.tsx)", () => {
  it("renders without crashing", () => {
    const { container } = render(<HeroCardLoading />);
    expect(container).toBeTruthy();
  });

  it("renders the table header with column labels", () => {
    render(<HeroCardLoading />);
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Image Path")).toBeInTheDocument();
    expect(screen.getByText("Color of the card")).toBeInTheDocument();
    expect(screen.getByText("Link to the article")).toBeInTheDocument();
  });

  it("renders 4 skeleton rows", () => {
    render(<HeroCardLoading />);
    // Each skeleton row has animate-pulse divs
    const skeletonDivs = document.querySelectorAll(".animate-pulse");
    // At least 4 visible skeleton cells (one per row in first column)
    const h4Divs = document.querySelectorAll(".h-4.w-32.animate-pulse");
    expect(h4Divs.length).toBe(4);
  });

  it("renders circular skeleton buttons (action column)", () => {
    render(<HeroCardLoading />);
    const roundedFull = document.querySelectorAll(".rounded-full.animate-pulse");
    expect(roundedFull.length).toBe(4);
  });

  it("contains a colgroup with 5 columns", () => {
    render(<HeroCardLoading />);
    const cols = document.querySelectorAll("col");
    expect(cols.length).toBe(5);
  });
});

describe("EditPageLoading (herocard/edit/[id]/loading.tsx)", () => {
  it("renders without crashing", () => {
    const { container } = render(<EditPageLoading />);
    expect(container).toBeTruthy();
  });

  it("renders animated skeleton elements", () => {
    render(<EditPageLoading />);
    const pulseDivs = document.querySelectorAll(".animate-pulse");
    // Multiple skeleton sections: back button, legend, 4 field labels, 4 field inputs, submit button
    expect(pulseDivs.length).toBeGreaterThan(5);
  });

  it("renders a skeleton for the back button area", () => {
    render(<EditPageLoading />);
    const backButtonSkeleton = document.querySelector(".h-9.w-20.animate-pulse");
    expect(backButtonSkeleton).not.toBeNull();
  });

  it("renders a skeleton for the form title area", () => {
    render(<EditPageLoading />);
    const titleSkeleton = document.querySelector(".h-6.w-32.animate-pulse");
    expect(titleSkeleton).not.toBeNull();
  });

  it("renders a large skeleton for the image upload area", () => {
    render(<EditPageLoading />);
    // The image area skeleton has h-75
    const imageSkeleton = document.querySelector(".h-75.w-full.animate-pulse");
    expect(imageSkeleton).not.toBeNull();
  });

  it("renders a small skeleton for the color picker area", () => {
    render(<EditPageLoading />);
    // Color picker area: h-9 w-12
    const colorSkeleton = document.querySelector(".h-9.w-12.animate-pulse");
    expect(colorSkeleton).not.toBeNull();
  });

  it("renders exactly 4 field label skeletons", () => {
    render(<EditPageLoading />);
    // Each field has a h-4 w-10 label skeleton
    const labelSkeletons = document.querySelectorAll(".h-4.w-10.animate-pulse");
    expect(labelSkeletons.length).toBe(4);
  });
});