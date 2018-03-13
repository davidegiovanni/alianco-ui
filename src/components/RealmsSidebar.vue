<template>
  <base-sidebar
    @close="close"
    @select="select"
    :items="realms"
    id="realm_hid"
    :selected="currentRealm"
    :options="options">
    <template
      slot="sidebar-item"
      slot-scope="item">
      <realms-sidebar-item :realm="item.data.data"/>
    </template>
    <template
      slot="sidebar-footer">
      <base-button>
        aggungi org
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
        debugger
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
