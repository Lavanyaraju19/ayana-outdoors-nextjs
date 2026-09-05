import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactSection from "./ContactSection";

vi.mock("next/navigation", () => ({
  usePathname: () => "/contact",
}));

const submitEnquiryMock = vi.fn();
vi.mock("@/app/actions/enquiry", () => ({
  submitEnquiry: (...args: unknown[]) => submitEnquiryMock(...args),
}));

const baseProps = {
  contactOptions: [
    { id: "1", title: "Call Us", description: "Speak with the team.", action: "+91 98765 43210", link: "tel:+919876543210", external: true },
  ],
  adventures: [
    { id: "adv-1", title: "Every Sunday Treks", image_path: "/images/trek-4.jpg", description: "", duration: "1 Day", difficulty: "Easy", age_group: "8+", learn_link: "/adventures", enquiry_link: "/contact" },
  ],
};

describe("ContactSection", () => {
  beforeEach(() => {
    submitEnquiryMock.mockReset();
  });

  it("shows a validation error for an invalid email and never calls the server action", async () => {
    const user = userEvent.setup();
    render(<ContactSection {...baseProps} />);

    await user.type(screen.getByLabelText("Parent / Guardian Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.type(screen.getByLabelText("WhatsApp Number"), "9876543210");
    await user.click(screen.getByRole("button", { name: /join the community/i }));

    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
    expect(submitEnquiryMock).not.toHaveBeenCalled();
  });

  it("submits valid input and shows the success state", async () => {
    submitEnquiryMock.mockResolvedValue({ status: "success", message: "Thanks — we've received your enquiry." });
    const user = userEvent.setup();
    render(<ContactSection {...baseProps} />);

    await user.type(screen.getByLabelText("Parent / Guardian Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("WhatsApp Number"), "9876543210");
    await user.click(screen.getByRole("button", { name: /join the community/i }));

    await waitFor(() => expect(submitEnquiryMock).toHaveBeenCalledTimes(1));
    expect(screen.getByRole("status")).toHaveTextContent(/thanks/i);
  });

  it("shows a server-side error message without crashing the form", async () => {
    submitEnquiryMock.mockResolvedValue({ status: "error", message: "Something went wrong. Please try again." });
    const user = userEvent.setup();
    render(<ContactSection {...baseProps} />);

    await user.type(screen.getByLabelText("Parent / Guardian Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "jane@example.com");
    await user.type(screen.getByLabelText("WhatsApp Number"), "9876543210");
    await user.click(screen.getByRole("button", { name: /join the community/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
  });
});
