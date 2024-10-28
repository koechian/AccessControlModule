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
import { PhPencilSimple, PhTrash, PhFilePlus } from '@phosphor-icons/vue';
import Button from './ui/button/Button.vue';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { toast, Toaster } from 'vue-sonner';
import SelectAsignee from '@/components/SelectAsignee.vue';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import CreateUserSheet from './CreateUserSheet.vue';

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

const isOpen = ref(false);

function openSheet() {
  isOpen.value = true;
}
</script>

<template>
  <div class="flex justify-between">
    <h4 class="mb-5 text-xl font-semibold">Employees Information</h4>
    <Button @click="openSheet" class="bg-[#297045] hover:bg-[#2E933C]"
      ><div class="flex gap-2">
        <PhFilePlus :size="22" />
        Add new Employee
      </div></Button
    >
    <CreateUserSheet
      :isOpen="isOpen"
      @project-updated="childEmiter"
      @update:isOpen="isOpen = $event"
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
        <TableHead class="w-[100px]"> Actions</TableHead>
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
        <TableCell>
          <Sheet>
            <SheetTrigger>
              <Button @click="populateForm(row)"
                ><div class="flex gap-2">
                  <PhPencilSimple size="20" color="#ffff" />
                  Edit
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div class="p-3 w-full">
                <SheetHeader>
                  <h3 class="my-2 font-medium text-lg">Edit Project Details</h3>
                </SheetHeader>

                <form
                  @submit.prevent="projectEditSubmit()"
                  class="flex flex-col gap-3"
                >
                  <div class="mt-3 flex flex-col gap-2">
                    <label class="font-medium" for="projectName"
                      >Project Name</label
                    >
                    <input
                      v-model="updateform.projectName"
                      class="border p-2 rounded-md"
                      type="text"
                      name="projectName"
                      id=""
                      :placeholder="row.projectName"
                    />
                  </div>
                  <div class="mt-3 flex flex-col gap-2">
                    <label class="font-medium" for="projectName"
                      >Project Description</label
                    >
                    <textarea
                      class="border p-2 rounded-md"
                      :placeholder="row.description"
                      v-model="updateform.description"
                    ></textarea>
                  </div>

                  <div class="mt-3 flex flex-col gap-2">
                    <label class="font-medium" for="clientName"
                      >Client Name</label
                    >
                    <input
                      class="border p-2 rounded-md"
                      type="text"
                      name="clientName"
                      v-model="updateform.clientName"
                      :placeholder="row.clientName"
                    />
                  </div>

                  <div class="mt-3 flex flex-col gap-2">
                    <label class="font-medium" for="projectedCost"
                      >Projected Cost</label
                    >
                    <input
                      class="border p-2 rounded-md"
                      type="number"
                      name="projectedCost"
                      v-model.number="updateform.projectedCost"
                      id=""
                      :placeholder="formatPrice(row.projectedCost)"
                    />
                  </div>
                  <div class="mt-3 flex gap-2">
                    <input
                      type="checkbox"
                      name="assigned"
                      id="isAssigned"
                      v-model="updateform.isAssigned"
                      :checked="row.isAssigned"
                    />
                    <label class="font-medium" for="assigned">Assigned</label>
                  </div>
                  <!-- Add logic to assign Users here -->
                  <div class="mt-3 flex flex-col gap-2">
                    <label class="font-medium" for="status">Status</label>
                    <select
                      class="border p-2 rounded-md"
                      id="status"
                      name="status"
                      v-model="updateform.status"
                    >
                      <option value="completed">Completed</option>
                      <option value="paused">Paused</option>
                      <option value="ongoing">Ongoing</option>
                    </select>
                  </div>

                  <div class="mt-3 flex flex-col gap-2">
                    <label for="">Asignee</label>
                    <SelectAsignee
                      :isEnabled="updateform.isAssigned"
                      v-model="updateform.asignee"
                    />
                  </div>

                  <div class="mt-3 flex flex-col gap-2">
                    <label class="font-medium" for="">Projected End Date</label>
                    <!-- <DatePicker v-model="updateform.endDate" /> -->
                    <input type="date" v-model="updateform.endDate" />
                  </div>
                  <Button>Apply Changes</Button>
                </form>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button class="mt-20" variant="destructive">
                      <div class="flex gap-2">
                        <PhTrash :size="22" /> Delete Project
                      </div>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle
                        >Are you absolutely sure?</AlertDialogTitle
                      >
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently the
                        project and unclouple it from the associated user.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction @click.prevent="projectDelete(row.id)"
                        >Continue</AlertDialogAction
                      >
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </SheetContent>
          </Sheet>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
