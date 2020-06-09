<template>
  <div id="app">
    <Header v-if="user" />
    <Loading v-if="validatingToken"/>
    <Content v-else />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import {mapState} from 'vuex'

import Header from "./components/template/Header";
import Content from "./components/template/Content";
import Loading from './components/template/Loading'
export default {
  name: "App",
  components: { Header, Content , Loading },
  computed: mapState(['user']),
  data: function() {
    return {
      validatingToken: true
    };
  },
  methods: {
    async validateToken() {
      this.validatingToken = true;

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.validatingToken = false;
        return this.$router.push({ name: "Auth" });
      }
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);
      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "Auth" });
      }
      this.validatingToken = false;
    }
  },
  created() {
    this.validateToken();
  }
};
</script>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100vh;
  display: grid;
  grid-template-rows: 80px 1fr;
  grid-template-columns: 1fr;

  grid-template-areas:
    "header"
    "content";
}
body  {
  background-color: #f5f5f5;
  margin: 0;
}
</style>
