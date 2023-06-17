<script setup lang="ts">
setTimeout(() => {
  useRouter().push('/')
}, 10000)
</script>

<template>
  <div>
    <h1 class="text-animation">
      <span style="--delay: 0.3s">Oops!</span>
      <span style="--delay: 0.6s">Looks like</span>
      <span style="--delay: 0.9s">invisible dragons</span>
      <span style="--delay: 1.2s">ain't letting you in</span>
      <span style="--delay: 1.5s" class="lumos">Lumos!</span>
    </h1>
    <p>認証したアカウントが<br />Lumosに存在しているか<br />確認しましょう</p>
  </div>
</template>

<style scoped lang="scss">
.text-animation {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  span {
    opacity: 0;
    animation: fadeIn 1s forwards;
    animation-delay: var(--delay);
  }

  .lumos {
    font-size: 1.5em;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      animation: drawLine 1.5s 1.8s forwards;
    }
  }
}

p {
  font-size: 1.2em;
  width: 100%;
  opacity: 0;
  animation: fadeIn 1s 2.4s forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drawLine {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>
