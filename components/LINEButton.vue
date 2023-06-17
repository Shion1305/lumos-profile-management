<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    lineAuthURL?: string
    buttonText?: string
  }>(),
  {
    lineAuthURL: useRuntimeConfig().public.line.authUrl,
    buttonText: '連携する'
  }
)
</script>
<template>
  <a id="line-button" :href="props.lineAuthURL">
    <img alt="LINE logo" src="@/assets/imgs/line_logo.png" />
    <span>{{ props.buttonText }}</span>
  </a>
</template>

<style scoped>
#line-button {
  width: fit-content;
  border: #06c755 3px solid;
  background: #06c755;
  font-size: 1.5em;
  border-radius: 20px;
  padding: 8px 20px;
  display: flex;
  text-decoration: none;
  align-items: center;
  color: white;

  > img {
    height: 2em;
  }

  a {
    text-decoration: none;
  }
}
</style>
