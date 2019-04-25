<template>
  <nav>
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: page === 1 }">
        <a class="page-link" href="#" tabindex="-1" @click.prevent="prevPage"> Previous</a>
      </li>

      <li
        v-for="item in pageCount"
        :key="item"
        class="page-item"
        :class="{ active: page === item }"
      >
        <a class="page-link" href="#" @click.prevent="selectPage(item)">{{ item }}</a>
      </li>

      <li class="page-item" :class="{ disabled: page === pageCount }">
        <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'RowsPagination',
  model: {
    prop: 'page'
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  computed: {
    // Количество вычисленных страниц
    pageCount() {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    selectPage: function(page) {
      this.$emit('input', page)
    },
    prevPage: function() {
      const num = this.page - 1
      if (num > 0) {
        this.selectPage(num)
      }
    },
    nextPage: function() {
      const num = this.page + 1
      if (num <= this.pageCount) {
        this.selectPage(num)
      }
    }
  }
}
</script>
