<script setup>
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { PhFunnelSimple, PhX } from '@phosphor-icons/vue';

import { ref, watchEffect } from 'vue';
import { Toaster } from 'vue-sonner';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Badge from '../ui/badge/Badge.vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => {},
  },
});

const activeFilters = ref({
  customerName: false,
  leadStatus: false,
  customerEmail: false,
  companyName: false,
  type: false,
});

const emit = defineEmits(['searchQueryUpdated']); // Emit search query

const searchQuery = ref('');

function toggleActiveFilters(filter) {
  activeFilters.value[filter] = !activeFilters.value[filter];
}

watchEffect(() => {
  const queryParts = [];

  if (activeFilters.value.leadStatus && searchQuery.value) {
    queryParts.push(`leadStatus=${searchQuery.value}`);
  }
  if (activeFilters.value.type && searchQuery.value) {
    queryParts.push(`interactionType=${searchQuery.value}`);
  }
  if (activeFilters.value.customerName && searchQuery.value) {
    queryParts.push(`customerName=${searchQuery.value}`);
  }
  if (activeFilters.value.customerEmail && searchQuery.value) {
    queryParts.push(`customerEmail=${searchQuery.value}`);
  }
  if (activeFilters.value.companyName && searchQuery.value) {
    queryParts.push(`companyName=${searchQuery.value}`);
  }

  const queryString = queryParts.join('&');
  emit('searchQueryUpdated', queryString);
});
</script>

<template>
  <div class="flex justify-between">
    <h4 class="mb-5 text-xl font-semibold">All Interactions</h4>
  </div>
  <div class="flex place-items-center justify-end gap-5 mb-5">
    <input
      v-model="searchQuery"
      class="border p-3 rounded-lg"
      placeholder="Search box"
      type="text"
    />
    <Badge
      @click="
        () => {
          toggleActiveFilters('customerEmail');
        }
      "
      v-if="activeFilters['customerEmail']"
      class="p-2 font-normal text-sm bg-blue-500 hover:bg-blue-300"
    >
      <div class="flex place-items-center gap-2 mr-2">
        <PhX />
        Email
      </div>
    </Badge>

    <Badge
      @click="
        () => {
          toggleActiveFilters('type');
        }
      "
      v-if="activeFilters['type']"
      class="p-2 font-normal text-sm bg-blue-500 hover:bg-blue-300"
    >
      <div class="flex place-items-center gap-2 mr-2">
        <PhX />
        InteractionType
      </div>
    </Badge>

    <Badge
      @click="
        () => {
          toggleActiveFilters('companyName');
        }
      "
      v-if="activeFilters['companyName']"
      class="p-2 font-normal text-sm bg-blue-500 hover:bg-blue-300"
    >
      <div class="flex place-items-center gap-2 mr-2">
        <PhX />
        Company Name
      </div>
    </Badge>

    <Badge
      @click="
        () => {
          toggleActiveFilters('leadStatus');
        }
      "
      v-if="activeFilters['leadStatus']"
      class="p-2 font-normal text-sm bg-blue-500 hover:bg-blue-300"
    >
      <div class="flex place-items-center gap-2 mr-2">
        <PhX />
        Lead Status
      </div>
    </Badge>
    <Badge
      @click="
        () => {
          toggleActiveFilters('customerName');
        }
      "
      v-if="activeFilters['customerName']"
      class="p-2 font-bg-blue-500 hover:bg-blue-300 bg-blue-500"
    >
      <div class="flex place-items-center gap-2 mr-2">
        <PhX />
        Customer Name
      </div>
    </Badge>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button>
          <div class="flex place-items-center gap-3">
            <PhFunnelSimple size="22" />
            <span class="font-normal"> Filters </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel
          class="p-2 hover:cursor-pointer hover:bg-blue-500 hover:text-white"
          @click="toggleActiveFilters('companyName')"
        >
          Company Name
        </DropdownMenuLabel>
        <DropdownMenuLabel
          class="p-2 hover:cursor-pointer hover:bg-blue-500 hover:text-white"
          @click="toggleActiveFilters('type')"
        >
          Interaction Type
        </DropdownMenuLabel>
        <DropdownMenuLabel
          class="p-2 hover:cursor-pointer hover:bg-blue-500 hover:text-white"
          @click="toggleActiveFilters('customerEmail')"
        >
          Email
        </DropdownMenuLabel>
        <DropdownMenuLabel
          class="p-2 hover:cursor-pointer hover:bg-blue-500 hover:text-white"
          @click="toggleActiveFilters('leadStatus')"
        >
          Lead Status
        </DropdownMenuLabel>
        <DropdownMenuLabel
          class="p-2 hover:cursor-pointer hover:bg-blue-500 hover:text-white"
          @click="toggleActiveFilters('customerName')"
        >
          Customer Name
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <Toaster></Toaster>

  <div class="h-[60vh] relative overflow-auto">
    <Table>
      <TableCaption>Leads Information</TableCaption>
      <TableHeader class="top-0 sticky bg-white">
        <TableRow>
          <TableHead class="w-[100px]"> Customer Name </TableHead>
          <TableHead class="w-[100px]"> Lead Status </TableHead>
          <TableHead class="w-[100px]"> Customer Email</TableHead>
          <TableHead class="w-[100px]"> Company name</TableHead>
          <TableHead class="w-[100px]"> Customer Phonenumber</TableHead>
          <TableHead class="w-[100px]"> Interaction</TableHead>
          <TableHead class="w-[100px]"> Interaction Detail</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in data" :id="row.id">
          <TableCell>{{ row.lead.customer.name }}</TableCell>
          <TableCell>{{ row.lead.status }}</TableCell>
          <TableCell>{{ row.lead.customer.email }}</TableCell>
          <TableCell>{{ row.lead.customer.companyName }}</TableCell>
          <TableCell>{{ row.lead.customer.phone }}</TableCell>
          <TableCell>{{ row.type }}</TableCell>
          <TableCell>{{ row.details }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
