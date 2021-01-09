<template>
  <div class ="app bi">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}


</script>

<style>
  @font-face {
    font-family: "Razerd";
    src: local(Razerd),
    url('./fonts/Razerd Light.ttf') format("truetype");
  }
.app {
 height: 3500px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: dimgrey;
  z-index:1;
}
</style>
