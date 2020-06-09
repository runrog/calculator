import {
  shallowMount as testShallow,
  mount as testMount,
} from "@vue/test-utils";
import { i18n } from "@/i18n";

/**
 * This module adds `i18n` to the options of the shallow and mount functions of the @vue/test-utils
 * See: https://github.com/Illyism/vue-i18n-jest-example/blob/ba725a8ec6a35dfe3e783ed9b55fca0a8090aca8/src/tests/vue.js
 */

export function shallowMount(component, options) {
  return testShallow(component, { ...options, i18n });
}

export function mount(component, options) {
  return testMount(component, { ...options, i18n });
}
