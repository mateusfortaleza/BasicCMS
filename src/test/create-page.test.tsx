import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";

// ---- Uppy mock with a retrievable instance ----
// We create a shared mock object and expose it via a module-level variable
// so tests can control behavior per-test.
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
  // Return a proper constructor function (class) that returns mockUppyMethods
  const UppyMock = function (this: any) {
    Object.assign(this, mockUppyMethods);
  } as unknown as new (opts?: any) => typeof mockUppyMethods;

  return { default: UppyMock };
});

vi.mock("@uppy/react/dashboard", () => ({
  default: ({ disabled }: { disabled?: boolean }) => (
    <div data-testid="uppy-dashboard" data-disabled={String(!!disabled)}>
      Uppy Dashboard
    </div>
  ),
}));

vi.mock("@uppy/core/css/style.min.css", () => ({}));
vi.mock("@uppy/dashboard/css/style.min.css", () => ({}));

vi.mock("@/lib/actions", () => ({
  verifyAndCreateHeroCard: vi.fn().mockResolvedValue(undefined),
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

vi.mock("@/components/ui/spinner", () => ({
  Spinner: () => <span data-testid="spinner">Loading</span>,
}));

import CreatePage from "../components/create-page";
import { verifyAndCreateHeroCard } from "@/lib/actions";

const mockVerifyAndCreateHeroCard = vi.mocked(verifyAndCreateHeroCard);

describe("CreatePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to default: no files
    mockUppyMethods.getFiles.mockReturnValue([]);
  });

  it("renders the given title", () => {
    render(<CreatePage title="Create Hero Card" />);
    expect(screen.getByText("Create Hero Card")).toBeInTheDocument();
  });

  it("renders a back link pointing to /herocard", () => {
    render(<CreatePage title="Create Hero Card" />);
    const backLink = screen.getByText("Back").closest("a");
    expect(backLink).toHaveAttribute("href", "/herocard");
  });

  it("renders the title input field", () => {
    render(<CreatePage title="Create Hero Card" />);
    expect(screen.getByLabelText("Title:")).toBeInTheDocument();
  });

  it("renders the color picker with default value #ffffff", () => {
    render(<CreatePage title="Create Hero Card" />);
    const colorInput = screen.getByDisplayValue("#ffffff");
    expect(colorInput).toHaveAttribute("type", "color");
  });

  it("renders the link input field", () => {
    render(<CreatePage title="Create Hero Card" />);
    expect(screen.getByLabelText("Link:")).toBeInTheDocument();
  });

  it("renders the Uppy Dashboard", () => {
    render(<CreatePage title="Create Hero Card" />);
    expect(screen.getByTestId("uppy-dashboard")).toBeInTheDocument();
  });

  it("renders a submit button with 'Submit' text when not pending", () => {
    render(<CreatePage title="Create Hero Card" />);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("title input is required", () => {
    render(<CreatePage title="Create Hero Card" />);
    const titleInput = screen.getByLabelText("Title:");
    expect(titleInput).toBeRequired();
  });

  it("color input has required attribute", () => {
    render(<CreatePage title="Create Hero Card" />);
    const colorInput = screen.getByDisplayValue("#ffffff");
    expect(colorInput).toHaveAttribute("required");
  });

  it("does not call verifyAndCreateHeroCard when no uppy file is selected", async () => {
    mockUppyMethods.getFiles.mockReturnValue([]);

    render(<CreatePage title="Create Hero Card" />);

    const form = screen.getByRole("button", { name: "Submit" }).closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(mockVerifyAndCreateHeroCard).not.toHaveBeenCalled();
  });

  it("calls verifyAndCreateHeroCard with FormData when uppy file is a File instance", async () => {
    const mockFile = new File(["content"], "photo.jpg", { type: "image/jpeg" });
    mockUppyMethods.getFiles.mockReturnValue([
      { data: mockFile, id: "file1", name: "photo.jpg", type: "image/jpeg", size: mockFile.size },
    ]);

    render(<CreatePage title="Create Hero Card" />);

    const form = screen.getByRole("button", { name: "Submit" }).closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(mockVerifyAndCreateHeroCard).toHaveBeenCalledOnce();
    const formData = mockVerifyAndCreateHeroCard.mock.calls[0][0];
    expect(formData.get("image_file")).toBe(mockFile);
  });

  it("clears uppy after form submission with a valid file", async () => {
    const mockFile = new File(["content"], "photo.jpg", { type: "image/jpeg" });
    mockUppyMethods.getFiles.mockReturnValue([
      { data: mockFile, id: "file1", name: "photo.jpg", type: "image/jpeg", size: mockFile.size },
    ]);

    render(<CreatePage title="Create Hero Card" />);

    const form = screen.getByRole("button", { name: "Submit" }).closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(mockUppyMethods.clear).toHaveBeenCalledOnce();
  });

  it("calls verifyAndCreateHeroCard without image_file when uppy file data is a Blob (not File)", async () => {
    // Blob is truthy but not instanceof File, so image_file won't be appended to FormData
    // but the action is still called (uppy.data is truthy, so the early return is skipped)
    mockUppyMethods.getFiles.mockReturnValue([
      { data: new Blob(["content"]), id: "file1", name: "blob.jpg", type: "image/jpeg", size: 7 },
    ]);

    render(<CreatePage title="Create Hero Card" />);

    const form = screen.getByRole("button", { name: "Submit" }).closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });

    // The action IS called, but image_file was not set in FormData
    expect(mockVerifyAndCreateHeroCard).toHaveBeenCalledOnce();
    const formData = mockVerifyAndCreateHeroCard.mock.calls[0][0];
    expect(formData.get("image_file")).toBeNull();
  });

  it("does not call verifyAndCreateHeroCard when uppy returns a file with no data", async () => {
    mockUppyMethods.getFiles.mockReturnValue([
      { data: undefined, id: "file1", name: "file.jpg", type: "image/jpeg", size: 0 },
    ]);

    render(<CreatePage title="Create Hero Card" />);

    const form = screen.getByRole("button", { name: "Submit" }).closest("form")!;
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(mockVerifyAndCreateHeroCard).not.toHaveBeenCalled();
  });

  it("renders custom title when different title is passed", () => {
    render(<CreatePage title="Add New Card" />);
    expect(screen.getByText("Add New Card")).toBeInTheDocument();
  });
});