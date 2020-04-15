<template>
  <section class="login">
    <div class="login-form">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form method="POST" @submit.prevent="handleSubmit(submit)">
          <h1 class="login-form--title">
            Login login
          </h1>
          <div class="login-form--field form-field">
            <ValidationProvider v-slot="{ classes, errors }" name="Email" rules="required|email">
              <input v-model="form.email" class="input form-input" :class="classes" type="email" placeholder="Email">
              <span v-show="errors.length>0" class="is-invalid">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="login-form--field form-field">
            <ValidationProvider v-slot="{ classes, errors }" name="Password" rules="required">
              <input v-model="form.password" class="input form-input" :class="classes" type="password" placeholder="Password">
              <span v-show="errors.length>0" class="is-invalid">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="login-form--cta">
            <button type="submit" class="btn btn-color--blue btn-size--md">
              Login
            </button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </section>
</template>

<script>

export default {

  data () {
    return {
      form: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    submit () {
      this.$axios.post('https://api.quwi.com/v2/auth/login', {
        email: this.form.email,
        password: this.form.password
      }).then((response) => {
        const token = response.data.token
        this.$store.commit('addUserToken', token)
        this.$cookies.set('quwi_user_token', token)
        this.$router.replace({ path: '/' })
      }).catch((e) => {
        this.$modal.show('dialog', {
          text: 'You have entered an invalid username or password',
          buttons: [
            {
              title: 'Close'
            }
          ]
        })
      })
    }
  }
}
</script>

<style>

</style>
