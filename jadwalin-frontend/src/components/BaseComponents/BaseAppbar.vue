<template>
  <div>
    <v-app-bar
      flat
    >
      <v-toolbar-title class="text-uppercase deep-purple--text accent-4">
        <span class="font-weight-light">Jadwal</span>
        <span>In</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="signOut" text color="deep-purple accent-4">
        <span class="hidden-xs-only">Sign Out</span>
        <v-icon right>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      localStorage.removeItem('token');
      this.$router.replace('/login');
    },
  },
};
</script>
