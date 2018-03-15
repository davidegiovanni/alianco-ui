<template>
  <base-sidebar
    @close="close"
    @select="select"
    :items="realms"
    id="realm_hid"
    :selected="currentRealm">
    <template
      slot="sidebar-item"
      slot-scope="item">
      <realms-sidebar-item :realm="item.data.data"/>
    </template>
    <template
      slot="sidebar-footer">
      <base-button
        class="is-text"
        @click="create">
        crea organizzazione
      </base-button>
    </template>
  </base-sidebar>
</template>

<script>
  import RealmsSidebarItem from '@/components/RealmsSidebarItem'

  export default {
    components: {
      RealmsSidebarItem
    },
    props: {
      realms: {
        default () {
          return []
        },
        type: Array
      },
      currentRealm: {
        default () {
          return {}
        },
        type: Object
      }
    },
    methods: {
      select ($event) {
        this.$emit('select', $event)
      },
      close ($event) {
        this.$emit('close', $event)
      },
      create ($event) {
        this.$emit('create', $event)
      }
    }
  }
</script>

<style>

</style>
