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

import { ref } from 'vue';
import { PhPencilSimple, PhFunnelSimple } from '@phosphor-icons/vue';
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

const emit = defineEmits(['customerUpdated']);

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
</script>

<template>
  <div>
    <h4 class="mb-5 text-xl font-semibold">Customer Information</h4>
  </div>
  <div class="flex place-items-center justify-end gap-5">
    <input
      class="border p-3 rounded-lg min-w-16"
      placeholder="Search box"
      type="text"
    />
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
        <DropdownMenuLabel> Company Name </DropdownMenuLabel>
        <DropdownMenuLabel> Email </DropdownMenuLabel>
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
