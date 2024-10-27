<script setup>
import { ref, onMounted } from 'vue';
import NavBar from '@/components/NavBar.vue';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';

const auth = JSON.parse(sessionStorage.getItem('auth'));
const username = ref(auth.username);
let data = ref([]);

onMounted(() => {
  dataFetcher();
});

async function dataFetcher() {
  // Send off a post request to the getUsers endpoint to get the data

  try {
    const response = await axios.get(
      'http://localhost:3000/users/getAllUsers',
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    data.value = response.data;
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <NavBar />

  <section class="bg-[#F5F5F5] p-5 mt-5">
    <div>
      <h1 class="font-normal text-2xl mb-10">Hello, {{ username }}</h1>
      <h4 class="mb-5 text-xl font-semibold">Employees</h4>
    </div>

    <Table>
      <TableCaption>A list of your employees and their details.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[100px]"> First Name </TableHead>
          <TableHead class="w-[100px]"> Last Name </TableHead>
          <TableHead class="w-[100px]"> Email</TableHead>
          <TableHead class="w-[100px]"> Phonenumber</TableHead>
          <TableHead class="w-[100px]"> Role</TableHead>
          <TableHead class="w-[100px]"> KRA Pin</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in data" :id="row.id">
          <TableCell>{{ row.firstName }}</TableCell>
          <TableCell>{{ row.lastName }}</TableCell>
          <TableCell>{{ row.email }}</TableCell>
          <TableCell>{{ row.phonenumber }}</TableCell>
          <TableCell>{{ row.role }}</TableCell>
          <TableCell>{{ row.KRAPin }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </section>

  <router-view></router-view>
</template>
