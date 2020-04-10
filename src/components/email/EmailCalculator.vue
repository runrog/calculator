<template>
  <div class="email-calculator">
    <fieldset>
      <legend>Email Calculator</legend>
      <label for="rax_qty">{{ $t("rax_label") }}</label>
      <input id="rax_qty" v-model.number="rax_qty" />
      <br />
      <label for="rseplus">
        Rackspace Email Plus
        <input id="rseplus" type="checkbox" v-model="rseplus" />
      </label>
      <br />
      <label for="hex_qty">Hosted Exchange mailboxes</label>
      <input id="hex_qty" v-model.number="hex_qty" />
      <br />
      <label for="office_qty">Microsoft Office seats</label>
      <input id="office_qty" v-model.number="office_qty" />
      <br />
      <label for="arch">
        Email Archiving
        <input id="arch" type="checkbox" v-model="arch" />
      </label>
      <br />Total:
      <i18n-n :value="total" format="currency"></i18n-n>
      <br />
      <CurrencySwitcher v-model="currency" />
    </fieldset>
  </div>
</template>

<script>
import prices from "@/prices/cloud_office.json";
import CurrencySwitcher from "@/components/CurrencySwitcher.vue";

export default {
  name: "EmailCalculator",
  components: {
    CurrencySwitcher
  },
  data() {
    return {
      currency: "USD",
      prices: prices,
      rax_qty: 0,
      rseplus: false,
      hex_qty: 0,
      office_qty: 0,
      arch: false
    };
  },
  computed: {
    rax_total() {
      const type = this.rseplus
        ? "app_rackspace_email_plus"
        : "app_rackspace_email";
      return this.rax_qty * this.prices[type][this.currency];
    },
    hex_total() {
      const type = "app_msft_exchange";
      return this.hex_qty * this.prices[type][this.currency];
    },
    office_total() {
      const type = "app_msft_business_onedrive";
      return this.office_qty * this.prices[type][this.currency];
    },
    mailbox_qty() {
      return this.rax_qty + this.hex_qty;
    },
    arch_total() {
      const type = "app_email_archiving";
      if (!this.arch) return 0;
      return this.mailbox_qty * this.prices[type][this.currency];
    },
    total() {
      return (
        this.rax_total + this.hex_total + this.office_total + this.arch_total
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
