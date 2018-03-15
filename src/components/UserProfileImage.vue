<template>
  <figure
    class="image is-96x96">
    <img
      :src="src"
      style="border-radius:50%">
  </figure>
</template>

<script>
  export default {
    props: {
      src: {
        default () {
          return 'https://api.adorable.io/avatars/96/qweqw.png'
        },
        type: String
      }
    }
  }
</script>
