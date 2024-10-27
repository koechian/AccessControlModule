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

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div>
    <h4 class="mb-5 text-xl font-semibold">Employees Information</h4>
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
</template>
