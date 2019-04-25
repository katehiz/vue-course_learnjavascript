<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">Редактирование пользователя <span class="text-success">{{ title }}</span></h2>
            </div>
        </div>
        <div class="card-body">
            <user-form v-model="user">
                <div slot="control-buttons">
                    <button type="button" class="btn btn-sm btn-success" v-on:click="saveUser">Сохранить изменения</button>
                    <button type="button" class="btn btn-sm btn-danger" v-on:click="removeUser">Удалить пользователя</button>
                </div>
            </user-form>
            <!--<user-form :user="user" @input="user = $event.target.value"></user-form>-->
            <!--$event.target.value -> vue.component.scopeUser-->
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import UserForm from '@/components/UserForm.vue'

export default {
    name: 'UsersListPage',
    components: {
        'user-form': UserForm
    },
    data: function() {
        return {
            user: {},
            restUrl: 'http://localhost:3000/list/'
        }
    },
    computed: {
        id() {
          return Number(this.$route.params.id)
          //let params = this.$route.params
          //return params.slice( params.lastIndexOf('/') + 1 )
        },
        url() {
            return `${this.restUrl}${this.id}`
        },
        title() {
            return !this.user.firstName || !this.user.secondName
                ? 'Неизвестный'
                : [this.user.firstName, this.user.secondName].join(' ')
        },
        confirmMessage() {
            return `Пользователь ${this.title} будет безвозвратно удален. Вы уверены?`
        }
    },
    watch: {
        // Обновление данных при изменениях маршрута
        // или можно через хук beforeRouteUpdate
        $route: 'loadData'
    },
    mounted() {
        this.loadData()
    },
    methods: {
        // Загрузка данных пользователя
        loadData() {
          axios
            .get(this.url)
            .then(response => {
              this.user = response.data
            })
              .catch( (error) => console.error(error) )
              .then(console.log('%c Success ',
                  'color: white; background-color: #2274A5',
                  'User is loaded'))
        },
        saveUser() {
            axios
                .patch(this.url, this.user)
                .then( () => {
                this.$router.push({ path: '/users' })
            })
        },
        removeUser() {
            if ( confirm(this.confirmMessage) )  {
                axios
                    .delete(this.url, this.user)
                    .then( () => {
                        this.$router.push({ path: '/users' })
                    })
            }
        }
    }
}
</script>
