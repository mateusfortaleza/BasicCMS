import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock getAllHeroCards DAL function
vi.mock("../dal/HeroCardDAO", () => ({
  getAllHeroCards: vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, "aria-label": ariaLabel }: any) => (
    <a href={href} aria-label={ariaLabel}>{children}</a>
  ),
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, className, type, size, ...props }: any) => (
    <button className={className} type={type} {...props}>{children}</button>
  ),
}));

vi.mock("@/components/ui/table", () => ({
  Table: ({ children }: any) => <table>{children}</table>,
  TableBody: ({ children }: any) => <tbody>{children}</tbody>,
  TableCaption: ({ children }: any) => <caption>{children}</caption>,
  TableCell: ({ children, className }: any) => <td className={className}>{children}</td>,
  TableHead: ({ children, className }: any) => <th className={className}>{children}</th>,
  TableHeader: ({ children }: any) => <thead>{children}</thead>,
  TableRow: ({ children }: any) => <tr>{children}</tr>,
}));

vi.mock("@remixicon/react", () => ({
  RiAddLargeLine: () => <svg data-testid="icon-add" />,
  RiDeleteBinLine: () => <svg data-testid="icon-delete" />,
  RiPencilLine: () => <svg data-testid="icon-pencil" />,
}));

import { getAllHeroCards } from "../dal/HeroCardDAO";
import editHomePage from "../app/herocard/page";

const mockGetAllHeroCards = vi.mocked(getAllHeroCards);

const sampleCards = [
  {
    id: 1,
    title_text: "Hero One",
    image_path: "https://example.com/hero1.jpg",
    color: "#ff0000",
    link: "https://article1.com",
  },
  {
    id: 2,
    title_text: "Hero Two",
    image_path: "https://example.com/hero2.jpg",
    color: "#00ff00",
    link: "https://article2.com",
  },
];

describe("editHomePage (herocard/page.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders column headers", async () => {
    mockGetAllHeroCards.mockResolvedValue([]);
    const jsx = await editHomePage();
    render(jsx);

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Image Path")).toBeInTheDocument();
    expect(screen.getByText("Color of the card")).toBeInTheDocument();
    expect(screen.getByText("Link to the article")).toBeInTheDocument();
  });

  it("renders a row for each hero card", async () => {
    mockGetAllHeroCards.mockResolvedValue(sampleCards);
    const jsx = await editHomePage();
    render(jsx);

    expect(screen.getByText("Hero One")).toBeInTheDocument();
    expect(screen.getByText("Hero Two")).toBeInTheDocument();
  });

  it("renders hero card color and link", async () => {
    mockGetAllHeroCards.mockResolvedValue(sampleCards);
    const jsx = await editHomePage();
    render(jsx);

    expect(screen.getByText("#ff0000")).toBeInTheDocument();
    expect(screen.getByText("https://article1.com")).toBeInTheDocument();
  });

  it("renders edit and delete links pointing to /herocard/edit/[id]", async () => {
    mockGetAllHeroCards.mockResolvedValue(sampleCards);
    const jsx = await editHomePage();
    render(jsx);

    // Both edit and delete buttons share the same aria-label (known source behavior)
    const linksForCard1 = screen.getAllByLabelText("Edit Hero One");
    expect(linksForCard1.length).toBe(2);
    expect(linksForCard1[0]).toHaveAttribute("href", "/herocard/edit/1");

    const linksForCard2 = screen.getAllByLabelText("Edit Hero Two");
    expect(linksForCard2.length).toBe(2);
    expect(linksForCard2[0]).toHaveAttribute("href", "/herocard/edit/2");
  });

  it("renders a create button linking to /herocard/create", async () => {
    mockGetAllHeroCards.mockResolvedValue([]);
    const jsx = await editHomePage();
    render(jsx);

    const createLink = screen.getByTestId("icon-add").closest("a");
    expect(createLink).toHaveAttribute("href", "/herocard/create");
  });

  it("renders an empty table when no hero cards exist", async () => {
    mockGetAllHeroCards.mockResolvedValue([]);
    const jsx = await editHomePage();
    render(jsx);

    // No data rows, only headers
    expect(screen.queryByRole("rowgroup")).toBeDefined();
    expect(screen.queryByText("Hero One")).not.toBeInTheDocument();
  });

  it("truncates image paths longer than 100 characters with ellipsis", async () => {
    const longPath = "https://blob.vercel.storage.com/hero-cards/" + "a".repeat(100);
    mockGetAllHeroCards.mockResolvedValue([
      { id: 10, title_text: "Long Path Card", image_path: longPath, color: "#fff", link: "https://x.com" },
    ]);
    const jsx = await editHomePage();
    render(jsx);

    const displayed = longPath.slice(0, 100) + "...";
    expect(screen.getByText(displayed)).toBeInTheDocument();
  });

  it("does not truncate image paths of exactly 100 characters", async () => {
    const exactPath = "https://example.com/" + "b".repeat(80); // exactly 100 chars
    expect(exactPath.length).toBe(100);
    mockGetAllHeroCards.mockResolvedValue([
      { id: 11, title_text: "Exact Path Card", image_path: exactPath, color: "#fff", link: "https://y.com" },
    ]);
    const jsx = await editHomePage();
    render(jsx);

    // Path is exactly 100 chars - no truncation (condition is > 100)
    expect(screen.getByText(exactPath)).toBeInTheDocument();
  });

  it("renders delete icon buttons for each hero card", async () => {
    mockGetAllHeroCards.mockResolvedValue(sampleCards);
    const jsx = await editHomePage();
    render(jsx);

    const deleteIcons = screen.getAllByTestId("icon-delete");
    expect(deleteIcons).toHaveLength(sampleCards.length);
  });

  it("renders pencil edit icons for each hero card", async () => {
    mockGetAllHeroCards.mockResolvedValue(sampleCards);
    const jsx = await editHomePage();
    render(jsx);

    const pencilIcons = screen.getAllByTestId("icon-pencil");
    expect(pencilIcons).toHaveLength(sampleCards.length);
  });
});