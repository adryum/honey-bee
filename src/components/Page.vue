<script setup>
import axios from 'axios';

var data

axios.get('http://localhost:5000/api/data')
      .then(response => {
        this.data = response.data; // Set the data property to the fetched data
      })
      .catch(error => {
        console.error('There was an error fetching the data:', error);
      });
</script>

<template>
<div>

</div>
</template>

<style scoped lang='scss'>

</style>