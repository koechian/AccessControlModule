<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { ref, watch } from 'vue';

// Add props to accept a modelValue
const props = defineProps<{
  modelValue?: DateValue;
}>();

// Add emits for v-model support
const emit = defineEmits<{
  'update:modelValue': [value: DateValue | undefined];
}>();

const df = new DateFormatter('en-US', {
  dateStyle: 'long',
});

// Use the prop value as initial value
const value = ref<DateValue | undefined>(props.modelValue);

// Watch for changes and emit them
watch(value, (newValue: any) => {
  emit('update:modelValue', newValue);
});

// Watch for prop changes
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== value.value) {
      value.value = newValue;
    }
  },
);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-[280px] justify-start text-left font-normal',
            !value && 'text-muted-foreground',
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{
          value ? df.format(value.toDate(getLocalTimeZone())) : 'Pick a date'
        }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>
