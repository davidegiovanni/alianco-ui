<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img :src="realm.picture">
      </p>
    </figure>
    <div class="media-content">
      <div class="content is-vcentered">
        <p>
          <strong>{{realm.name}}</strong>
          <br>@{{realm.realm_hid}}
        </p>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    props: {
      realm: {
        default () {
          return {}
        },
        type: Object
      }
    }
  }
</script>
