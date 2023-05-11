<script setup lang="ts">
const props = withDefaults(defineProps<{
    iconURL: string
    username: string
}>(), {
    iconURL: "",
    username: "No User"
})
</script>

<template>
    <div class="base">
        <img src="@/assets/imgs/discord_icon.png" id="discord-logo"/>
        <img id="discord-user-icon" :src="iconURL"/>
        <p>{{ props.username }}</p>
    </div>
</template>

<style scoped>
.base {
    overflow: hidden;
    width: min(80vw, 350px, 100%);
    height: 6em;
    background: #5865f2;
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 1em;
    margin: .5em;

    > img {
        margin: 0;
        height: 3.5em;
        width: 3.5em;
        object-fit: contain;
    }

    #discord-logo {
        box-sizing: border-box;
        padding: .5em;
    }

    #discord-user-icon{
        border-radius: 50%;
    }

    > p {
        max-width: 250px;
        font-size: 1.5em;
        margin-left: 0.5em;
    }
}
</style>