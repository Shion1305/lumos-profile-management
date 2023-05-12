<script lang="ts" setup>
const authURL = useRuntimeConfig().public.discord.authUrl
</script>

<template>
    <div id="base-frame">
        <div id="header-title">Lumos メンバー管理</div>
        <hr>
        <a id="discord-auth"
           :href="authURL">
            <img src="@/assets/imgs/discord_logo.png" alt="Discord"/>
            でログイン
        </a>
    </div>
</template>

<style scoped lang="scss">
#base-frame {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

hr {
    width: 100%;
    border: 2px solid #fff3db;
    border-radius: 2px;
    margin: 20px 0;
}

#header-title {
    font-size: min(7vw, 30px);
}

#discord-auth {
    margin: 0 auto;
    width: fit-content;
    color: #fff;
    padding: 20px;
    text-align: center;
    display: flex;
    background: #5865f2;
    text-decoration: none;
    flex-direction: column;
    border-radius: 15px;
    font-size: 1.2em;
    font-weight: bold;

    > img {
        max-width: fit-content;
        height: 40px;
    }
}
</style>
