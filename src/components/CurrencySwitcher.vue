<template>
  <div class="currency-switcher">
    <select :value="value" @input="$emit('input', $event.target.value)">
      <option v-for="(l, i) in locales" :key="i" :value="l.currency.currency">
        {{ l.currency.currency }}
      </option>
    </select>
  </div>
</template>

<script>
import numberFormats from "@/numberFormats.json";
export default {
  name: "CurrencySwitcher",
  props: {
    value: {
      type: String,
      default: "USD"
    }
  },
  data() {
    return {
      locales: numberFormats
    };
  },
  watch: {
    selected(val) {
      this.$root.$i18n.locale = val.locale;
    }
  }
};
</script>
