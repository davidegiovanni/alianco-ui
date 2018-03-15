<template>
  <base-card
    :image="citizen.picture"
    class="is-rounded">
    <div class="has-text-centered"
         v-if="!loading">
      <base-button
        @click="remove"
        v-show="!isAdmin">
        X
      </base-button>
      <span class="title is-6">
        {{ citizen.user_hid }}
      </span>
      <br>
      <span class="subtitle is-7">
        {{ citizen.role }}
      </span>
    </div>
    <div
      v-if="loading">
       <span class="title is-6">
        Caricamento in corso
      </span>
    </div>
  </base-card>
</template>

<script>
  export default {
    props: {
      citizen: {
        default () {
          return {}
        },
        type: Object
      },
      loading: {
        default: false,
        type: Boolean
      }
    },
    computed: {
      isAdmin () {
        return this.citizen.role === 'admin'
      }
    },
    methods: {
      remove ($event) {
        this.$emit('remove', $event)
      }
    }
  }
</script>
