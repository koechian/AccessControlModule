<script setup>
import Cards from '@/components/CRMComponents/Cards.vue';
import CustomersTable from '@/components/CRMComponents/CustomersTable.vue';
import Header from '@/components/CRMComponents/Header.vue';
import LeadsTable from '@/components/CRMComponents/LeadsTable.vue';
import SideBar from '@/components/CRMComponents/SideBar.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Toaster } from 'vue-sonner';

let customerData = ref([]);
let leadsData = ref([]);
let metrics = ref({});
const selectedTable = ref('customers');

onMounted(() => {
  dataFetcher('customers');
  metricsOverview();
});
function toggleDataFetched(type) {
  selectedTable.value = type;
  dataFetcher(type);
}

async function handleLeadsSearchQueryUpdated(query) {
  if (query != '') {
    try {
      const response = await axios.get(
        `http://localhost:3000/leads/queryLeads?${query}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );

      leadsData.value = response.data;
      // console.log(`http://localhost:3000/leads/queryLeads?${query}`);
    } catch (e) {
      console.log(e);
    }
  } else {
    dataFetcher('leads');
  }
}

async function handleCustomersSearchQueryUpdated(query) {
  if (query != '') {
    try {
      const response = await axios.get(
        `http://localhost:3000/customers/getCustomers?${query}`,
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );

      leadsData.value = response.data;
      // console.log(`http://localhost:3000/customers/getCustomers?${query}`);
    } catch (e) {
      console.log(e);
    }
  } else {
    dataFetcher('customers');
  }
}

const auth = JSON.parse(sessionStorage.getItem('auth'));

async function metricsOverview() {
  const endpoints = {
    leadsCount: 'http://localhost:3000/leads/getLeadsCount',
    convertedLeadsCount: 'http://localhost:3000/leads/getConvertedLeadsCount',
    // customersCount: 'http://localhost:3000/customers/customerCount',
  };

  for (const endpoint in endpoints) {
    const result = await axios.get(endpoints[endpoint]);

    metrics.value[endpoint] = result.data;
  }
}

async function dataFetcher(type) {
  // Send off a post request to the getUsers endpoint to get the data

  const endpoint =
    type === 'customers'
      ? 'http://localhost:3000/customers/getCustomers'
      : 'http://localhost:3000/leads/getLeads';
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
  <Toaster></Toaster>
  <div class="p-5 flex">
    <div class="w-2/12">
      <SideBar
        @switch-tab="
          (tab) => {
            toggleDataFetched(tab);
          }
        "
      />
    </div>
    <div class="w-9/12 p-3">
      <Header @customer-created="handleCustomerUpdate" />
      <Cards
        :leadsConverted="metrics['convertedLeadsCount']"
        :activeLeads="metrics['leadsCount']"
      />

      <component
        v-if="selectedTable === 'customers'"
        :is="CustomersTable"
        :data="customerData"
        @customer-updated="handleCustomerUpdate"
        @search-query-updated="handleCustomersSearchQueryUpdated"
      />

      <component
        v-else-if="selectedTable === 'leads'"
        :is="LeadsTable"
        :data="leadsData"
        @leads-updated="handleLeadUpdate"
        @search-query-updated="handleLeadsSearchQueryUpdated"
      />
    </div>
  </div>
</template>
