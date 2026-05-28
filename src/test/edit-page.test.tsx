import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";

// Shared mock Uppy methods - defined before vi.mock so they can be referenced
const mockUppyMethods = {
  getFiles: vi.fn().mockReturnValue([]),
  addFile: vi.fn(),
  clear: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
  use: vi.fn(),
  setOptions: vi.fn(),
};

vi.mock("@uppy/core", () => {
  const UppyMock = function (this: any) {
    Object.assign(this, mockUppyMethods);
  } as unknown as new (opts?: any) => typeof mockUppyMethods;

  return { default: UppyMock };
});

vi.mock("@uppy/react/dashboard", () => ({
  default: () => <div data-testid="uppy-dashboard">Uppy Dashboard</div>,
}));

vi.mock("@uppy/core/css/style.min.css", () => ({}));
vi.mock("@uppy/dashboard/css/style.min.css", () => ({}));

vi.mock("@/lib/actions", () => ({
  verifyAndUpdateHeroCard: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("next/link", () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock("@/components/ui/field", () => ({
  FieldSet: ({ children, className }: any) => <fieldset className={className}>{children}</fieldset>,
  Field: ({ children }: any) => <div>{children}</div>,
  FieldLabel: ({ children, htmlFor }: any) => <label htmlFor={htmlFor}>{children}</label>,
  FieldGroup: ({ children, className }: any) => <div className={className}>{children}</div>,
  FieldLegend: ({ children }: any) => <legend>{children}</legend>,
}));

vi.mock("@/components/ui/input", () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} />,
}));

vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

import EditPage from "../components/herocard-components/edit-herocard";

const sampleHeroCard = {
  id: 1,
  title_text: "Initial Title",
  color: "#ff0000",
  link: "https://example.com",
  image_path: "https://example.com/image.jpg",
};

describe("EditPage (edit-page.tsx)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUppyMethods.getFiles.mockReturnValue([]);
  });

  it("renders the page title", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    expect(screen.getByText("Edit Page")).toBeInTheDocument();
  });

  it("renders a back link pointing to /herocard", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const backLink = screen.getByText("Back").closest("a");
    expect(backLink).toHaveAttribute("href", "/herocard");
  });

  it("renders title input pre-filled with hero card title_text", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const titleInput = screen.getByDisplayValue("Initial Title");
    expect(titleInput).toBeInTheDocument();
  });

  it("renders color input pre-filled with hero card color", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const colorInput = screen.getByDisplayValue("#ff0000");
    expect(colorInput).toHaveAttribute("type", "color");
  });

  it("renders link input pre-filled with hero card link", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const linkInput = screen.getByDisplayValue("https://example.com");
    expect(linkInput).toBeInTheDocument();
  });

  it("renders a hidden image_path input with the hero card image path", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const hiddenInput = document.querySelector('input[name="image_path"]') as HTMLInputElement;
    expect(hiddenInput).not.toBeNull();
    expect(hiddenInput.type).toBe("hidden");
    expect(hiddenInput.value).toBe("https://example.com/image.jpg");
  });

  it("renders the Uppy Dashboard", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    expect(screen.getByTestId("uppy-dashboard")).toBeInTheDocument();
  });

  it("renders a submit button", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("updates title input value when user types", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const titleInput = screen.getByDisplayValue("Initial Title") as HTMLInputElement;

    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    expect(titleInput.value).toBe("Updated Title");
  });

  it("updates link input value when user types", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const linkInput = screen.getByDisplayValue("https://example.com") as HTMLInputElement;

    fireEvent.change(linkInput, { target: { value: "https://new-link.com" } });

    expect(linkInput.value).toBe("https://new-link.com");
  });

  it("updates color input value when user changes color", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const colorInput = screen.getByDisplayValue("#ff0000") as HTMLInputElement;

    fireEvent.change(colorInput, { target: { value: "#0000ff" } });

    expect(colorInput.value).toBe("#0000ff");
  });

  it("adds existing image to Uppy on mount when image_path is set", async () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);

    await waitFor(() => {
      expect(mockUppyMethods.addFile).toHaveBeenCalledOnce();
    });

    const addFileCall = mockUppyMethods.addFile.mock.calls[0][0];
    expect(addFileCall.preview).toBe("https://example.com/image.jpg");
    expect(addFileCall.name).toBe("image.jpg");
    expect(addFileCall.type).toBe("image/jpeg");
  });

  it("sets correct data (empty Blob) when pre-loading the existing image", async () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);

    await waitFor(() => {
      expect(mockUppyMethods.addFile).toHaveBeenCalledOnce();
    });

    const addFileCall = mockUppyMethods.addFile.mock.calls[0][0];
    expect(addFileCall.data).toBeInstanceOf(Blob);
  });

  it("does not add file to Uppy when image_path is empty string", async () => {
    const heroCardNoImage = { ...sampleHeroCard, image_path: "" };
    render(<EditPage title="Edit Page" heroCard={heroCardNoImage} />);

    await act(async () => {});

    expect(mockUppyMethods.addFile).not.toHaveBeenCalled();
  });

  it("does not add file to Uppy again if Uppy already has files loaded", async () => {
    mockUppyMethods.getFiles.mockReturnValue([
      { id: "existing", name: "already.jpg", type: "image/jpeg", data: new Blob([]), size: 0 },
    ]);

    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);

    await act(async () => {});

    expect(mockUppyMethods.addFile).not.toHaveBeenCalled();
  });

  it("extracts the filename from the image_path URL correctly", async () => {
    const heroCardDeepPath = {
      ...sampleHeroCard,
      image_path: "https://cdn.example.com/uploads/hero-cards/uuid-banner.png",
    };
    render(<EditPage title="Edit Page" heroCard={heroCardDeepPath} />);

    await waitFor(() => {
      expect(mockUppyMethods.addFile).toHaveBeenCalledOnce();
    });

    const addFileCall = mockUppyMethods.addFile.mock.calls[0][0];
    expect(addFileCall.name).toBe("uuid-banner.png");
    expect(addFileCall.meta.name).toBe("uuid-banner.png");
  });

  it("title input has required attribute", () => {
    render(<EditPage title="Edit Page" heroCard={sampleHeroCard} />);
    const titleInput = screen.getByDisplayValue("Initial Title");
    expect(titleInput).toBeRequired();
  });

  it("renders with a different heroCard's data", () => {
    const differentCard = {
      id: 99,
      title_text: "Another Hero",
      color: "#abcdef",
      link: "https://another.com",
      image_path: "https://cdn.com/other.jpg",
    };
    render(<EditPage title="Edit Page" heroCard={differentCard} />);

    expect(screen.getByDisplayValue("Another Hero")).toBeInTheDocument();
    expect(screen.getByDisplayValue("#abcdef")).toBeInTheDocument();
    expect(screen.getByDisplayValue("https://another.com")).toBeInTheDocument();
  });
});