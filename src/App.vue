<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/rs-logo.svg" />
    <EmailCalculator />
  </div>
</template>

<script>
import EmailCalculator from "@/components/email/EmailCalculator.vue";

export default {
  name: "App",
  components: {
    EmailCalculator,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
