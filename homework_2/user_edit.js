const userForm = {
    template: '#userform',
    props: {
        user_id: {
            //type: number,
            required: true,
            default: function () {
                return 1
            }
        }
    },
    data: function () {
        return {
            user_data: {
                name: '',
                username: '',
                phone: ''
            }
        }
    },
    methods: {
        saveChanges: function (id, userdata) {
            this.$emit('save', id, userdata)
        }
    }
};

// ########################################

const app = new Vue({
    el: '#app',
    components: {
        'user-form': userForm
    },
    data: function() {
        return {
            condition: true,
            users: [],
            user_id: 1,
            loading: true
        }
    },
    mounted: function () {
        this.loadUsers();
    },
    methods: {
        removeFromUsers: function (id) {
            this.users = this.users.filter(
                function(item) {
                    return item.id !== id
                }
            )
        },
        listIsChanged: function (oldValue, newValue) {
            console.log('User-list was changes');
        },
        getUsersCount: function () {
            return this.users.length;
        },
        toggleUsersList: function () {
            this.condition = !this.condition;
        },
        loadUsers: function () {
            axios.get('http://jsonplaceholder.typicode.com/users')
                .then( (response) => {
                    this.users = response.data;
                    console.log('список пользователей загружен');
                })
                .catch( error => console.error(error) )
                .finally( () => this.loading = false )
        },
        saveUser: function (id, userdata) {
            let curr_user_index = this.users.findIndex(x => x.id === id);
            this.users[curr_user_index].name = (userdata.name)
                ? userdata.name
                : this.users[curr_user_index].name;
            this.users[curr_user_index].username = (userdata.username)
                ? userdata.username
                : this.users[curr_user_index].username;
            this.users[curr_user_index].phone = (userdata.phone)
                ? userdata.phone
                : this.users[curr_user_index].phone;
            // console.log('метод saveUser запущен, индекс юзера: ' + curr_user_index);
        }
    }

});