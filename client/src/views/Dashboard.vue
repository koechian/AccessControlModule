<template>
  <NavBar />
  <h1 className="font-normal text-2xl mb-10">Hello, {{ username }}</h1>

  <h4 className="mb-5 text-xl font-semibold">Your employees</h4>

  <button @click="handleLogout">Logout</button>
  <router-view></router-view>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';

const auth = JSON.parse(sessionStorage.getItem('auth'));
const username = ref(auth.username);
const router = useRouter();

async function handleLogout(event) {
  event.preventDefault();

  try {
    // Delete Session Information
    sessionStorage.clear();

    // Send logout Request to server
    const response = await axios.post(
      'http://localhost:3000/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    // Navigate to Login Page
    router.push('/');
  } catch (error) {
    console.log(error);
  }
}
</script>
