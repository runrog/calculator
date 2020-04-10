<template>
  <div class="emailcalculator">
    <EmailCalculator />
  </div>
</template>

<script>
import EmailCalculator from "@/components/email/EmailCalculator.vue";

export default {
  name: "emailcalculator",
  components: {
    EmailCalculator
  },
  data() {
    return {
      instanceId: ""
    };
  },
  beforeMount() {
    // Get the ID tag containing the drupal instance id.
    this.instanceId = this.$parent.$el.id;
  }
};
</script>

<style scoped>
.emailcalculator {
  background-color: aqua;
}
</style>
