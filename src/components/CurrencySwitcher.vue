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
import { loadLanguage } from "@/i18n";
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
    value(val) {
      const entry = Object.entries(numberFormats).filter(
        e => e[1].currency.currency == val
      );
      loadLanguage(entry[0][0]);
    }
  }
};
</script>
