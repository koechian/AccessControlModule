<script setup>
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import Button from '../ui/button/Button.vue';
import { ref, watchEffect } from 'vue';
import { toast } from 'vue-sonner';
import axios from 'axios';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:isOpen', 'userCreated']);
const auth = JSON.parse(sessionStorage.getItem('auth'));

const submitForm = ref({
  name: '',
  email: '',
  phone: '',
  companyName: '',
  address: '',
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
    name: '',
    email: '',
    phone: '',
    companyName: '',
    address: '',
  };
}

async function createCustomerSubmit() {
  try {
    // Create form data object with only valid values
    const customerData = {};
    for (const [key, value] of Object.entries(submitForm.value)) {
      if (value !== '' && value !== null && value !== undefined) {
        customerData[key] = submitForm.value[key];
      }
    }

    const response = await axios.post(
      `http://localhost:3000/customers/createCustomer`,
      { ...customerData },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );

    if (response.status === 201) {
      toast.success('A customer has been added to the system', {
        position: 'top-left',
      });
      emits('customerCreated');

      // Reset form after successful submission
      resetForm();

      // Close the sheet after wards
      emits('update:isOpen', false);
    }
  } catch (error) {
    console.error(error);
    toast.error('Error adding Customer', { position: 'top-left' });
  }
}
</script>
<template>
  <Sheet :open="isOpen" @update:open="$emit('update:isOpen', false)">
    <SheetContent>
      <div class="p-3 w-full">
        <SheetHeader class="my-2">
          <h3 class="font-medium text-lg">Add a new Customer</h3>
        </SheetHeader>

        <form
          @submit.prevent="createCustomerSubmit"
          class="flex flex-col gap-3"
        >
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="firstname">Name</label>
            <input
              v-model="submitForm.name"
              class="border p-2 rounded-md"
              type="text"
              name="firstname"
              required
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="email">Email</label>
            <input
              v-model="submitForm.email"
              class="border p-2 rounded-md"
              type="email"
              name="email"
              required
            />
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="username">Company Name</label>
            <input
              v-model="submitForm.companyName"
              class="border p-2 rounded-md"
              type="text"
              name="companyName"
              required
            />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="email">Phone Number</label>
            <input
              class="border p-2 rounded-md"
              type="text"
              required
              name="text"
              v-model="submitForm.phone"
            />
          </div>

          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="email">Address</label>
            <input
              class="border p-2 rounded-md"
              type="text"
              required
              name="text"
              v-model="submitForm.address"
            />
          </div>
          <Button type="submit">Add Customer</Button>
        </form>
      </div>
    </SheetContent>
  </Sheet>
</template>
