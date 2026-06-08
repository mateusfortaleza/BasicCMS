import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock 'use server' module - must be hoisted before imports
vi.mock("@vercel/blob", () => ({
  put: vi.fn(),
}));

vi.mock("../dal/HeroCardDAO", () => ({
  updateHeroCard: vi.fn(),
  insertHeroCard: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  }),
}));

import { put } from "@vercel/blob";
import { updateHeroCardFields, insertHeroCardFields } from "../dal/HeroCardDTO";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { verifyAndUpdateHeroCard, verifyAndCreateHeroCard } from "../lib/actions";

const mockPut = vi.mocked(put);
const mockUpdateHeroCard = vi.mocked(updateHeroCardFields);
const mockInsertHeroCard = vi.mocked(insertHeroCardFields);
const mockRevalidatePath = vi.mocked(revalidatePath);
const mockRedirect = vi.mocked(redirect);

function makeFile(name = "test.jpg", size = 1024, type = "image/jpeg"): File {
  const content = new Uint8Array(size);
  return new File([content], name, { type });
}

function makeFormData(fields: Record<string, string | File>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    fd.set(key, value);
  }
  return fd;
}

describe("verifyAndUpdateHeroCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPut.mockResolvedValue({ url: "https://blob.example.com/uploaded.jpg" } as Awaited<ReturnType<typeof put>>);
    mockUpdateHeroCard.mockResolvedValue(undefined as any);
  });

  it("updates hero card without uploading a new image when image_file size is 0", async () => {
    const emptyFile = new File([], "empty.jpg", { type: "image/jpeg" });
    const fd = makeFormData({
      title_text: "My Hero",
      image_path: "https://existing.example.com/image.jpg",
      image_file: emptyFile,
      color: "#ff0000",
      link: "https://example.com",
    });

    await expect(verifyAndUpdateHeroCard("hero-card-1", fd)).rejects.toThrow("NEXT_REDIRECT:/herocard");

    expect(mockPut).not.toHaveBeenCalled();
    expect(mockUpdateHeroCard).toHaveBeenCalledWith(
      "hero-card-1",
      "https://existing.example.com/image.jpg",
      "My Hero",
      "#ff0000",
      "https://example.com"
    );
    expect(mockRevalidatePath).toHaveBeenCalledWith("/herocard");
    expect(mockRedirect).toHaveBeenCalledWith("/herocard");
  });

  it("uploads new image and updates hero card when image_file has content", async () => {
    const newFile = makeFile("new-image.png", 2048, "image/png");
    const fd = makeFormData({
      title_text: "Updated Hero",
      image_path: "https://old.example.com/old.jpg",
      image_file: newFile,
      color: "#00ff00",
      link: "https://updated.com",
    });

    await expect(verifyAndUpdateHeroCard("hero-card-42", fd)).rejects.toThrow("NEXT_REDIRECT:/herocard");

    expect(mockPut).toHaveBeenCalledOnce();
    const putCall = mockPut.mock.calls[0];
    expect(putCall[0]).toMatch(/^hero-cards\/.+-new-image\.png$/);
    expect(putCall[1]).toBe(newFile);
    expect(putCall[2]).toMatchObject({ access: "public", addRandomSuffix: true });

    expect(mockUpdateHeroCard).toHaveBeenCalledWith(
      "hero-card-42",
      "https://blob.example.com/uploaded.jpg",
      "Updated Hero",
      "#00ff00",
      "https://updated.com"
    );
  });

  it("trims whitespace from title_text, color, and link fields", async () => {
    const emptyFile = new File([], "", { type: "image/jpeg" });
    const fd = makeFormData({
      title_text: "  Padded Title  ",
      image_path: "https://example.com/img.jpg",
      image_file: emptyFile,
      color: "  #123456  ",
      link: "  https://example.com/link  ",
    });

    await expect(verifyAndUpdateHeroCard("hero-card-5", fd)).rejects.toThrow("NEXT_REDIRECT:/herocard");

    expect(mockUpdateHeroCard).toHaveBeenCalledWith(
      "hero-card-5",
      "https://example.com/img.jpg",
      "Padded Title",
      "#123456",
      "https://example.com/link"
    );
  });

  it("throws validation error when required fields are missing", async () => {
    const fd = new FormData();
    // No fields set
    await expect(verifyAndUpdateHeroCard("hero-card-1", fd)).rejects.toThrow();
    expect(mockUpdateHeroCard).not.toHaveBeenCalled();
    expect(mockRedirect).not.toHaveBeenCalled();
  });

  it("throws validation error when image_file field is not a File", async () => {
    const fd = makeFormData({
      title_text: "Test",
      image_path: "https://example.com/img.jpg",
      image_file: "not-a-file" as unknown as File,
      color: "#000000",
      link: "https://example.com",
    });

    await expect(verifyAndUpdateHeroCard("hero-card-1", fd)).rejects.toThrow();
    expect(mockPut).not.toHaveBeenCalled();
    expect(mockUpdateHeroCard).not.toHaveBeenCalled();
  });

  it("revalidates /herocard path before redirecting", async () => {
    const emptyFile = new File([], "", { type: "image/jpeg" });
    const fd = makeFormData({
      title_text: "Hero",
      image_path: "https://example.com/img.jpg",
      image_file: emptyFile,
      color: "#ffffff",
      link: "https://example.com",
    });

    await expect(verifyAndUpdateHeroCard("hero-card-1", fd)).rejects.toThrow("NEXT_REDIRECT:/herocard");

    // revalidatePath should be called before redirect
    const revalidateOrder = mockRevalidatePath.mock.invocationCallOrder[0];
    const redirectOrder = mockRedirect.mock.invocationCallOrder[0];
    expect(revalidateOrder).toBeLessThan(redirectOrder);
  });

  it("generates unique blob path using UUID prefix", async () => {
    const file1 = makeFile("photo.jpg");
    const file2 = makeFile("photo.jpg");

    const fd1 = makeFormData({
      title_text: "Hero 1", image_path: "p", image_file: file1, color: "#fff", link: "https://a.com"
    });
    const fd2 = makeFormData({
      title_text: "Hero 2", image_path: "p", image_file: file2, color: "#fff", link: "https://b.com"
    });

    await expect(verifyAndUpdateHeroCard("hero-card-1", fd1)).rejects.toThrow("NEXT_REDIRECT");
    await expect(verifyAndUpdateHeroCard("hero-card-2", fd2)).rejects.toThrow("NEXT_REDIRECT");

    const path1 = mockPut.mock.calls[0][0] as string;
    const path2 = mockPut.mock.calls[1][0] as string;

    expect(path1).not.toBe(path2);
    expect(path1).toMatch(/^hero-cards\//);
    expect(path2).toMatch(/^hero-cards\//);
  });
});

describe("verifyAndCreateHeroCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPut.mockResolvedValue({ url: "https://blob.example.com/new-card.jpg" } as Awaited<ReturnType<typeof put>>);
    mockInsertHeroCard.mockResolvedValue(undefined as any);
  });

  it("uploads image, inserts hero card, and redirects", async () => {
    const imageFile = makeFile("hero.jpg", 4096, "image/jpeg");
    const fd = makeFormData({
      title_text: "New Hero",
      image_file: imageFile,
      color: "#abcdef",
      link: "https://new.example.com",
    });

    await expect(verifyAndCreateHeroCard(fd)).rejects.toThrow("NEXT_REDIRECT:/herocard");

    expect(mockPut).toHaveBeenCalledOnce();
    const putCall = mockPut.mock.calls[0];
    expect(putCall[0]).toMatch(/^hero-cards\/.+-hero\.jpg$/);
    expect(putCall[1]).toBe(imageFile);
    expect(putCall[2]).toMatchObject({ access: "public", addRandomSuffix: true });

    expect(mockInsertHeroCard).toHaveBeenCalledWith(
      "https://blob.example.com/new-card.jpg",
      "New Hero",
      "#abcdef",
      "https://new.example.com"
    );

    expect(mockRevalidatePath).toHaveBeenCalledWith("/herocard");
    expect(mockRedirect).toHaveBeenCalledWith("/herocard");
  });

  it("trims whitespace from title_text, color, and link", async () => {
    const imageFile = makeFile("img.png");
    const fd = makeFormData({
      title_text: "  Spacey Title  ",
      image_file: imageFile,
      color: "  #ffffff  ",
      link: "  https://link.com  ",
    });

    await expect(verifyAndCreateHeroCard(fd)).rejects.toThrow("NEXT_REDIRECT:/herocard");

    expect(mockInsertHeroCard).toHaveBeenCalledWith(
      "https://blob.example.com/new-card.jpg",
      "Spacey Title",
      "#ffffff",
      "https://link.com"
    );
  });

  it("throws validation error when image_file is missing", async () => {
    const fd = makeFormData({
      title_text: "No Image",
      color: "#000000",
      link: "https://example.com",
    });

    await expect(verifyAndCreateHeroCard(fd)).rejects.toThrow();
    expect(mockPut).not.toHaveBeenCalled();
    expect(mockInsertHeroCard).not.toHaveBeenCalled();
  });

  it("throws validation error when all required fields are missing", async () => {
    const fd = new FormData();
    await expect(verifyAndCreateHeroCard(fd)).rejects.toThrow();
    expect(mockPut).not.toHaveBeenCalled();
    expect(mockInsertHeroCard).not.toHaveBeenCalled();
  });

  it("throws validation error when title_text is missing", async () => {
    const imageFile = makeFile("img.jpg");
    const fd = makeFormData({
      image_file: imageFile,
      color: "#000000",
      link: "https://example.com",
    });

    await expect(verifyAndCreateHeroCard(fd)).rejects.toThrow();
    expect(mockPut).not.toHaveBeenCalled();
  });

  it("uses blob URL returned by put() as the image path for insertion", async () => {
    mockPut.mockResolvedValue({ url: "https://cdn.example.com/custom-path.webp" } as Awaited<ReturnType<typeof put>>);

    const imageFile = makeFile("card.webp", 512, "image/webp");
    const fd = makeFormData({
      title_text: "Card",
      image_file: imageFile,
      color: "#123456",
      link: "https://card.com",
    });

    await expect(verifyAndCreateHeroCard(fd)).rejects.toThrow("NEXT_REDIRECT");

    expect(mockInsertHeroCard).toHaveBeenCalledWith(
      "https://cdn.example.com/custom-path.webp",
      "Card",
      "#123456",
      "https://card.com"
    );
  });

  it("generates unique blob paths for files with the same name", async () => {
    const fd1 = makeFormData({
      title_text: "Hero A", image_file: makeFile("banner.jpg"), color: "#fff", link: "https://a.com"
    });
    const fd2 = makeFormData({
      title_text: "Hero B", image_file: makeFile("banner.jpg"), color: "#000", link: "https://b.com"
    });

    await expect(verifyAndCreateHeroCard(fd1)).rejects.toThrow("NEXT_REDIRECT");
    await expect(verifyAndCreateHeroCard(fd2)).rejects.toThrow("NEXT_REDIRECT");

    const path1 = mockPut.mock.calls[0][0] as string;
    const path2 = mockPut.mock.calls[1][0] as string;
    expect(path1).not.toBe(path2);
  });
});
