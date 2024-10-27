<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import axios from 'axios';
import UserDataTable from '@/components/UserDataTable.vue';
import ProjectsDataTable from '@/components/ProjectsDataTable.vue';

const auth = JSON.parse(sessionStorage.getItem('auth'));
const username = ref(auth.username);
let usersData = ref([]);
let projectsData = ref([]);
const selectedTable = ref('users');

onMounted(() => {
  dataFetcher('users');
});

function toggleDataFetched(type) {
  selectedTable.value = type;
  dataFetcher(type);
}

async function dataFetcher(type) {
  // Send off a post request to the getUsers endpoint to get the data

  const endpoint =
    type === 'users'
      ? 'http://localhost:3000/users/getAllUsers'
      : 'http://localhost:3000/projects/getProjects';
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    });
    if (type === 'users') {
      usersData.value = response.data;
    } else {
      projectsData.value = response.data;
    }
  } catch (e) {
    console.log(e);
  }
}

function handleProjectsUpdate() {
  dataFetcher('projects');
}
</script>

<template>
  <NavBar @toggleTable="toggleDataFetched" />

  <section class="bg-[#F5F5F5] p-5 mt-5">
    <h1 class="font-normal text-2xl mb-10">Hello, {{ username }}</h1>
    <component
      :is="selectedTable === 'users' ? UserDataTable : ProjectsDataTable"
      :data="selectedTable === 'users' ? usersData : projectsData"
      @project-updated="handleProjectsUpdate"
    />
  </section>

  <router-view></router-view>
</template>
