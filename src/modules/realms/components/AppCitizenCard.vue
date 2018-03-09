<template>
  <base-card
    :image="citizen.picture"
    class="is-rounded">
    <div class="has-text-centered">
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
    }
  }
</script>
