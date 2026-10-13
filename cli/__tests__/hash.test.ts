import { describe, it, expect } from "vitest";
import { hashContent, hashFile } from "../src/utils/hash";
import { promises as fs } from "fs";
import { tmpdir } from "os";
import path from "path";

describe("hashContent", () => {
  it("returns an 8-char hex string", () => {
    const h = hashContent("hello");
    expect(h).toMatch(/^[0-9a-f]{8}$/);
  });

  it("is deterministic for identical input", () => {
    expect(hashContent("abc")).toBe(hashContent("abc"));
  });

  it("differs for different content", () => {
    expect(hashContent("a")).not.toBe(hashContent("b"));
  });

  it("is sensitive to trailing whitespace (not trimmed)", () => {
    expect(hashContent("x")).not.toBe(hashContent("x "));
  });
});

describe("hashFile", () => {
  it("hashes a file's contents, matching hashContent of the same string", async () => {
    const tmp = path.join(tmpdir(), `aniui-hash-${Date.now()}.txt`);
    await fs.writeFile(tmp, "contents", "utf-8");
    try {
      expect(await hashFile(tmp)).toBe(hashContent("contents"));
    } finally {
      await fs.unlink(tmp);
    }
  });

  it("throws when the file does not exist", async () => {
    await expect(hashFile("/nonexistent/path/no-such-file.txt")).rejects.toThrow();
  });
});
