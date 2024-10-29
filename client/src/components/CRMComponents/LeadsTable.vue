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

import {
  PhPencilSimple,
  PhFunnelSimple,
  PhX,
  PhFilePlus,
} from '@phosphor-icons/vue';

import { ref, watchEffect } from 'vue';
import { Toaster } from 'vue-sonner';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import EditLeadSheet from './EditLeadSheet.vue';
import Badge from '../ui/badge/Badge.vue';
import NewInteraction from './NewInteraction.vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const activeFilters = ref({
  customerName: false,
  leadStatus: false,
  customerEmail: false,
  companyName: false,
});

const emit = defineEmits(['leadsUpdated', 'searchQueryUpdated']); // Emit search query

const editStates = ref({});
const newLeadStates = ref({});
const searchQuery = ref('');

function childEmiter() {
  emit('leadsUpdated');
}

function openEditSheet(rowId) {
  editStates.value[rowId] = true;
}
function openInteractionSheet(rowId) {
  newLeadStates.value[rowId] = true;
}

function closeInteractionSheet(rowId) {
  newLeadStates.value[rowId] = false;
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
    queryParts.push(`customerEmail=${searchQuery.value}`);
  }
  if (activeFilters.value.companyName && searchQuery.value) {
    queryParts.push(`companyName=${searchQuery.value}`);
  }

  const queryString = queryParts.join('&');
  // console.log(queryString);
  emit('searchQueryUpdated', queryString); // Emit the updated query string to the parent
});
</script>

<template>
  <div class="flex justify-between">
    <h4 class="mb-5 text-xl font-semibold">Leads Information</h4>
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
        Status
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
          <TableHead class="w-[100px]"> Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="row in data" :id="row.id">
          <TableCell>{{ row.customer.name }}</TableCell>
          <TableCell>{{ row.status }}</TableCell>
          <TableCell>{{ row.customer.email }}</TableCell>
          <TableCell>{{ row.customer.companyName }}</TableCell>
          <TableCell>{{ row.customer.phone }}</TableCell>
          <TableCell>
            <div class="flex-col gap-2 flex">
              <Button @click="openEditSheet(row.id)"
                ><div class="flex gap-2">
                  <PhPencilSimple size="20" color="#ffff" />
                  Edit
                </div>
              </Button>

              <Button @click="openInteractionSheet(row.id)"
                ><div class="flex gap-2">
                  <PhFilePlus size="20" color="#ffff" />
                  New Interaction
                </div>
              </Button>
            </div>
            <!-- <EditLeadSheet
              :isOpen="editStates[row.id] || false"
              :row="row"
              :id="row.id"
              @leads-updated="childEmiter"
              @update:isOpen="closeEditSheet(row.id)"
            /> -->

            <NewInteraction
              :isOpen="newLeadStates[row.id] || false"
              :leadId="row.id"
              :id="row.id"
              @interaction-created="childEmiter"
              @createInteraction:isOpen="closeInteractionSheet(row.id)"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
