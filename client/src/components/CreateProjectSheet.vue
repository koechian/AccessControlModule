<script setup>
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import Button from './ui/button/Button.vue';
import DatePicker from './DatePicker.vue';
import SelectAsignee from '@/components/SelectAsignee.vue';
import { ref, watch } from 'vue';
import { toast, Toaster } from 'vue-sonner';
import axios from 'axios';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:isOpen', 'projectUpdated']);
const auth = JSON.parse(sessionStorage.getItem('auth'));

const submitForm = ref({
  projectName: '',
  description: '',
  clientName: '',
  projectedCost: 0,
  isAssigned: false,
  status: '',
  startDate: undefined,
  endDate: undefined,
});

watch(() => {
  props.isOpen,
    (newVal) => {
      if (!newVal) {
        resetForm();
      }
    };
});

function resetForm() {
  submitForm.value = {
    projectName: '',
    description: '',
    clientName: '',
    projectedCost: 0,
    isAssigned: false,
    status: '',
    startDate: undefined,
    endDate: undefined,
  };
}

function dateConverter(date) {
  const newDate = new Date(date);

  if (isNaN(newDate)) {
    toast.error('Invalid Date format provided');
    return;
  }
  return newDate.toISOString();
}

async function createProjectSubmit() {
  try {
    // Create form data object with only valid values
    const projectData = {};
    for (const [key, value] of Object.entries(submitForm.value)) {
      if (value !== '' && value !== null && value !== undefined) {
        if ((key === 'endDate') | (key === 'startDate')) {
          projectData[key] = dateConverter(submitForm.value[key]);
        } else {
          projectData[key] = submitForm.value[key];
        }
      }
    }

    const response = await axios.post(
      `http://localhost:3000/projects/createProject`,
      { ...projectData },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );

    if (response.statusText === 'OK') {
      toast.success('Project Updated Successfully', { position: 'top-left' });
      emit('projectUpdated');
    }

    console.log(projectData);

    // Reset form after successful submission
    resetForm();
  } catch (error) {
    console.error(error);
    toast.error('Error creating Project', { position: 'top-left' });
  }
}
</script>
<template>
  <Sheet :open="isOpen" @update:open="$emit('update:isOpen', false)">
    <SheetContent>
      <div class="p-3 w-full">
        <SheetHeader class="my-2">
          <h3 class="font-medium text-lg">Create new Project</h3>
          <span class="text-gray-500"
            ><small> Project can be assigned after creation </small>
          </span>
        </SheetHeader>

        <form @submit.prevent="createProjectSubmit" class="flex flex-col gap-3">
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="projectName">Project Name</label>
            <input
              v-model="submitForm.projectName"
              class="border p-2 rounded-md"
              type="text"
              name="projectName"
              required
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="projectName"
              >Project Description</label
            >
            <textarea
              class="border p-2 rounded-md"
              v-model="submitForm.description"
              required
            ></textarea>
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="clientName">Client Name</label>
            <input
              class="border p-2 rounded-md"
              type="text"
              required
              name="clientName"
              v-model="submitForm.clientName"
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
              min="100000"
              required
              v-model.number="submitForm.projectedCost"
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="status">Status</label>
            <select
              class="border p-2 rounded-md"
              id="status"
              name="status"
              required
              v-model="submitForm.status"
            >
              <option value="completed">Completed</option>
              <option value="paused">Paused</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="">Project Start Date</label>
            <!-- <DatePicker v-model="submitForm.startDate" /> -->
            <input type="date" v-model="submitForm.startDate" />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="">Projected End Date</label>
            <!-- <DatePicker v-model="submitForm.endDate" /> -->
            <input type="date" v-model="submitForm.endDate" />
          </div>
          <Button>Create Project</Button>
        </form>
      </div>
    </SheetContent>
  </Sheet>
</template>
