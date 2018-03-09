<template>
  <div>
    <section class="hero is-primary is-medium">
      <div class="hero-body">
        <div class="container">
        </div>
      </div>
    </section>
    <section style="transform: translateY(-50%)">
      <div
        class="container is-flex"
        style="justify-content: flex-end;">
        <base-button
          class="button"
          @click="showUserModal">
          Add citizen
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
            <citizen-card :citizen="citizen"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CitizenCard from '@/modules/realms/components/AppCitizenCard'
  export default {
    components: {
      CitizenCard
    },
    data () {
      return {
        isActive: false
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
      showUserModal: function () {
        // this.$store.dispatch()
      }
    },
    watch: {
      currentRealm: function (realm) {
        this.$store.dispatch('realms/queryCitizens', realm)
      }
    }
  }
</script>
