<script setup>
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import Button from './ui/button/Button.vue';
import { ref, watchEffect } from 'vue';
import { toast } from 'vue-sonner';
import axios from 'axios';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:isOpen', 'userUpdated']);
const auth = JSON.parse(sessionStorage.getItem('auth'));

const submitForm = ref({
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  phonenumber: 0,
  password: '',
  role: undefined,
  KRAPin: undefined,
});

watchEffect(() => {
  props.isOpen,
    (newVal) => {
      if (!newVal) {
        resetForm();
      }
    };
});

function resetForm() {
  submitForm.value = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phonenumber: 0,
    password: '',
    role: undefined,
    KRAPin: undefined,
  };
}

async function createUserSubmit() {
  try {
    // Create form data object with only valid values
    const userData = {};
    for (const [key, value] of Object.entries(submitForm.value)) {
      if (value !== '' && value !== null && value !== undefined) {
        userData[key] = submitForm.value[key];
      }
    }

    const response = await axios.post(
      `http://localhost:3000/users/createUser`,
      { ...userData },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );

    if (response.statusText === 'OK') {
      toast.success('Employee has been added to the company', {
        position: 'top-left',
      });
      emit('userUpdated');
    }

    console.log(userData);

    // Reset form after successful submission
    resetForm();
  } catch (error) {
    console.error(error);
    toast.error('Error adding Employee', { position: 'top-left' });
  }
}
</script>
<template>
  <Sheet :open="isOpen" @update:open="$emit('update:isOpen', false)">
    <SheetContent>
      <div class="p-3 w-full">
        <SheetHeader class="my-2">
          <h3 class="font-medium text-lg">Add a new Employee</h3>
        </SheetHeader>

        <form @submit.prevent="createUserSubmit" class="flex flex-col gap-3">
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="firstname">First Name</label>
            <input
              v-model="submitForm.firstname"
              class="border p-2 rounded-md"
              type="text"
              name="firstname"
              required
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="lastName">Last Name</label>
            <input
              v-model="submitForm.lastName"
              class="border p-2 rounded-md"
              type="text"
              name="lastName"
              required
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="username">Username</label>
            <input
              v-model="submitForm.username"
              class="border p-2 rounded-md"
              type="text"
              name="username"
              required
            />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="email">Email</label>
            <input
              class="border p-2 rounded-md"
              type="email"
              required
              name="email"
              v-model="submitForm.email"
            />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="phoneNumber">Phone Number</label>
            <input
              class="border p-2 rounded-md"
              type="phone"
              name="phoneNumber"
              required
              v-model="submitForm.phonenumber"
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="phoneNumber">Password</label>
            <input
              class="border p-2 rounded-md"
              type="password"
              name="password"
              required
              v-model="submitForm.password"
            />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="krapin">KRA Pin</label>
            <input
              class="border p-2 rounded-md"
              type="krapin"
              name="krapin"
              required
              v-model="submitForm.KRAPin"
            />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="status">Role</label>
            <select
              class="border p-2 rounded-md"
              id="role"
              name="role"
              required
              v-model="submitForm.role"
            >
              <option value="Admin">Admin</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Engineer">Engineer</option>
            </select>
          </div>
          <Button>Add Employee</Button>
        </form>
      </div>
    </SheetContent>
  </Sheet>
</template>
