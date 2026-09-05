import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins plain class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("drops falsy values", () => {
    const showB = false;
    expect(cn("a", showB && "b", undefined, null, "c")).toBe("a c");
  });

  it("resolves conflicting Tailwind utilities to the last one (tailwind-merge)", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-white", "text-black")).toBe("text-black");
  });

  it("supports the conditional-object form", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });
});
