<template>
  <div class="container">
      <user-list :url="url"></user-list>
  </div>
</template>

<script>

import UserList from '@/components/UserList.vue'

export default {
  name: 'UsersListPage',
  components: {
    'user-list': UserList
  },

  data: () => ({
    url: 'http://localhost:3000/list'
  })
}
</script>
