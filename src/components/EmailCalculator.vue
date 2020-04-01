<template>
  <div class="email-calculator">
    <fieldset>
      <legend>Email Calculator</legend>
      <label for="rax_qty">{{ $t("rax_label") }}</label>
      <input id="rax_qty" v-model.number="rax_qty" />
      <br />
      <label for="raxplus">
        Rackspace Email Plus
        <input id="raxplus" type="checkbox" v-model="raxplus" />
      </label>
      <br />
      <label for="hex_qty">Hosted Exchange mailboxes</label>
      <input id="hex_qty" v-model.number="hex_qty" />
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
  props: {
    currency: {
      type: String,
      default: "USD"
    }
  },
  data() {
    return {
      prices: prices,
      rax_qty: 0,
      raxplus: false,
      hex_qty: 0,
      office_2016: 0,
      email_archiving: false
    };
  },
  computed: {
    rax_total: function() {
      const type = this.raxplus
        ? "app_rackspace_email_plus"
        : "app_rackspace_email";
      return this.rax_qty * this.prices[type][this.currency];
    },
    total: function() {
      return this.rax_total;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
