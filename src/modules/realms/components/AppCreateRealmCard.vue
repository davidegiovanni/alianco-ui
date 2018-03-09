<template>
  <div
    class="card">
    <div
      class="card-content">
      <base-image-upload
        @upload="upload"
        style="padding: 60px;"/>
      <base-input
        v-model="name"
        :label="$t('create-realm.name-input-label')"
        :placeholder="$t('create-realm.name-input-placeholder')"/>
      <div
        class="columns">
        <div
          class="column">
          <base-button
            @click="cancel">
            {{ $t('create-realm.cancel-button') }}
          </base-button>
        </div>
        <div
          class="column">
          <base-button
            @click="confirm"
            :disabled="!isValid()"
            class="is-primary">
            {{ $t('create-realm.confirm-button') }}
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: null,
        image: null
      }
    },
    methods: {
      cancel () {
        this.$emit('cancel')
      },
      confirm () {
        this.$emit('confirm', {
          realm: {
            name: this.name
          }
        })
      },
      isValid () {
        return this.name !== null && this.name.length > 0 &&
          this.image !== null && this.image.length > 0
      },
      upload ($event) {
        this.image = $event.target.result
      }
    }
  }
</script>
