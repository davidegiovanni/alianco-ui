<template>
  <base-sidebar
    @close="close"
    @select="select"
    :items="realms"
    :options="options">
    <template
      slot="sidebar-item"
      slot-scope="item">
      <article class="media">
        <figure class="media-left">
          <p class="image is-64x64">
            <img :src="item.data.data.picture">
          </p>
        </figure>
        <p>
          <strong>{{item.data.data.name}}</strong>
          <br>{{item.data.data.hid}}
        </p>
      </article>
    </template>
  </base-sidebar>
</template>

<script>
  export default {
    props: {
      options: {
        default () {
          return {}
        },
        type: Object
      },
      realms: {
        default () {
          return []
        },
        type: Array
      }
    },
    methods: {
      select ($event) {
        this.$emit('select', $event)
      },
      close ($event) {
        this.$emit('close', $event)
      }
    }
  }
</script>

<style>

</style>
