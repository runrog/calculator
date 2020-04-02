import { mount } from "@/tests/jest.setup";
import EmailCalculator from "@/components/email/EmailCalculator.vue";
import prices from "@/prices/cloud_office.json";

describe("EmailCalculator", () => {
  describe("Rackspace Email", () => {
    it("rax_total calculates correct total", () => {
      const localThis = { prices: prices, rax_qty: "2", currency: "USD" };
      expect(EmailCalculator.computed.rax_total.call(localThis)).toBe(5.98);
    });

    it("renders a total with USD currency", async () => {
      const wrapper = mount(EmailCalculator);
      wrapper.setData({
        currency: "USD",
        prices: prices,
        rax_qty: 2,
        raxplus: false,
        hex_qty: 0,
        office_2016: 0,
        email_archiving: false
      });

      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toContain("$5.98");
    });

    it("renders a total with GBP currency", async () => {
      const wrapper = mount(EmailCalculator);
      wrapper.setData({
        currency: "GBP",
        prices: prices,
        rax_qty: 2,
        raxplus: false,
        hex_qty: 0,
        office_2016: 0,
        email_archiving: false
      });

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toContain("£4.78");
    });
  });
});
