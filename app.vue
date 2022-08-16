<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    // FIXME remove the replace() when the issue is fixed
    return titleChunk
      ? `${titleChunk.replace(" - POC Nuxt3 Movies", "")} - POC Nuxt3 Movies`
      : "POC Nuxt3 Movies";
  },
});
</script>

<template>
  <NuxtPage />
</template>
