<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h2 class="card-title">
                    Редактирование пользователя
                    <span class="text-success">{{ title }}</span>
                    {{ loading }}
                </h2>
            </div>
        </div>
        <div class="card-body">
            <user-form v-model="user">
                <div slot="control-buttons">
                    <button type="button" class="btn btn-sm btn-success" v-on:click="saveUser">Сохранить изменения</button>
                    <button type="button" class="btn btn-sm btn-danger" v-on:click="removeUser">Удалить пользователя</button>
                </div>
            </user-form>
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
            restUrl: 'http://localhost:3000/list/',
            parentUrl: '/users'
        }
    },
    computed: {
        id() {
          return Number(this.$route.params.id)
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
        },
        loading() {
            return (this.scopeUser === null) ? 'Загрузка ...' : ''
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
                    this.user = response.data;
                    console.log('%c Success ',
                    'color: white; background-color: #2274A5',
                    'User is loaded')
                })
                .catch( (error) => console.error(error) )
        },
        saveUser() {
            axios
                .patch(this.url, this.user)
                .then( () => {
                    this.$router.push({ path: this.parentUrl })
                })
        },
        removeUser() {
                if ( !confirm(this.confirmMessage) )  return;
            axios
                .delete(this.url, this.user)
                .then( () => {
                    this.$router.push({ path: this.parentUrl })
                })
        }
    }
}
</script>
