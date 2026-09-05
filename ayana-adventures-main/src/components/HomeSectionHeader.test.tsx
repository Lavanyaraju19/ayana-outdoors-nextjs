import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomeSectionHeader from "./HomeSectionHeader";

describe("HomeSectionHeader", () => {
  it("renders the eyebrow, title, highlight and description", () => {
    render(
      <HomeSectionHeader
        eyebrow="Test Eyebrow"
        title="Choose the right"
        highlight="growth journey"
        description="A description of the section."
      />,
    );

    expect(screen.getByText("Test Eyebrow")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Choose the right growth journey");
    expect(screen.getByText("A description of the section.")).toBeInTheDocument();
  });

  it("appends an optional suffix after the highlight", () => {
    render(
      <HomeSectionHeader
        eyebrow="Eyebrow"
        title="Title"
        highlight="Highlight"
        suffix="Extra"
        description="Description"
      />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Title Highlight Extra");
  });
});
