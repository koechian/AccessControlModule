<script setup>
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import Button from '../ui/button/Button.vue';
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
    id: row.id,
    status: row.status,
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
  id: row.id,
  status: '',
});

const emit = defineEmits(['leadsUpdated']);

async function customerDelete(id) {
  const response = await axios.delete(
    `http://localhost:3000/users/deleteCustomer/${id}`,
    {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    },
  );

  if (response.statusText === 'OK') {
    toast.success(
      'Customer and related details have been removed from the system',
      { position: 'top-left' },
    );
    emit('leadsUpdated');
  }
}

async function leadsEditSubmit(id) {
  try {
    // Create form data object with only changed values
    const changedData = {};
    for (const [key, value] of Object.entries(updateform.value)) {
      if (value !== '' && value !== null && value !== undefined) {
        changedData[key] = updateform.value[key];
      }
    }

    const response = await axios.put(
      `http://localhost:3000/leads/updateLead`,
      { ...changedData },
      {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      },
    );

    if (response.statusText === 'OK') {
      toast.success('Lead Status Updated', {
        position: 'top-left',
      });

      emit('leadsUpdated');
    }

    // Reset form after successful submission
    updateform.value = {
      status: '',
    };
  } catch (error) {
    console.error(error);
    toast.error('Error updating Lead Status', { position: 'top-left' });
  }
}
</script>

<template>
  <Sheet :open="isOpen" @update:open="$emit('update:isOpen', false)">
    <SheetContent>
      <div class="p-3 w-full">
        <SheetHeader>
          <h3 class="my-2 font-medium text-lg">Change Lead Status</h3>
        </SheetHeader>

        <form
          @submit.prevent="leadsEditSubmit(row.id)"
          class="flex flex-col gap-3"
        >
          <div class="mt-3 flex flex-col gap-2">
            <label class="font-medium" for="status">Status</label>
            <select
              class="border p-2 rounded-md"
              id="status"
              name="status"
              v-model="updateform.status"
            >
              <option selected value="" hidden disabled>
                Update Lead Status
              </option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="CONVERTED">Converted</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>

          <Button type="submit"> Apply Changes</Button>
        </form>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button class="mt-20" variant="destructive">
              <div class="flex gap-2"><PhTrash :size="22" /> Delete Lead</div>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                cutomer as well as related leads and interactions from the
                System.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction @click.prevent="customerDelete(row.id)"
                >Continue</AlertDialogAction
              >
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </SheetContent>
  </Sheet>
</template>
