<template>
  <div id="app">

  <v-app> 
    <v-content>

      <router-link @click="sayHello" to="/">Home</router-link> | 
      <!-- <router-link @click.native="sayHello" to="/List">List</router-link> |  -->
      <router-link @click.native="sayHello" to="/Member">Member</router-link> | 
      <router-link  to="/Worksheet">Worksheet</router-link> | 
      <router-link  to="/Workdetails">Workdetails</router-link>

      <router-view/>

    </v-content>
  </v-app>
  
  </div>
</template>

<script>
// <img src="./assets/pwa-mini.gif" width="100" style="text-align: left;">
export default {
  name: 'App',
  methods: {
    sayHello() {
      //console.log('hello world');
    }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
