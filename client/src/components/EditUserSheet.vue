<script setup>
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import Button from './ui/button/Button.vue';
import { onMounted, ref, watchEffect } from 'vue';
import { toast } from 'vue-sonner';
import axios from 'axios';
import { PhTrash } from '@phosphor-icons/vue';
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

// Function to populate form with existing data when edit is clicked
function populateForm(row) {
  updateform.value = {
    userid: row.userid,
    firstname: row.firstname,
    lastname: row.lastname,
    username: row.username,
    email: row.email,
    phonenumber: row.phonenumber,
    role: row.role,
    KRAPin: row.KRAPin,
  };
}

onMounted(() => {
  populateForm(props.row);
});

const props = defineProps({
  row: {
    type: Object,
    default: () => {},
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

watchEffect(() => {
  props.isOpen,
    (newVal) => {
      if (!newVal) {
        resetForm();
      }
    };
});

const auth = JSON.parse(sessionStorage.getItem('auth'));

const updateform = ref({
  userid: '',
  firstname: '',
  lastname: '',
  username: '',
  email: '',
  phonenumber: 0,
  password: '',
  role: undefined,
  KRAPin: undefined,
});

const emit = defineEmits(['userUpdated']);

async function userDelete(userid) {
  const response = await axios.delete(
    `http://localhost:3000/users/deleteUser/${userid}`,
    {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    },
  );

  if (response.statusText === 'OK') {
    toast.success('Employee Removed from Company', { position: 'top-left' });
    emit('userUpdated');
  }
}

async function userEditSubmit() {
  try {
    // Create form data object with only changed values
    const changedData = {};
    for (const [key, value] of Object.entries(updateform.value)) {
      if (value !== '' && value !== null && value !== undefined) {
        changedData[key] = updateform.value[key];
      }
    }

    const response = await axios.put(
      `http://localhost:3000/users/updateuser`,
      { ...changedData },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );

    if (response.statusText === 'OK') {
      toast.success('Employee Updated Successfully', { position: 'top-left' });
      emit('userUpdated');
    }

    // Reset form after successful submission
    updateform.value = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      phonenumber: 0,
      password: '',
      role: undefined,
      KRAPin: undefined,
    };
  } catch (error) {
    console.error(error);
    toast.error('Error updating Employee Details', { position: 'top-left' });
  }
}
</script>

<template>
  <Sheet :open="isOpen" @update:open="$emit('update:isOpen', false)">
    <SheetContent>
      <div class="p-3 w-full">
        <SheetHeader>
          <h3 class="my-2 font-medium text-lg">Edit Employee Information</h3>
        </SheetHeader>

        <form @submit.prevent="userEditSubmit" class="flex flex-col gap-3">
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="firstname">First Name</label>
            <input
              v-model="updateform.firstname"
              class="border p-2 rounded-md"
              type="text"
              name="firstname"
              required
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="lastname">Last Name</label>
            <input
              v-model="updateform.lastname"
              class="border p-2 rounded-md"
              type="text"
              name="lastname"
              required
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="username">Username</label>
            <input
              v-model="updateform.username"
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
              v-model="updateform.email"
            />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="phoneNumber">Phone Number</label>
            <input
              class="border p-2 rounded-md"
              type="phone"
              name="phoneNumber"
              required
              v-model="updateform.phonenumber"
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="krapin">KRA Pin</label>
            <input
              class="border p-2 rounded-md"
              type="krapin"
              name="krapin"
              required
              v-model="updateform.KRAPin"
            />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="status">Role</label>
            <select
              class="border p-2 rounded-md"
              id="role"
              name="role"
              required
              v-model="updateform.role"
            >
              <option value="Admin">Admin</option>
              <option value="Project Manager">Project Manager</option>
              <option value="Engineer">Engineer</option>
            </select>
          </div>
          <Button>Apply Changes</Button>
        </form>
        <AlertDialog v-if="(row.username = !auth.username)">
          <AlertDialogTrigger>
            <Button class="mt-20" variant="destructive">
              <div class="flex gap-2">
                <PhTrash :size="22" /> Remove Employee
              </div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                employee from your database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction @click.prevent="userDelete(row.id)"
                >Continue</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SheetContent>
  </Sheet>
</template>
