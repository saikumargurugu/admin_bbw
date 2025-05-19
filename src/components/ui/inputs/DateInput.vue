<template>
    <div class="date-picker-wrapper">
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ props }">
          <v-text-field
            v-bind="props"
            :model-value="formattedDate"
            label="Pick a date"
            readonly
            variant="outlined"
            density="comfortable"
            class="input-field"
            color="primary"
            base-color="primary"
            hide-details
          />
        </template>
        <v-date-picker
          v-model="internalDate"
          @change="onDateSelected"
          color="primary"
          class="date-picker"
          show-adjacent-months
        />
      </v-menu>
    </div>
  </template>
  
  <script>
  export default {
    name: "DatePickerInput",
    props: {
      modelValue: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        menu: false,
        internalDate: this.modelValue || new Date().toISOString().split("T")[0],
      };
    },
    watch: {
      modelValue(newVal) {
        this.internalDate = newVal;
      },
    },
    computed: {
      formattedDate() {
        if (!this.internalDate) return "";
        const date = new Date(this.internalDate);
        return isNaN(date.getTime())
          ? this.internalDate
          : date.toLocaleDateString();
      },
    },
    methods: {
      onDateSelected(value) {
        this.menu = false;
        this.internalDate = value;
        this.$emit("update:modelValue", value);
      },
    },
  };
  </script>
  
  <style scoped>
  .date-picker-wrapper {
    width: 100%;
    margin-bottom: 1.5rem;
  }
  
  .input-field {
    width: 100%;
    background-color: rgb(0, 0, 0);
    border-radius: 8px;
  }
  
  .input-field input {
    color: black !important; /* force visible text */
    caret-color: black !important;
    /* background-color: white !important; */
  }
  
  .date-picker {
    padding: 1rem;
    border-radius: 8px;
  }
  </style>
  