import EmailCalculator from "@/components/email/EmailCalculator.vue";
import prices from "@/prices/cloud_office.json";

describe("EmailCalculator", () => {
  describe("Rackspace Email", () => {
    it("rax_total calculates correct amount for Rackspace Email", () => {
      const localThis = {
        prices: prices,
        rax_qty: 2,
        currency: "USD",
        rseplus: false,
      };
      expect(EmailCalculator.computed.rax_total.call(localThis)).toBe(5.98);
    });

    it("rax_total calculates correct amount for Rackspace Email Plus", () => {
      const localThis = {
        prices: prices,
        rax_qty: 2,
        currency: "USD",
        rseplus: true,
      };
      expect(EmailCalculator.computed.rax_total.call(localThis)).toBe(7.98);
    });
  });

  describe("Microsoft Exchange", () => {
    it("hex_total calculates correct amount", () => {
      const localThis = {
        prices: prices,
        hex_qty: 2,
        currency: "USD",
      };
      expect(EmailCalculator.computed.hex_total.call(localThis)).toBe(21.98);
    });
  });

  describe("Microsoft Office", () => {
    it("office_total calculates correct amount", () => {
      const localThis = {
        prices: prices,
        office_qty: 2,
        currency: "USD",
      };
      expect(EmailCalculator.computed.office_total.call(localThis)).toBe(16);
    });
  });

  describe("Email Archiving", () => {
    it("arch_total calculates correct amount when not enabled", () => {
      const localThis = {
        prices: prices,
        rax_qty: 1,
        hex_qty: 1,
        currency: "USD",
        arch: false,
      };
      expect(EmailCalculator.computed.arch_total.call(localThis)).toBe(0);
    });

    it("mailbox_qty calculates correct amount", () => {
      const localThis = {
        prices: prices,
        rax_qty: 1,
        hex_qty: 1,
        currency: "USD",
        arch: false,
      };
      expect(EmailCalculator.computed.mailbox_qty.call(localThis)).toBe(2);
    });

    it("arch_total calculates correct amount without mailboxes", () => {
      const localThis = {
        prices: prices,
        rax_qty: 0,
        hex_qty: 0,
        currency: "USD",
        arch: true,
        mailbox_qty: 0,
      };
      expect(EmailCalculator.computed.arch_total.call(localThis)).toBe(0);
    });

    it("arch_total calculates correct amount with mailboxes", () => {
      const localThis = {
        prices: prices,
        rax_qty: 1,
        hex_qty: 1,
        currency: "USD",
        arch: true,
        mailbox_qty: 2,
      };
      expect(EmailCalculator.computed.arch_total.call(localThis)).toBe(6);
    });
  });

  it("total calculates correct amount for all options", () => {
    const localThis = {
      rax_total: 1,
      hex_total: 2,
      office_total: 3,
      arch_total: 4,
    };
    expect(EmailCalculator.computed.total.call(localThis)).toBe(10);
  });
});
