<template>
  <div id="app">
    <div class="is-full">
      <navbar></navbar>
    </div>

    <div class="column is-three-fifths is-offset-one-fifth">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/navbar";

export default {
  name: "app",
  components: { Navbar }
};
</script>
