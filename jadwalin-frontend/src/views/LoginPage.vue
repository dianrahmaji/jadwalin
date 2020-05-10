<template>
  <v-content>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-card outlined width="400px">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline mb-1">Login</v-list-item-title>
                <div class="cr-form">
                  <v-form
                  >
                    <v-text-field
                    v-model="input.username"
                    label="Username"
                    required
                    color="deep-purple accent-4"
                    ></v-text-field>

                    <v-text-field
                    v-model="input.password"
                    label="Password"
                    required
                    color="deep-purple accent-4"
                    ></v-text-field>
                  </v-form>
                </div>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              dark
              depressed
              color="deep-purple accent-4"
              @click="Login"
            >
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      input: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    async Login() {
      try {
        const result = await axios.post('http://localhost:3000/user/login', {
          username: this.input.username,
          password: this.input.password,
        });
        console.log(result);
        this.$store.commit('saveToken', result.data.token);
        axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`;
        this.$router.replace('/');
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
