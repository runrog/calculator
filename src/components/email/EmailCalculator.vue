<template>
  <div class="email-calculator">
    <div class="ec-totalBox">
      <span class="ec-totalBox-txt">Estimated Total</span>
      <i18n-n :value="total" format="currency" class="ex-totalBox-total"></i18n-n>
      <span class="ec-totalBox-txt">Per Month</span>
      <CurrencySwitcher v-model="currency" />
    </div>
    <div class="email-calculator-fields">
      <div class="email-calculator-field" :class="{ 'email-calculator-activeField': rax_qty > 0 }">
        <div class="email-fieldCol-6">
          <div class="email-calculator-slimField">
            <label for="rax_qty">{{ $t("rax_label") }}</label>
          </div>
          <div class="email-calculator-slimField">
            <label class="email-checkbox-container" for="rseplus">Email Plus
              <input class="email-checkbox" id="rseplus" type="checkbox" v-model="rseplus" />
              <span class="email-checkbox-mark"></span>
            </label>            
          </div>
        </div>
        <div class="email-fieldCol-6">
          <div class="email-adjustBox">
            <button class="email-subBtn" name="minus-box" @click.prevent="setVal('rax_qty', 'subtract')">-</button>
            <input class="email-numInput" type="number" id="rax_qty" v-model.number="rax_qty" />
            <button class="email-addBtn" name="add-box" @click.prevent="setVal('rax_qty', 'add')">+</button>
          </div>
        </div>
      </div>
      <div class="email-calculator-field"  :class="{ 'email-calculator-activeField': hex_qty > 0 }">
        <div class="email-fieldCol-6">
          <label for="hex_qty">Hosted Exchange mailboxes</label>
        </div>
        <div class="email-fieldCol-6">
          <div class="email-adjustBox">
            <button class="email-subBtn" name="minus-exc" @click.prevent="setVal('hex_qty', 'subtract')">-</button>
            <input class="email-numInput" type="number" id="hex_qty" v-model.number="hex_qty" />
            <button class="email-addBtn" name="add-exc" @click.prevent="setVal('hex_qty', 'add')">+</button>
          </div>
        </div>
      </div>
      <div class="email-calculator-field" :class="{ 'email-calculator-activeField': office_qty > 0 }">
        <div class="email-fieldCol-6">
          <label for="office_qty">Microsoft Office seats</label>
        </div>
        <div class="email-fieldCol-6">
          <div class="email-adjustBox">
            <button class="email-subBtn" name="minus-exc" @click.prevent="setVal('office_qty', 'subtract')">-</button>
            <input class="email-numInput" type="number" id="office_qty" v-model.number="office_qty" />
            <button class="email-addBtn" name="add-exc" @click.prevent="setVal('office_qty', 'add')">+</button>
          </div>
        </div>
      </div>
      <div class="email-calculator-slimField">
        <div class="email-fieldCol-6">
        Email Archiving
        </div>
        <div class="email-fieldCol-6">
          <div class="email-adjustBox">
            <label class="email-calculator-checkLabel" for="arch">
              <input id="arch" class="email-calculator-checkInput" type="checkbox" v-model="arch" />
              <span class="email-calculator-slider"></span>
            </label>
          </div>
        </div>
      </div>
      <div class="email-calculator-slimField">
        <button class="email-calculator-nextBtn" name="next">Next Step</button>
      </div>
    </div>
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
  },
  methods: {
    setVal(item, op) {
      if (op === 'subtract' && this[item] > 0) {
        this[item]--;
      } else if (op === 'add') {
        this[item]++;
      }
    },
  },
};
</script>

<style scoped>
  .email-calculator {
    min-width: 400px;
    width: 50%;
  }
  .ec-totalBox {
    align-items: center;
    background-color: #333333;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100px;
    padding: 20px;
    position: relative;
    text-align: center;
  }
  .email-calculator-nextBtn {
    background-color: #333333;
    border: 0;
    color: #ffffff;
    font-size: 16px;
    padding: 15px;
    transition-duration: .2s;
    width: 100%;
  }
  .email-calculator-nextBtn:hover {
    background-color: #4e4e4e;
    cursor: pointer;
  }
  .ec-totalBox-txt {
    color: #b2b2b0;
    display: block;
  }
  .ex-totalBox-total {
    color: #ffffff;
    font-size: 48px;
    margin: 10px 0;
  }
  .email-calculator-fields {
    background-color: #f2f2f2;
    border: 0;
    margin: 0;
    padding: 20px;
  }
  .email-calculator-fields:after {
    clear: both;
    content: "";
    display: table;
  }
  .email-calculator-fields:before {
    clear: both;
    content: "";
    display: table;
  }
  .email-calculator-field {
    background-color: #ffffff;
    border: 2px solid #c7c7c7;
    border-radius: 3px;
    margin-bottom: 20px;
    padding: 20px;
  }
  .email-calculator-activeField {
    border-color: #333333;
  }
  .email-calculator-field:after {
    clear: both;
    content: "";
    display: table;
  }
  .email-calculator-field:before {
    clear: both;
    content: "";
    display: table;
  }
  .email-calculator-field:last-child {
    margin-bottom: 0;
  }
  .email-calculator-slimField {
    margin-bottom: 20px;
  }
  .email-calculator-slimField:after {
    clear: both;
    content: "";
    display: table;
  }
  .email-calculator-slimField:before {
    clear: both;
    content: "";
    display: table;
  }
  .email-calculator-slimField:last-child {
    margin-bottom: 0;
  }
  .email-fieldCol-6 {
    float: left;
    width: 50%;
  }
  .email-subBtn {
    background-color: transparent;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    border: 2px solid #cccccc;
    color: #797979;
    font-size: 21px;
    padding: 15px 5px;
    position: relative;
    right: -2px;
  }
  .email-subBtn:focus {
    border-color: #333333;
    outline: 0;
  }
  .email-subBtn:hover {
    cursor: pointer;
  }
  .email-numInput {
    border: 2px solid #cccccc;
    font-size: 21px;
    padding: 15px 5px;
    text-align: center;
    width: 40px;
  }
  .email-numInput:focus {
    outline: 0;
  }
  .email-numInput::-webkit-outer-spin-button,
  .email-numInput::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .email-numInput {
    -moz-appearance: textfield;
  }
  .email-addBtn {
    background-color: transparent;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border: 2px solid #cccccc;
    color: #797979;
    font-size: 21px;
    padding: 15px 5px;
    position: relative;
    left: -2px;
  }
  .email-addBtn:focus {
    border-color: #333333;
    outline: 0;
  }
  .email-addBtn:hover {
    cursor: pointer;
  }
  .email-adjustBox {
    float: right;
  }
  .email-calculator-checkLabel {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 24px;
  }
  .email-calculator-checkInput {
    opacity: 0;
    width: 0;
    height: 0;
  }
  .email-calculator-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #cccccc;
    border-radius: 24px;
    transition: .2s;
  }
  .email-calculator-slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    transition: .2s;
  }
  .email-calculator-checkInput:checked + .email-calculator-slider {
    background-color: #333333;
  }

  .email-calculator-checkInput:focus + .email-calculator-slider {
    box-shadow: 0 0 1px #333333;
  }
  .email-calculator-checkInput:checked + .email-calculator-slider:before {
    transform: translateX(16px);
  }
  .email-checkbox-container {
    display: block;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    user-select: none;
  }
  .email-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .email-checkbox-mark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #e8e8e8;
  }
  .email-checkbox:checked ~ .email-checkbox-mark {
    background-color: #333333;
  }
  .email-checkbox-mark:after {
    content: "";
    position: absolute;
    display: none;
  }
  .email-checkbox:checked ~ .email-checkbox-mark:after {
    display: block;
  }
  .email-checkbox-mark:after {
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
</style>
