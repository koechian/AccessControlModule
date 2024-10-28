<script setup>
import Cards from '@/components/CRMComponents/Cards.vue';
import CustomersTable from '@/components/CRMComponents/CustomersTable.vue';
import Header from '@/components/CRMComponents/Header.vue';
import LeadsTable from '@/components/CRMComponents/LeadsTable.vue';
import SideBar from '@/components/CRMComponents/SideBar.vue';
import { ref, onMounted } from 'vue';

let customerData = ref([]);
let leadsData = ref([]);
const selectedTable = ref('customers');

onMounted(() => {
  //   dataFetcher('customers');
});
function toggleDataFetched(type) {
  selectedTable.value = type;
  dataFetcher(type);
}

async function dataFetcher(type) {
  // Send off a post request to the getUsers endpoint to get the data

  const endpoint =
    type === 'customers'
      ? 'http://localhost:3000/users/getAllUsers'
      : 'http://localhost:3000/projects/assigned';
  try {
    const response = await axios.get(endpoint, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
      data: { userid: auth.userid },
    });
    if (type === 'customers') {
      customerData.value = response.data;
    } else {
      leadsData.value = response.data;
    }
  } catch (e) {
    console.log(e);
  }
}

function handleCustomerUpdate() {
  dataFetcher('customers');
}
function handleLeadUpdate() {
  dataFetcher('leads');
}
</script>
<template>
  <div class="p-5 flex">
    <div class="w-2/12">
      <SideBar />
    </div>
    <div class="w-9/12">
      <Header />
      <Cards />
      <component
        :is="selectedTable === 'customers' ? CustomersTable : LeadsTable"
        :data="selectedTable === 'customers' ? customerData : leadsData"
        @leadsUpdated="handleLeadUpdate"
        @customerUpdated="handleCustomerUpdate"
        @userCreated="handleCustomerUpdate"
      />
    </div>
  </div>
</template>
