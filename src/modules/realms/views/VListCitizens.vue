<template>
  <div>
    <section class="hero action-bar is-primary">
      <div class="hero-body">
        <div class="container">
        </div>
      </div>
    </section>
    <section
      class="section"
      style="transform: translateY(-50%)">
      <div
        class="container is-flex"
        style="justify-content: flex-end;">
        <base-button
          class="is-circular"
          @click="isSelectingUser = true"
          style="box-shadow: 0px 0px 300px -30px rgba(128,128,128,0.75);">
          <base-icon
            icon="plus"/>
        </base-button>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline"
             v-if="isCitizensLoading">
          <div  class="column is-one-fifth">
            <citizen-card
              :loading="isCitizensLoading"
            />
          </div>
        </div>
        <div class="columns is-multiline"
             v-else>
          <div
            :key="citizen.user_hid"
            v-for="citizen in citizens"
            class="column is-one-fifth">
            <citizen-card
              :citizen="citizen"
              @remove="removeCitizen($event, citizen)"/>
          </div>
        </div>
      </div>
    </section>
    <user-autocomplete-modal
      v-show="isSelectingUser"
      @close="isSelectingUser = false"
      @select="addCitizen"></user-autocomplete-modal>
  </div>
</template>

<script>
  import CitizenCard from '@/modules/realms/components/AppCitizenCard'
  import UserAutocompleteModal from '@/components/UserAutocompleteModal.vue'

  export default {
    components: {
      UserAutocompleteModal,
      CitizenCard
    },
    data () {
      return {
        isSelectingUser: false
      }
    },
    computed: {
      citizens () {
        return this.$store.getters['realms/citizens']
      },
      currentRealm () {
        return this.$store.getters['app/currentRealm']
      },
      isCitizensLoading () {
        // return this.$store.getters['realms/isWaiting']
        return this.$store.getters['realms/isWaiting']
      }
    },
    methods: {
      addCitizen (user) {
        this.isSelectingUser = false
        this.$store.dispatch('realms/addCitizen', user)
      },
      removeCitizen ($event, citizen) {
        this.$store.dispatch('realms/removeCitizen', citizen)
      }
    },
    watch: {
      currentRealm (realm) {
        this.$store.dispatch('realms/queryCitizens', realm)
      }
    }
  }
</script>

<style>
  .action-bar {
    padding-bottom: 5rem;
    padding-top: 5rem;
  }
</style>
