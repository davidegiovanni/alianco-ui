<template>
  <div>
    <base-overlay
      v-if="isHidden">
      <div
        class="is-size-3"
        style="padding-bottom:2rem;padding-left:20%;padding-right:20%;">
        {{ $t('create-realm.overlay-message') }}
      </div>
      <div>
        <base-button
          @click="dispose"
          class="is-large is-primary">
          {{ $t('create-realm.overlay-action') }}
        </base-button>
      </div>
    </base-overlay>
    <section
      class="hero is-fullheight is-primary">
      <div
        class="hero-body">
        <div
          class="container">
          <div
            class="columns is-centered">
            <div
              style="width:300px">
              <create-realm-card
                @confirm="createRealm"
                @cancel="cancel"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import AppCreateRealmCard from '@/modules/realms/components/AppCreateRealmCard'

  export default {
    components: {
      'create-realm-card': AppCreateRealmCard
    },
    data () {
      return {
        isDisposed: false
      }
    },
    computed: {
      hasRealms () {
        const realms = this.$store.getters['app/realms']
        return realms.length > 0
      },
      isHidden () {
        return !this.hasRealms && !this.isDisposed
      }
    },
    methods: {
      dispose () {
        this.isDisposed = true
      },
      createRealm ($event) {
        console.log($event)
        this.$store.dispatch('realms/createRealm', $event.realm).then(() => {
          this.$router.push('members')
        })
      },
      cancel () {
        if (this.hasRealms) {
          this.$router.push('members')
        } else {
          this.isDisposed = false
        }
      }
    }
  }
</script>
