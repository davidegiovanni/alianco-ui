<template>
  <base-modal
    @close="close">
    <base-autocomplete
      :options="options"
      @select="select"
      @input="input">
      <template
        slot="item"
        scope="option">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="option.picture">
            </p>
          </figure>
          <p>
            <strong>
              {{ option.hid }}
            </strong>
            <br>
            {{ option.name }}
          </p>
        </article>
      </template>
    </base-autocomplete>
  </base-modal>
</template>

<script>
  export default {
    name: 'UserAutocompleteModal',
    async data () {
      return {
        options: []
      }
    },
    methods: {
      close ($event) {
        this.$emit('close', $event)
      },
      select ($event) {
        // this.$emit.('select', $event)
      },
      input ($event) {

      }
    }
  }
</script>
