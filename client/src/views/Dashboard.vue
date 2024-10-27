<template>
  <NavBar />

  <section class="bg-[#EFF9F0]">
    <h1 class="font-normal text-2xl mb-10">Hello, {{ username }}</h1>
    <h4 class="mb-5 text-xl font-semibold">Your employees</h4>
  </section>

  <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue';
import NavBar from '@/components/NavBar.vue';

const auth = JSON.parse(sessionStorage.getItem('auth'));
const username = ref(auth.username);
</script>
