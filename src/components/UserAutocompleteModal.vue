<template>
  <base-modal
    class="is-active"
    @close="close">
    <base-card>
      <base-autocomplete
        :server="true"
        :options="users"
        @input="updateUsers"
        @select="selectUser">
        <template
          slot="item"
          scope="user">
          <user-autocomplete-item
            :user="user" />
        </template>
      </base-autocomplete>
    </base-card>
  </base-modal>
</template>

<script>
  import Axios from 'axios'
  import AnimoService from '@revas/animo-service'

  const animo = new AnimoService(Axios, {
    endpoint: process.env.REVAS_API_ENDPOINT
  })

  export default {
    name: 'UserAutocompleteModal',
    data () {
      return {
        users: []
      }
    },
    methods: {
      close ($event) {
        this.$emit('close', $event)
      },
      async updateUsers ($event) {
        const { data: { profiles } } = await animo.queryProfiles([], $event.target.value)
        this.users = profiles
      },
      selectUser ($event) {
        this.$emit('select', $event)
      }
    }
  }
</script>
