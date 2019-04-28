<!--===========================================================-->
<!--== КОМПОНЕНТ ФОРМЫ РЕДАКТИРОВАНИЯ/СОЗДАНИЯ ПОЛЬЗОВАТЕЛЕЙ ==-->
<!--===========================================================-->
<template>
    <form>
        <div class="form-group">
            <label for="name">Имя</label>
            <input id="name" v-model="scopeUser.firstName" type="email" class="form-control" name="name" />
            <div class="invalid-feedback">
                Please choose a username.
            </div>
        </div>
        <div class="form-group">
            <label for="surname">Фамилия</label>
            <input
                id="surname"
                v-model="scopeUser.secondName"
                type="text"
                class="form-control"
                name="surname"
            />
            <div class="invalid-feedback">
            Please choose a surname.
            </div>
        </div>
        <div class="form-group">
            <p>Аватар пользователя</p>
            <div class="row">
                <div class="col-2">
                    <img :src="scopeUser.picture" />
                </div>
                <div class="col-10">
                    <input id="picture" type="file" class="form-control-file" />
                    <div class="invalid-feedback">Example invalid custom file feedback</div>
                </div>
            </div>
        </div>
        <div class="form-group">
            <label for="age">Возраст</label>
            <input id="age" v-model.number="scopeUser.age" type="number" class="form-control" name="age" />
            <div class="invalid-feedback">
                Please choose an Age.
            </div>
        </div>
        <div class="form-group">
            <label for="email">Почта</label>
            <input id="email" v-model="scopeUser.email" type="email" class="form-control" name="email" />
            <div class="invalid-feedback">
                Please choose an email address.
            </div>
        </div>
        <div class="form-group">
            <label for="phone">Номер телефона</label>
            <input id="phone" v-model="user.phone" type="text" class="form-control" name="phone" />
            <div class="invalid-feedback">
                Please choose a phone number.
            </div>
        </div>
        <div class="form-group">
            <label for="address">Адрес</label>
            <input
                id="address"
                v-model="scopeUser.address"
                type="text"
                class="form-control"
                name="address"
            />
            <div class="invalid-feedback">
                Please choose an address.
            </div>
        </div>
        <div class="form-group">
            <label for="about">Персональная информация</label>
            <textarea id="about" v-model="scopeUser.about" class="form-control" name="about"></textarea>
        </div>
        <div class="form-group form-check">
            <input
                id="isactive"
                v-model="scopeUser.isActive"
                class="form-check-input"
                type="checkbox"
                value=""
            />
            <label class="form-check-label" for="isactive">Статус</label>
        </div>
        <div class="form-group">
            <label for="registered">Дата регистрации</label>
            <input
                id="registered"
                v-model="user.registered"
                type="date"
                class="form-control"
                name="registered"
            />
            <div class="invalid-feedback">
                Please choose a date of user registration.
            </div>
        </div>
        <code>{{ user }}</code>
        <hr>
        <slot name="control-buttons"></slot>
        <hr>
    </form>
</template>

<script>
export default {
    name: 'UserForm',
    model: {
        prop: 'user'
    },
    props: {
        user: {
            type: Object,
            required: true
        }
    },
    data: () => ({
        scopeUser: null
    }),
    watch: {
        user: {
            deep: true,
            handler() {
                if ( this.scopeUser !== this.user )
                    this.scopeUser = Object.assign({}, this.user)
            }
        },
        scopeUser: {
            deep: true,
            handler() {
                this.$emit('input', this.scopeUser)
            }
        }
    },
    created() {
        this.scopeUser = Object.assign({}, this.user)
    }
}
</script>
