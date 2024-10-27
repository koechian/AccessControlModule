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
import {
  PhCheckCircle,
  PhXCircle,
  PhFlagBannerFold,
  PhPause,
  PhRepeat,
  PhPencilSimple,
  PhTrash,
  PhFilePlus,
} from '@phosphor-icons/vue';
import Button from './ui/button/Button.vue';
import DatePicker from './DatePicker.vue';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import axios from 'axios';
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
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

const auth = JSON.parse(sessionStorage.getItem('auth'));

const emits = defineEmits(['projectUpdated']);

const updateform = ref({
  projectName: '',
  description: '',
  clientName: '',
  projectedCost: 0,
  isAssigned: false,
  status: '',
  endDate: undefined,
});

// Function to populate form with existing data when edit is clicked
function populateForm(row) {
  updateform.value = {
    projectId: row.projectId,
    projectName: row.projectName,
    description: row.description,
    clientName: row.clientName,
    projectedCost: row.projectedCost,
    isAssigned: row.isAssigned,
    status: row.status,
    endDate: row.endDate,
  };
}

async function projectDelete(id) {
  const response = await axios.delete(
    `http://localhost:3000/projects/deleteProject/${id}`,
    {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    },
  );

  if (response.statusText === 'OK') {
    toast.success('Project Deleted', { position: 'top-left' });
    emits('projectUpdated');
  }
}

async function projectEditSubmit() {
  try {
    // Create form data object with only changed values
    const changedData = {};
    for (const [key, value] of Object.entries(updateform.value)) {
      if (value !== '' && value !== null && value !== undefined) {
        if (key === 'endDate') {
          const date = new Date(
            updateform.value[key].year,
            updateform.value[key].month - 1,
            updateform.value[key].day,
          );

          changedData[key] = date.toISOString();
        } else {
          changedData[key] = updateform.value[key];
        }
      }
    }

    const response = await axios.put(
      `http://localhost:3000/projects/updateProject`,
      { ...changedData },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );

    if (response.statusText === 'OK') {
      toast.success('Project Updated Successfully', { position: 'top-left' });
      emits('projectUpdated');
    }

    // Reset form after successful submission
    updateform.value = {
      projectName: '',
      description: '',
      clientName: '',
      projectedCost: 0,
      isAssigned: false,
      status: '',
      endDate: '',
    };
  } catch (error) {
    console.error(error);
    toast.error('Error updating Project', { position: 'top-left' });
  }
}

function formatPrice(price) {
  const formater = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  });

  return formater.format(price);
}

function formatDate(isoString) {
  const date = new Date(isoString);

  // Customize options for date formatting
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-KE', options).format(date);
}
</script>

<template>
  <div class="flex justify-between">
    <h4 class="mb-5 text-xl font-semibold">All Projects Outline</h4>
    <Button class="bg-[#297045] hover:bg-[#2E933C]"
      ><div class="flex gap-2">
        <PhFilePlus :size="22" />
        Create new Project
      </div></Button
    >
  </div>

  <Toaster></Toaster>

  <Table>
    <TableCaption
      >This is a list of company projects, past and present.</TableCaption
    >
    <TableHeader>
      <TableRow>
        <TableHead class="text-center"> Project Name </TableHead>
        <TableHead class="text-center"> Description</TableHead>
        <TableHead class="text-center"> Client Name</TableHead>
        <TableHead class="text-center"> Projected Cost</TableHead>
        <TableHead class="text-center"> Assigned</TableHead>
        <TableHead class="text-center"> Asignee</TableHead>
        <TableHead class="text-center"> Status</TableHead>
        <TableHead class="text-center"> Date Started</TableHead>
        <TableHead class="text-center"> Projected End</TableHead>
        <TableHead class="text-center"> Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="row in data" :id="row.id">
        <TableCell>{{ row.projectName }}</TableCell>
        <TableCell>{{ row.description }}</TableCell>
        <TableCell class="text-center">{{ row.clientName }}</TableCell>
        <TableCell>{{ formatPrice(row.projectedCost) }}</TableCell>
        <TableCell class="w-[150px]">
          <div class="justify-items-center">
            <component
              :is="row.isAssigned ? PhCheckCircle : PhXCircle"
              :size="25"
              :color="row.isAssigned ? '#04724D' : '#FE5F00'"
            ></component>
            <span class="text-[#04724D] text-xs" v-if="row.isAssigned"
              >Assigned</span
            >
            <span class="text-[#FE5F00] text-xs" v-else>Not Assigned</span>
          </div></TableCell
        >
        <TableCell
          ><div class="text-center">
            {{
              row.isAssigned && row.users[0]?.user
                ? row.users[0].user.firstName + ' ' + row.users[0].user.lastName
                : '-'
            }}
          </div>
        </TableCell>
        <TableCell>
          <div class="justify-items-center text-center">
            <component
              :is="
                row.status === 'paused'
                  ? PhPause
                  : row.status === 'completed'
                    ? PhFlagBannerFold
                    : PhRepeat
              "
              :size="25"
              :color="
                row.status === 'paused'
                  ? '#FE5F00'
                  : row.status === 'completed'
                    ? '#04724D'
                    : '#1B4079'
              "
            />
            <span
              class="status-text"
              :style="{
                color:
                  row.status === 'paused'
                    ? '#FE5F00'
                    : row.status === 'completed'
                      ? '#04724D'
                      : '#1B4079',
              }"
            >
              {{ row.status.charAt(0).toUpperCase() + row.status.slice(1) }}
            </span>
          </div>
        </TableCell>
        <TableCell>{{ formatDate(row.startDate) }}</TableCell>
        <TableCell>{{ formatDate(row.endDate) }}</TableCell>
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
                    <DatePicker v-model="updateform.endDate" />
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
