<template>
  <v-row align="stretch" no-gutters class="fill-height">
    <v-col cols="4" class="">
      <v-img height="100vh" src="/images/bg-image-10.jpg" />
    </v-col>
    <v-col cols="8">
      <v-row class="fill-height d-flex flex-column" no-gutters>
        <v-col class="d-flex flex-row align-center justify-end py-14 pl-14 flex-grow-0">
          <section>
            <span class="ml-2">
              حساب کابری ندارید؟
            </span>
            <v-btn :to="{name: 'auth-register'}" x-large depressed color="primary">
              ثبت نام
            </v-btn>

            <!--            <pre>-->
            <!--{{ $auth.loggedIn }}-->
            <!--            </pre>-->
            <!--            <pre v-if="$auth.loggedIn">-->
            <!--              {{ $auth.user }}-->
            <!--            </pre>-->
          </section>
        </v-col>
        <v-col class="flex-grow-1 d-flex flex-row align-center justify-center">
          <v-card min-width="350" max-width="360">
            <v-card-text>
              <ValidationObserver
                ref="form"
                v-slot="{invalid}"
                tag="form"
                @submit.prevent="submitFrom1"
              >
                <ValidationProvider v-slot="{errors}" name="شماره موبایل" rules="required|phoneNumber">
                  <v-text-field
                    v-model="phoneNumber"
                    :error-messages="errors"
                    outlined
                    label="شماره موبایل"
                    required
                  />
                </ValidationProvider>
                <ValidationProvider v-slot="{errors}" name="رمز عبور" rules="required">
                  <v-text-field
                    v-model="password"
                    :error-messages="errors"
                    outlined
                    :type="showPass? 'text': 'password'"
                    label="رمز عبور"
                    required
                  >
                    <template #append>
                      <v-scroll-x-reverse-transition mode="out-in">
                        <v-icon :key="showPass" @click="showPass = !showPass">
                          {{ showPass ? 'mdi-eye-off' : 'mdi-eye' }}
                        </v-icon>
                      </v-scroll-x-reverse-transition>
                    </template>
                  </v-text-field>
                </ValidationProvider>
                <v-card-actions>
                  <v-spacer />
                  <v-btn depressed color="primary" type="submit" :disabled="invalid">
                    ورود
                  </v-btn>
                </v-card-actions>
              </ValidationObserver>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'RegisterPage',
  layout: 'auth',
  data () {
    return {
      step: 1,
      showPass: false,
      phoneNumber: '',
      password: ''
    }
  },
  methods: {
    async submitFrom1 () {
      try {
        await this.$auth.loginWith('local', {
          data: {
            phoneNumber: this.phoneNumber,
            password: this.password
          }
        })
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    }
  }

}
</script>

<style scoped>

</style>
