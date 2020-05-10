<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  mounted() {
    axios.defaults.headers.common.Authorization = `Bearer ${this.$store.getters.token}`;
  },
};
</script>
