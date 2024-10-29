<script setup>
import { PhPlus } from '@phosphor-icons/vue';
import { Button } from '../ui/button';
import CreateCustomerSheet from './CreateCustomerSheet.vue';
import { ref } from 'vue';

const emit = defineEmits(['customerCreated']);

function childEmiter() {
  emit('customerCreated');
}

const isOpen = ref(false);

function openSheet() {
  isOpen.value = true;
}
</script>
<template>
  <div class="p-3">
    <div class="flex justify-between">
      <h1 class="text-3xl">Customers</h1>
      <div>
        <Button @click="openSheet" class="bg-[#4D4AEA]">
          <div class="flex gap-3 place-items-center">
            <PhPlus :size="20" />
            Add Customer
          </div>
        </Button>
        <CreateCustomerSheet
          :isOpen="isOpen"
          @customer-created="childEmiter"
          @update:isOpen="isOpen = $event"
        />
      </div>
    </div>
    <div></div>
  </div>
</template>
