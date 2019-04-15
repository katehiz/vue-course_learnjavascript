const userForm = {
    template: '#userform',
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    data: function () {
        return {}
    },
    methods: {
        removeFromList: function (id) {
            this.$emit('remove', id)
        }
    }
}

const app = new Vue({
    el: '#app',
    components: {
        'user-form': userForm
    },
    data: function() {
        return {
            condition: true,
            users: [],
            counter: 5
        }
    },
    // вычисляемые значения. Переменные которые зависят от значения других локальных параметров
    computed: {},
    // НАБЛЮДАТЕЛЬ. Реагирует на изменение указанных переменных
    watch: {},
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
        copyToBuffer: function (index) {
            let user = this.users[index];
            alert( [user.lastname, user.firstname, user.fathername].join(' ') );
        },
        loadUsers: function () {
            axios.get('http://jsonplaceholder.typicode.com/users')
                .then( (response) => this.users = response.data
                    .then(console.log('список пользователей загружен'))
                    .catch(console.error('не удалось загрузить список'))
        }
    }

});