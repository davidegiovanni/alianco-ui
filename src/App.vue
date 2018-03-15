<template>
  <div
    id="app">
    <base-navbar>
      <template
        slot="left">
        <base-button @click="sidebar = true"
                     v-show="sidebarButton">
          <base-icon icon="map-signs" />
        </base-button>
        <span class="is-uppercase is-size-4"
        style="font-weight:700;color:white;">
          {{ currentRealm ? currentRealm.name : '' }} - {{ $t(routeName) }}
        </span>
      </template>
      <template
        slot="right">
        <user-profile-image
         :src="profile"
        />
      </template>
    </base-navbar>
    <realms-sidebar
      :options="{ closeLabel: 'chiudi' }"
      v-show="sidebar"
      @close="sidebar = false"
      @select="changeRealm"
      @create="gotoCreateRealm"
      :realms="realms"
      :currentRealm="currentRealm"/>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import AutocompleteModal from '@/components/UserAutocompleteModal'
  import RealmsSidebar from '@/components/RealmsSidebar'
  import UserProfileImage from '@/components/UserProfileImage'

  export default {
    components: {
      AutocompleteModal,
      RealmsSidebar,
      UserProfileImage
    },
    data () {
      return {
        sidebar: false,
        sidebarButton: true
      }
    },
    computed: {
      realms () {
        return this.$store.getters['app/realms']
      },
      profile () {
        const profile = this.$store.getters['auth/profile']
        if (profile && profile.picture) {
          return profile.picture
        } else {
          return 'https://api.adorable.io/avatars/96/qweqw.png'
        }
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
      this.sidebarButton = true
      // })
    },
    methods: {
      changeRealm (realm) {
        this.$store.dispatch('app/changeRealm', realm)
      },
      gotoCreateRealm () {
        this.sidebar = false
        this.$router.push('create')
        this.sidebarButton = false
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
