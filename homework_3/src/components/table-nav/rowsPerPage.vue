<!--=======================================================-->
<!--==КОМПОНЕНТ ВЫБОРА КОЛ-ВА СТРОК ДЛЯ ПОКАЗА В ТАБЛИЦЕ ==-->
<!--=======================================================-->

<template>
  <select
    id="rowsperpage"
    class="form-control"
    name="rowsperpage"
    :value="pageCount"
    @input="checkVal($event.target.value)"
  >
    <option v-for="item in options" :key="item" :value="item">
      {{ item }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'RowsSelector',
  props: {
    pageCount: {
      type: Number,
      required: true
    },
    options: {
      type: Array,
      default: () => [5, 10, 20]
    }
  },
  methods: {
    checkVal(val) {
      this.$emit('input', val)
    }
  }
}
</script>
