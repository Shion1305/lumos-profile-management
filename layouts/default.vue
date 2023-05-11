<script lang="ts" setup></script>

<template>
    <div id="root-frame">
        <div>
            <header>
                <img src="@/assets/imgs/lumos_logo.png" id="logo"/>
            </header>
            <div id="slot">
                <slot/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
#root-frame {
  width: 100lvw;
  height: 100lvh;
  display: flex;

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
  animation: fadein ease-out .2s .5s forwards
}

#slot {
  max-width: 100%;
  opacity: 0;
  animation: simple-fadein ease-out .2s .5s forwards
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
<style>
body {
    margin: 0;
    background: #2e2f3f;
    color: #fff3db;
    font-family: 'Zen Maru Gothic', sans-serif;
}
</style>