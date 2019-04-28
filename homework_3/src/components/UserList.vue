<!--=====================================-->
<!--== КОМПОНЕНТ ТАБЛИЦЫ ПОЛЬЗОВАТЕЛЕЙ ==-->
<!--=====================================-->

<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title float-left">Список пользователей: {{ rowsCount }}</h5>
        <button class="btn btn-sm btn-warning float-right" @click="goToAddUserPage">Add New User</button>
      <button type="button" class="btn btn-sm btn-info float-right mr-2" @click="loadUsers">
        Refresh Userlist
        {{ loading ? '...' : '' }}
      </button>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <p>Выберите кол-во элементов для показа на странице</p>
            <rows-selector
                v-model.number="rowsPerPage"
                :page-count="rowsPerPage">
            </rows-selector>
          </div>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Email</th>
            <th>Телефон</th>
            <th>Зарегистрирован</th>
            <th>Активен</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredRows" :key="item.id">
            <td>
              <router-link :to="`/edit/${item.id}`">№ {{ item.id }}</router-link>
            </td>
            <td>{{ item.firstName }}</td>
            <td>{{ item.secondName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.registered }}</td>
            <td>{{ item.isActive ? 'ДА' : 'НЕТ' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="card-footer">
      <rows-pagination v-model.number="selectedPage" :per-page="rowsPerPage" :total="rowsCount">
      </rows-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import rowsSelector from '@/components/table-nav/rowsPerPage.vue'
import rowsPagination from '@/components/table-nav/rowsPagination.vue'

export default {
    name: 'UsersList',
    components: {
        rowsSelector,
        rowsPagination
    },
    props: {
        url: {
            type: String,
            required: true
        }
    },
    data: function() {
        return {
            // список пользователей для таблицы
            users: [],
            rowsPerPage: 5,
            selectedPage: 1,
            loading: true
        }
    },
    computed: {
        rowsCount: function() {
            return this.users.length
        },
        filteredRows: function() {
            return this.users.filter((item, index) => {
                const startIndex = (this.selectedPage - 1) * this.rowsPerPage
                const finalIndex = startIndex + this.rowsPerPage
                return startIndex <= index && index < finalIndex
            })
        }
    },
    watch: {
        rowsPerPage: function() {
            this.selectedPage = 1
        },
        users: function () {
            this.setDefaultParams()
        }
    },
    mounted: function() {
        this.loadUsers()
    },
    methods: {
        setDefaultParams: function () {
            this.rowsPerPage = 5;
            this.selectedPage = 1
        },
        loadUsers: function() {
            this.loading = true;
            axios
                .get( this.url )
                .then(response => {
                    this.users = response.data
                })
                .catch( error => console.error(error) )
                .finally( () => this.loading = false );
        },
        goToAddUserPage: function () {
            this.$router.push({path: '/add'})
        }
    }
}
</script>
