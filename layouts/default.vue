<script lang="ts" setup></script>

<template>
  <v-app>
    <div id="root-frame">
      <div>
        <header>
          <img id="logo" src="@/assets/imgs/lumos_logo.png" />
        </header>
        <div id="slot">
          <slot />
        </div>
      </div>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
#root-frame {
  display: flex;
  background: #2e2f3f;
  color: #fff3db;
  font-family: 'Zen Maru Gothic', sans-serif;
  min-height: 100vh;

  > div {
    overflow: hidden;
    overflow-y: auto;
    padding: 30px;
    box-sizing: border-box;
    max-width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

// add fade in animation to logo
#logo {
  opacity: 0;
  animation: fadein ease-out 0.2s 0.5s forwards;
}

#slot {
  max-width: 100%;
  opacity: 0;
  animation: simple-fadein ease-out 0.2s 0.5s forwards;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(30%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes simple-fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

header {
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;

  #logo {
    margin: auto;
    width: min(70vw, 300px);
    font-size: 20px;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 10%;
  }
}
</style>
