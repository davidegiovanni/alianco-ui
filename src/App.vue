<template>
  <div
    id="app">
    <base-navbar>
      <template
        slot="left">
        <div style="display: flex;">
          <a
            @click="sidebar = true">
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
        <figure
          class="image is-96x96">
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
        const profile = this.$store.getters['auth/profile']
        if (profile && profile.picture) {
          return profile.picture
        } else {
          return 'https://scontent.fqpa1-1.fna.fbcdn.net/v/t31.0-8/26910628_2079881408910665_2175487719189477791_o.jpg?oh=8c3c49979eed596d4bfe0667f6450d5f&oe=5B4A918C'
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
      this.$store.dispatch('auth/init').then(() => {
        this.$store.dispatch('app/init')
        this.$router.push('/list')
      })
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
