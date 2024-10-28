<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

let usersData = ref([]);
const auth = JSON.parse(sessionStorage.getItem('auth'));

const emit = defineEmits(['modelValue']);
const value = ref('');

const props = defineProps({
  isEnabled: {
    type: Boolean,
  },
});

onMounted(() => {
  dataFetcher();
});

watch(value, (newValue) => {
  emit('modelValue', newValue);
});

async function dataFetcher() {
  // Send off a post request to the getUsers endpoint to get users list
  try {
    const response = await axios.get(
      'http://localhost:3000/users/getAllUsers',
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );
    usersData.value = response.data;
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <select
    v-model="value"
    title="Please check the Assigned box to change this value"
    :disabled="!isEnabled"
    class="border p-2 rounded-md"
  >
    <option selected value="" hidden disabled>
      Select Employee to assign to
    </option>
    <option v-for="user in usersData" :id="user.id" :value="user.userid">
      {{ user.firstname + ' ' + user.lastname }}
    </option>
  </select>
</template>
