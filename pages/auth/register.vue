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
              حساب کابری دارید؟
            </span>
            <v-btn :to="{name: 'auth-login'}" x-large depressed color="primary">
              ورود
            </v-btn>
          </section>
        </v-col>
        <v-col class="flex-grow-1 d-flex flex-row align-center justify-center">
          <v-card min-width="350" max-width="360">
            <v-card-text>
              <v-window v-model="step">
                <v-window-item :value="1">
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
                    <v-card-actions>
                      <v-spacer />
                      <v-btn depressed color="primary" type="submit" :disabled="invalid">
                        ارسال کد تایید
                      </v-btn>
                    </v-card-actions>
                  </ValidationObserver>
                </v-window-item>
                <v-window-item :value="2">
                  <ValidationObserver
                    ref="form2"
                    v-slot="{invalid}"
                    tag="form"
                    @submit.prevent="submitFrom2"
                  >
                    <label>
                      کد تایید
                    </label>
                    <ValidationProvider
                      v-slot="{errors}"
                      rules="required"
                      name="کد تایید"
                      dir="ltr"
                    >
                      <v-input :error-messages="errors">
                        <v-otp-input
                          v-model="otp"
                          outlined
                          length="6"
                          required
                        />
                      </v-input>
                    </ValidationProvider>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn depressed color="primary" type="submit" :disabled="invalid">
                        کد تایید
                      </v-btn>
                    </v-card-actions>
                  </ValidationObserver>
                </v-window-item>
                <v-window-item :value="3">
                  <ValidationObserver
                    v-slot="{invalid}"
                    ref="form3"
                    tag="form"
                    @submit.prevent="submitFrom3"
                  >
                    <ValidationProvider
                      v-slot="{errors}"
                      name="نام"
                      rules="required"
                    >
                      <v-text-field
                        v-model="f_name"
                        :error-messages="errors"
                        outlined
                        label="نام"
                        required
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{errors}"
                      name="نام خانوادگی"
                      rules="required"
                    >
                      <v-text-field
                        v-model="l_name"
                        :error-messages="errors"
                        outlined
                        label="نام خانوادگی"
                        required
                      />
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{errors}"
                      name="رمز"
                      rules="required"
                    >
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
                      <v-btn depressed color="primary" :disabled="invalid" type="submit">
                        ثبت نام
                      </v-btn>
                    </v-card-actions>
                  </ValidationObserver>
                </v-window-item>
              </v-window>
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
      otp: '',
      f_name: '',
      l_name: '',
      password: ''
    }
  },
  methods: {
    async submitFrom1 () {
      try {
        const result = await this.$axios.$post('/auth/send-validation-sms', {
          phoneNumber: this.phoneNumber,
          type: 'newUser'
        })
        this.$toast.success(result.message)
        this.step = 2
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
    async submitFrom2 () {
      try {
        const result = await this.$axios.$post('/auth/validate-sms-code', {
          phoneNumber: this.phoneNumber,
          code: this.otp
        })
        this.$toast.success(result.message)
        this.step = 3
      } catch (e) {
        this.$toast.error(e.response.data.message)
      }
    },
    async submitFrom3 () {
      try {
        await this.$axios.$post('/auth/register', {
          phoneNumber: this.phoneNumber,
          firstName: this.f_name,
          lastName: this.l_name,
          password: this.password
        })
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
