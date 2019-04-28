<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">
                Новый пользователь {{ title }}
            </h3>
        </div>
        <div class="card-body">
            <user-form v-model="user">
                <div slot="control-buttons">
                    <button
                        type="button"
                        class="btn btn-sm btn-success"
                        v-on:click="addUser">
                        Создать пользователя
                    </button>
                </div>
            </user-form>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    import UserForm from '@/components/UserForm.vue';

    const defaultUser = {
        id: null,
        firstName: '',
        secondName: '',
        picture: "http://placehold.it/92x92",
        age: 0,
        email: '',
        phone: '',
        address: '',
        about: '',
        registered: '',
        isActive: false
    };

    export default {
        name: 'AddUserPage',
        components: {
            'user-form': UserForm
        },
        data: () => ({
            user: null,
            restUrl: 'http://localhost:3000/list/',
            parentUrl: '/users'
        }),
        computed: {
            title() {
                return `${this.user.firstName} ${this.user.secondName}`
            }
        },
        created() {
            this.user = Object.assign({}, defaultUser)
        },
        methods: {
            addUser() {
                axios
                    .post(this.restUrl, this.user)
                    .then( () => {
                        this.$router.push({ path: this.parentUrl })
                    })
            }
        }
    }

</script>
