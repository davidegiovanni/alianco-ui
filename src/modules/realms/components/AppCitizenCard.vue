<template>
  <base-card
    :image="citizen.picture"
    class="is-rounded">
    <div class="has-text-centered">
      <base-button
        @click="remove">
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
      }
    },
    methods: {
      remove ($event) {
        this.$emit('remove', $event)
      }
    }
  }
</script>
