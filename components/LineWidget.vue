<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    iconURL: string
    username: string
  }>(),
  {
    iconURL: '',
    username: 'No User'
  }
)
</script>

<template>
  <div class="base">
    <img src="@/assets/imgs/line_logo.png" />
    <img id="line-user-icon" :src="iconURL" />
    <p>{{ props.username }}</p>
  </div>
</template>

<style scoped>
.base {
  width: min(80vw, 350px, 100%);
  height: 6em;
  background: #06c755;
  box-sizing: border-box;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 1em;
  margin: 0.5em;

  > img {
    margin: 0;
    height: 3.5em;
    width: 3.5em;
    object-fit: contain;
  }

  > p {
    font-size: 1.5em;
    margin-left: 0.5em;
  }

  #line-user-icon {
    border-radius: 50%;
  }
}
</style>
