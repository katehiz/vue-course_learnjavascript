// определяем глобально директиву 'v-tooltip'
Vue.directive('tooltip', {
    inserted: function (el) {
        el.setAttribute('title', 'Нажмите на кнопку, чтобы увиеть список пользователей');
    }
});

// определяем глобально v-filter 'capitalize'
Vue.filter('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    return value.toUpperCase();
});


const userList = {
    template: '#table',
    props: {
        list: {
            type: Array,
            required: true
        }
    },
    /*data: function () {
        return {
            list: []
        }
    },*/
    methods: {
        removeFromList: function (id) {
            this.$emit('remove', id)
        }
    }
};

const app = new Vue({
    el: '#app',
    components: {
        'user-list': userList
    },
    data: function() {
        return {
            condition: true,
            users: [],
            loading: true

        }
    },
    // вычисляемые значения. Переменные которые зависят от значения других локальных параметров
    computed: {
        buttonText: function () {
            return this.condition ? 'Hide list' : 'Show list';
        }
    },
    // НАБЛЮДАТЕЛЬ. Реагирует на изменение указанных переменных
    watch: {
        //condition: 'conditionChanged',
        users: {
            immediate: false,
            deep: true,
            handler: 'listIsChanged'
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
        /*copyToBuffer: function (index) {
            let user = this.users[index];
            alert( [user.lastname, user.firstname, user.fathername].join(' ') );
        },*/
        loadUsers: function () {
            axios.get('http://jsonplaceholder.typicode.com/users')
                .then( (response) => {
                    this.users = response.data;
                    console.log('список пользователей загружен');
                })
                .catch( error => console.error(error) )
                .finally( () => this.loading = false )
        }
    }

});