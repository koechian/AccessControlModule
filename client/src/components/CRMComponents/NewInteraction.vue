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
  leadId: {
    type: Number,
  },
});

const emits = defineEmits(['createInteraction:isOpen', 'interactionCreated']);
const auth = JSON.parse(sessionStorage.getItem('auth'));

const submitForm = ref({
  leadId: props.leadId,
  type: '',
  details: '',
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
    type: '',
    details: '',
  };
}

async function createInteractionSubmit() {
  try {
    // Create form data object with only valid values
    const interaction = {};
    for (const [key, value] of Object.entries(submitForm.value)) {
      if (value !== '' && value !== null && value !== undefined) {
        interaction[key] = submitForm.value[key];
      }
    }

    const response = await axios.post(
      `http://localhost:3000/interactions/newInteraction`,
      { ...interaction },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );

    if (response.status === 201) {
      toast.success('Interaction Logged', {
        position: 'top-left',
      });
      emits('interactionCreated');

      // Reset form after successful submission
      resetForm();

      //   // Close the sheet after wards
      emits('createInteraction:isOpen', false);
    }
  } catch (error) {
    console.error(error);
    toast.error('Error adding Customer', { position: 'top-left' });
  }
}
</script>
<template>
  <Sheet :open="isOpen" @update:open="$emit('createInteraction:isOpen', false)">
    <SheetContent>
      <div class="p-3 w-full">
        <SheetHeader class="my-2">
          <h3 class="font-medium text-lg">Log new interaction</h3>
        </SheetHeader>

        <form
          @submit.prevent="createInteractionSubmit"
          class="flex flex-col gap-3"
        >
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="firstname">Type</label>
            <select v-model="submitForm.type" class="border p-2 rounded-md">
              <option value="PHONE_CALL">Call</option>
              <option value="EMAIL">Email</option>
              <option value="WHATS_APP">Whats App</option>
              <option value="INSTAGRAM">Instagram</option>
            </select>
          </div>
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="email"
              >Interaction Details or Summary</label
            >
            <textarea
              v-model="submitForm.details"
              class="border p-2 rounded-md"
              required
            />
          </div>
          <Button type="submit">Log Interaction</Button>
        </form>
      </div>
    </SheetContent>
  </Sheet>
</template>
