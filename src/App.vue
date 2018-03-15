<template>
  <div
    id="app">
    <base-navbar>
      <template
        slot="left">
        <div style="display: flex;"
             v-show="!isCreateView">
          <a
            @click="sidebar = true"
            >
          <span style="color:white;">
           <base-icon icon="th-large:large"/>
          </span>
          </a>
          <div class="is-uppercase is-size-4"
               style="font-weight:700;color:white;">
            {{ currentRealm ? currentRealm.name : '' }}<br>
            <span class="is-uppercase is-size-6"
                  style="font-weight:300;color:white;">
          {{ $t(routeName) }}
        </span>
          </div>
        </div>
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
        sidebar: false
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
      },
      isCreateView () {
        return this.$route.name === 'create'
      }
    },
    created: function () {
<<<<<<< HEAD
      // this.$store.dispatch('auth/init').then(() => {
      this.$store.dispatch('app/init')
      this.$router.push('/list')
      // })
=======
      this.$store.dispatch('auth/init').then(() => {
        this.$store.dispatch('app/init').then(() => {
          debugger
          if (!this.currentRealm) {
            this.$router.push('create')
          } else {
            this.$router.push('list')
          }
        })

        this.sidebarButton = true
      })
>>>>>>> 9df36dbb886253a1c56ab1a6deeaea22e7e9d7e5
    },
    methods: {
      changeRealm (realm) {
        this.$store.dispatch('app/changeRealm', realm)
      },
      gotoCreateRealm () {
        this.sidebar = false
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
