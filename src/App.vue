<template>
  <div
    id="app">
    <base-navbar>
      <template
        slot="left">
        <base-button @click="sidebar = true">
          <base-icon icon="globe" />
        </base-button>
        <span class="is-uppercase">
          {{ currentRealm ? currentRealm.name : '' }} - {{ $t(routeName) }}
        </span>
      </template>
      <template
        slot="right">
        <base-button
          @click="gotoCreateRealm"
          style="padding: 10px">
            <span class="icon is-large">
              CO
            </span>
        </base-button>
        <figure
          class="image is-64x64">
          <img
            :src="profile"
            style="border-radius:50%">
        </figure>
      </template>
    </base-navbar>
    <realms-sidebar
      :options="{ closeLabel: 'chiudi' }"
      v-show="sidebar"
      @close="sidebar = false"
      @select="changeRealm"
      :realms="realms"/>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import AutocompleteModal from '@/components/UserAutocompleteModal'
  import RealmsSidebar from '@/components/RealmsSidebar'

  export default {
    components: {
      AutocompleteModal,
      RealmsSidebar
    },
    data () {
      return {
        sidebar: false
      }
    },
    computed: {
      realms () {
        return this.$store.getters['app/realms']
      },
      profile () {
        return this.$store.getters['auth/profile'].picture
      },
      currentRealm () {
        return this.$store.getters['app/currentRealm']
      },
      routeName () {
        return this.$route ? this.$route.name : ''
      }
    },
    created: function () {
      // this.$store.dispatch('auth/init').then(() => {
      this.$store.dispatch('app/init')
      this.$router.push('/list')
      // })
    },
    methods: {
      changeRealm (realm) {
        this.$store.dispatch('app/changeRealm', realm)
        this.sidebar = false
      },
      gotoCreateRealm () {
        this.$router.push('create')
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .5s;
  }

  .fade-enter-active {
    transition-delay: .5s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
