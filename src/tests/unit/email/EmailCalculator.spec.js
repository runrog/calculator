import EmailCalculator from "@/components/email/EmailCalculator.vue";
import prices from "@/prices/cloud_office.json";

describe("EmailCalculator", () => {
  describe("Rackspace Email", () => {
    it("rax_total calculates correct total", () => {
      const localThis = { prices: prices, rax_qty: "2", currency: "USD" };
      expect(EmailCalculator.computed.rax_total.call(localThis)).toBe(5.98);
    });
  });
});
