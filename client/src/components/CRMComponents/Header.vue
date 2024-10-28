<script setup>
import { PhPlus } from '@phosphor-icons/vue';
import { Button } from '../ui/button';
</script>
<template>
  <div class="p-3">
    <div class="flex justify-between">
      <h1 class="text-3xl">Customers</h1>
      <div>
        <Button class="bg-[#4D4AEA]">
          <div class="flex gap-3 place-items-center">
            <PhPlus :size="20" />
            Add Customer
          </div>
        </Button>
      </div>
    </div>
    <div></div>
  </div>
</template>
