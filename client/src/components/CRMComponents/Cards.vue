<script setup>
defineProps({
  leadsConverted: {
    type: Number,
    default: 0,
  },
  totalCustomers: {
    type: Number,
    default: 0,
  },
  activeLeads: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div class="flex gap-4 m-5 place-self-center">
    <div
      class="border rounded-lg p-7 flex flex-col aspect-video gap-4 min-w-80"
    >
      <h3 class="text-2xl">Total Customers</h3>
      <span class="text-4xl">{{ totalCustomers }}</span>
    </div>
    <div
      class="border rounded-lg p-7 flex flex-col min-w-80 aspect-video gap-4"
    >
      <h3 class="text-2xl">Converted Leads</h3>
      <span class="text-4xl">{{ leadsConverted }}</span>
    </div>
    <div
      class="border rounded-lg p-7 flex flex-col min-w-80 aspect-video gap-4"
    >
      <h3 class="text-2xl">Active Leads</h3>
      <span class="text-4xl">{{ activeLeads }}</span>
    </div>
  </div>
</template>
