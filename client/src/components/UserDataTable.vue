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
import { PhPencilSimple, PhFilePlus } from '@phosphor-icons/vue';
import Button from './ui/button/Button.vue';
import { Toaster } from 'vue-sonner';

import CreateUserSheet from './CreateUserSheet.vue';
import EditUserSheet from './EditUserSheet.vue';

const auth = JSON.parse(sessionStorage.getItem('auth'));

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['userUpdated']);

function childEmiter() {
  emit('userUpdated');
}

const isCreateOpen = ref(false);

function openCreateSheet() {
  isCreateOpen.value = true;
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
  <div class="flex justify-between">
    <h4 class="mb-5 text-xl font-semibold">Employees Information</h4>
    <Button
      v-if="auth.role == 'Admin'"
      @click="openCreateSheet"
      class="bg-[#297045] hover:bg-[#2E933C]"
      ><div class="flex gap-2">
        <PhFilePlus :size="22" />
        Add new Employee
      </div></Button
    >
    <CreateUserSheet
      :isOpen="isCreateOpen"
      @project-updated="childEmiter"
      @update:isOpen="isCreateOpen = $event"
    />
  </div>
  <Toaster></Toaster>

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
        <TableHead v-if="auth.role == 'Admin'" class="w-[100px]">
          Actions</TableHead
        >
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in data" :id="row.id">
        <TableCell>{{ row.firstname }}</TableCell>
        <TableCell>{{ row.lastname }}</TableCell>
        <TableCell>{{ row.email }}</TableCell>
        <TableCell>{{ row.phonenumber }}</TableCell>
        <TableCell>{{ row.role }}</TableCell>
        <TableCell>{{ row.KRAPin }}</TableCell>
        <TableCell v-if="auth.role == 'Admin'">
          <Button @click="openEditSheet(row.id)"
            ><div class="flex gap-2">
              <PhPencilSimple size="20" color="#ffff" />
              Edit
            </div>
          </Button>

          <EditUserSheet
            :isOpen="editStates[row.id] || false"
            :row="row"
            :id="row.id"
            @user-updated="childEmiter"
            @update:isOpen="closeEditSheet(row.id)"
          />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
