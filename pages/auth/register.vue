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
            <v-btn x-large depressed color="primary">
              ورود
            </v-btn>
          </section>
        </v-col>
        <v-col class="flex-grow-1 d-flex flex-row align-center justify-center">
          <v-card min-width="350" max-width="360">
            <v-card-text>
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-form
                    ref="form"
                    v-model="validfrom1"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="phoneNumber"
                      outlined
                      label="شماره موبایل"
                      required
                    />
                    <v-card-actions>
                      <v-spacer />
                      <v-btn depressed color="primary" @click="step = 2">
                        ارسال کد تایید
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-window-item>
                <v-window-item :value="2">
                  <v-form
                    ref="form"
                    v-model="validfrom1"
                    lazy-validation
                  >
                    <label>
                      کد تایید
                    </label>
                    <section
                      dir="ltr"
                    >
                      <v-otp-input
                        v-model="otp"
                        outlined
                        length="5"
                        required
                      />
                    </section>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn depressed color="primary" @click="step = 3">
                        کد تایید
                      </v-btn>
                    </v-card-actions>
                  </v-form>
                </v-window-item>
                <v-window-item :value="3">
                  <v-form
                    ref="form"
                    v-model="validfrom1"
                    lazy-validation
                  >
                    <v-text-field
                      v-model="f_name"
                      outlined
                      label="نام"
                      required
                    />
                    <v-text-field
                      v-model="l_name"
                      outlined
                      label="نام خانوادگی"
                      required
                    />
                    <v-text-field
                      v-model="password"
                      outlined
                      type="password"
                      label="رمز عبور"
                      required
                    />
                    <v-card-actions>
                      <v-spacer />
                      <v-btn depressed color="primary">
                        ثبت نام
                      </v-btn>
                    </v-card-actions>
                  </v-form>
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
      validfrom1: true,
      phoneNumber: '',
      otp: '',
      f_name: '',
      l_name: '',
      password: ''
    }
  }

}
</script>

<style scoped>

</style>
