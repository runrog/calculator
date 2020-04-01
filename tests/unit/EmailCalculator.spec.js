import { shallowMount } from "@vue/test-utils";
import EmailCalculator from "@/components/EmailCalculator.vue";
import prices from "@/assets/cloud_office.json";

describe("EmailCalculator", () => {
  describe("Rackspace Email", () => {
    it("rax_total calculates correct total", async () => {
      // const wrapper = shallowMount(EmailCalculator);
      // wrapper.setData({
      //   rax_qty: "2"
      // });
      // await wrapper.vm.$nextTick();
      const localThis = {prices: prices, rax_qty: "2", currency: "USD"};
      // EmailCalculator.computed.numbers.call(localThis)
      expect(EmailCalculator.computed.rax_total.call(localThis)).toBe(5.98);
    });
  });
  
  it("renders a total", async () => {
    const wrapper = shallowMount(EmailCalculator);
    wrapper.setData({
      rax_qty: 1,
      raxplus_qty: 2,
      hex_qty: 3
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.text()).toContain("$6");
  });
});
