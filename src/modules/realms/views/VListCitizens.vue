<template>
  <div>
    <section class="hero is-primary is-bold is-medium">
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
          style="box-shadow: 0 8px 19px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);">
          <base-icon
            icon="plus"/>
        </base-button>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
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
