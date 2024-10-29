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

import { ref, watchEffect } from 'vue';

import { PhPencilSimple, PhFunnelSimple, PhX } from '@phosphor-icons/vue';
import Badge from '../ui/badge/Badge.vue';
import { Toaster } from 'vue-sonner';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EditCustomerSheet from './EditCustomerSheet.vue';

const auth = JSON.parse(sessionStorage.getItem('auth'));

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['customerUpdated', 'searchQueryUpdated']);

const searchQuery = ref('');

const activeFilters = ref({
  customerName: false,
  email: false,
  companyName: false,
});

function childEmiter() {
  emit('customerUpdated');
}

const editStates = ref({});

function openEditSheet(rowId) {
  editStates.value[rowId] = true;
}

function closeEditSheet(rowId) {
  editStates.value[rowId] = false;
}

function toggleActiveFilters(filter) {
  activeFilters.value[filter] = !activeFilters.value[filter];
}

watchEffect(() => {
  const queryParts = [];

  if (activeFilters.value.leadStatus && searchQuery.value) {
    queryParts.push(`status=${searchQuery.value}`);
  }
  if (activeFilters.value.customerName && searchQuery.value) {
    queryParts.push(`customerName=${searchQuery.value}`);
  }
  if (activeFilters.value.customerEmail && searchQuery.value) {
    queryParts.push(`email=${searchQuery.value}`);
  }
  if (activeFilters.value.companyName && searchQuery.value) {
    queryParts.push(`companyName=${searchQuery.value}`);
  }

  const queryString = queryParts.join('&');
  emit('searchQueryUpdated', queryString);
});
</script>

<template>
  <div>
    <h4 class="mb-5 text-xl font-semibold">Customer Information</h4>
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
          toggleActiveFilters('email');
        }
      "
      v-if="activeFilters['email']"
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
          @click="toggleActiveFilters('email')"
        >
          Email
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

  <div class="relative h-[60vh] overflow-auto">
    <Table>
      <TableCaption>Customer Details</TableCaption>
      <TableHeader class="sticky top-0 bg-white">
        <TableRow>
          <TableHead class="w-[100px]"> Name </TableHead>
          <TableHead class="w-[100px]"> Email</TableHead>
          <TableHead class="w-[100px]"> Phonenumber</TableHead>
          <TableHead class="w-[100px]"> Company Name</TableHead>
          <TableHead class="w-[100px]"> Address</TableHead>
          <TableHead class="w-[100px]"> Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in data" :id="row.id">
          <TableCell>{{ row.name }}</TableCell>
          <TableCell>{{ row.email }}</TableCell>
          <TableCell>{{ row.phone }}</TableCell>
          <TableCell>{{ row.companyName }}</TableCell>
          <TableCell>{{ row.address }}</TableCell>
          <TableCell>
            <Button @click="openEditSheet(row.id)"
              ><div class="flex gap-2">
                <PhPencilSimple size="20" color="#ffff" />
                Edit
              </div>
            </Button>
            <EditCustomerSheet
              :isOpen="editStates[row.id] || false"
              :row="row"
              :id="row.id"
              @customerAdded="childEmiter"
              @update:isOpen="closeEditSheet(row.id)"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
