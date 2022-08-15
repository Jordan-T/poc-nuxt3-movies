<script lang="ts" setup>
import { watchDebounced } from "@vueuse/core";
import logoLight from "~/assets/images/logo-light.svg";
import logoDark from "~/assets/images/logo-dark.svg";

// TODO move to search page on input
const router = useRouter();
const route = useRoute();
const searchValue = ref(route.query.q || "");
const searchInput = ref<null | HTMLInputElement>(null);
watchDebounced(
  searchValue,
  (value) => {
    console.log("new search", value);
    if (value) {
      if (route.name === "search") {
        console.log("REPLACE", value);
        router.replace({
          name: "search",
          query: { q: value },
        });
      } else {
        router.push({
          name: "search",
          query: { q: value },
        });
      }
    } else {
      router.back();
    }
  },
  {
    debounce: 500,
  }
);

onMounted(() => {
  if (searchValue.value && searchInput.value) {
    nextTick(() => {
      setTimeout(() => {
        searchInput.value.focus();
      }, 100);
    });
  }
});
const colorMode = useColorMode();
const logoUrl = computed(() =>
  colorMode.preference === "light" ? logoLight : logoDark
);
</script>

<template>
  <div class="l-default">
    <div class="l-default__nav">
      <NuxtLink to="/" class="l-default__logo">
        <img :src="logoUrl" alt="" width="100" height="50" />
      </NuxtLink>

      <TheMainNav class="l-default__nav-list" />
    </div>
    <div class="l-default__top">
      <div class="l-default__search-wrap">
        <input
          class="l-default__search"
          type="search"
          v-model="searchValue"
          ref="searchInput"
        />
        <BaseIcon icon="Magnifi-Glass2" class="l-default__search-icon" />
      </div>

      <ClientOnly>
        <button
          class="l-default__theme-switch"
          type="button"
          @click="
            $colorMode.preference =
              $colorMode.preference === 'light' ? 'dark' : 'light'
          "
        >
          <BaseIcon
            :icon="$colorMode.preference === 'light' ? 'Daylight' : 'Half-Moon'"
          />
        </button>
      </ClientOnly>
    </div>

    <div v-if="$slots.sidebar" class="l-default__sidebar">
      <slot name="sidebar" />
    </div>

    <div class="l-default__main">
      <div class="l-default__content">
        <slot />
      </div>

      <footer class="l-default__footer">
        Fait avec amour par <a href="//jordan.taisne.free.fr">Jordan-T</a>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
.l-default {
  $c-top-height: 90px;
  $c-sidebar-shadow: var(--inner-sidebar-shadow), var(--sidebar-shadow);
  $c-search-icon-size: 2rem;

  display: grid;
  grid-template-rows: $c-top-height 1fr;
  grid-template-columns: 160px 300px 1fr;
  grid-template-areas: "nav top top" "nav sidebar main";
  min-height: 100vh;
  width: 100%;

  &__nav {
    position: sticky;
    top: 0;
    z-index: 5;
    grid-area: nav;
    box-shadow: $c-sidebar-shadow;
    height: 100vh;
    background: $t-surface-1;
    max-height: -webkit-fill-available;
  }

  &__logo {
    &:focus-visible {
      outline: solid 2px $t-primary;
      outline-offset: -2px;
    }
  }

  &__top {
    position: sticky;
    top: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    grid-area: top;
    box-shadow: $t-shadow-3;
    background: $t-surface-1;
    border-bottom: solid 1px $t-border;
  }

  &__search-wrap {
    position: relative;
    flex-grow: 1;
  }

  &__search {
    width: 100%;
    height: $c-top-height;
    padding: space(2) space(4) space(2)
      calc(#{space(4) + space(4)} + #{$c-search-icon-size});
    color: $t-text;
    background: $t-surface-1;
    border: 0;
    font-size: $font-size-3xl;
    outline: none;
    appearance: none;

    &:focus {
      box-shadow: inset 0 0 0 2px $t-primary;

      + .l-default__search-icon {
        color: $t-text;
      }
    }

    &::-ms-clear,
    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }

    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }

  &__search-icon {
    position: absolute;
    top: 50%;
    left: space(4);
    z-index: 2;
    font-size: $c-search-icon-size;
    transform: translateY(-50%);
    pointer-events: none;
    color: $t-text-light;
  }

  &__theme-switch {
    padding: space(2);
    margin: 0 space(4);
    border-radius: 50%;
    outline: none;
    font-size: 1.5rem;

    &:hover {
      color: $t-primary;
    }

    &:focus-visible {
      box-shadow: inset 0 0 0 2px $t-primary;
    }
  }

  &__sidebar {
    grid-area: sidebar;
    position: relative;
    background: $t-surface-2;
    box-shadow: $c-sidebar-shadow;
  }

  &__main {
    grid-area: main;
    grid-column: 2 / -1;
    display: flex;
    flex-direction: column;
  }

  &__sidebar + &__main {
    grid-area: main;
  }

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: space(2);
    height: $c-top-height;
    border-bottom: solid 1px $t-border;
  }

  &__nav-link {
    display: block;
    text-align: center;
    margin: 0;
    padding: space(2);
    border-bottom: solid 1px $t-border;
  }

  &__content {
    flex-grow: 1;
  }

  &__footer {
    margin-top: space(3);
    padding: space(3) space(4);
    background: $t-surface-2;
    text-align: center;
    color: $t-text-light;
    border-top: solid 1px $t-border;
  }
}
</style>
