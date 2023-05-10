<script lang="ts" setup></script>

<template>
    <div id="root-frame">
        <div>
            <header>
                <img src="@/assets/imgs/lumos_logo.png" id="logo"/>
                <div id="header-title">Lumos メンバー管理</div>
                <hr>
            </header>
            <slot/>
        </div>
    </div>
</template>

<style scoped lang="scss">
#root-frame {
  width: 100lvw;
  height: 100lvh;
  display: flex;

  > div {
      padding: 50px;
    max-width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

header {
  box-sizing: border-box;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  font-size: min(7vw, 30px);

  #logo {
    margin: auto;
    width: min(70vw, 300px);
    font-size: 20px;
    border-radius: 50%;
    box-sizing: border-box;
    padding: 10%;
  }

  hr {
    width: 100%;
    border: 2px solid #fff3db;
    border-radius: 2px;
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