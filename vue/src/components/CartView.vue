<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-bg sticky-top">
            <a class="navbar-brand navbar-title" href="#">Fake RΛZΞR store</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
        <div class="col-md-6 navbar-title">
            <table class="table table-bordered table-striped table-dark">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                </tr>
                </thead>
                <tr v-for="product in cart"
                    v-bind:item="product"
                    v-bind:key="product.name">
                    <td class="table-rows">{{product.name}}</td>
                    <td class="table-rows">{{product.price}}</td>
                    <td class="table-rows">{{product.quantity}}</td>
                    <td>
                        <button class="navbar-bg" v-on:click="addProduct(product)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </button>
                        <button class="navbar-bg" v-on:click="deleteProduct(product)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 class="bi bi-dash" viewBox="0 0 16 16">
                                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                            </svg>
                        </button>
                        <button class="navbar-bg" v-on:click="removeProduct(product)">
                            Remove
                        </button>
                    </td>
                    <th :value="(product.price * product.quantity) || 0" type="text"/>
                </tr>
                <tr>
                    <th>Summary</th>
                    <th>{{total()}}</th>
                </tr>
            </table>
        </div>
        <p>Contact details:</p>
        <div class="row contact-data">
            <div class="col-xs-6">
                <FormulateInput
                        type="text"
                        name="user name"
                        placeholder="Name"
                        validation="required"
                        v-model="userName"
                />
            </div>
        </div>
        <div class="row contact-data">
            <div class="col-xs-6">
                <FormulateInput
                        type="text"
                        name="mail"
                        placeholder="E-Mail"
                        validation="required"
                        v-model="mail"
                />
            </div>
        </div>
        <div class="row contact-data">
            <div class="col-xs-6">
                <FormulateInput
                        type="text"
                        name="phone number"
                        placeholder="Phone number"
                        validation="required|number"
                        v-model="phoneNumber"
                />
            </div>
        </div>
        <button class="order-button" v-on:click="orderProducts()">
            Order
        </button>
        <div v-if="alert" class="alert alert-success order-alert" role="alert">
            Order has been placed!
        </div>
        <div class="row contact-data">
            <div class="col-xs-6">
                <a href="/" class="back-button">
                    Back
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "app-cart",
        data() {
            return {
                cart: [],
                error: '',
                userName: undefined,
                mail: undefined,
                phoneNumber: undefined,
                order: {},
                lastOrder: {},
                alert: false,
                summary: undefined,
                validation: {}
            };
        },
        created() {
            try {
                http.get('/carts').then(response => {
                    this.cart = response.data
                });
                http.delete('/carts').then(response => {
                    console.log(response)
                });
            } catch (err) {
                this.error = err.message;
            }
            for (const product of this.cart) {
                this.summary += product.price * product.quantity;
            }

        },
        methods: {
            addProduct(product) {
                product.price += (product.price / product.quantity);
                product.quantity++;
            },
            deleteProduct(product) {
                product.price -= (product.price / product.quantity);
                product.quantity--;
                if (product.quantity < 0) {
                    this.removeProduct(product);
                }
            },
            removeProduct(product) {
                this.cart.pop(product);
            },
            async orderProducts() {
                try {
                    if (this.validation !== "" || Object.keys(this.validation).length !== 0) {
                        const userName = JSON.stringify(this.userName).replace(/['"]+/g, '');
                        const mail = JSON.stringify(this.mail).replace(/['"]+/g, '');
                        const phoneNumber = JSON.stringify(this.phoneNumber).replace(/['"]+/g, '');

                        await http.post('/orders', {
                            approvalDate: new Date().toISOString().split('T')[0],
                            orderStatusId: JSON.stringify(2),
                            userName: userName,
                            userMail: mail,
                            userPhoneNumber: phoneNumber
                        });

                        await http.get('/last-order').then(response => {
                            this.lastOrder = response.data
                        });

                        for (const orderedProduct of this.cart) {
                            await http.post('/order-list', {
                                orderId: JSON.stringify(this.lastOrder[0].id),
                                productId: JSON.stringify(orderedProduct.productId),
                                quantity: JSON.stringify(orderedProduct.quantity)
                            });
                        }
                            this.alert = true;
                            this.cart = [];

                    }
                } catch (err) {
                    this.error = err.message;
                    console.log(err)
                }

            },

            total() {

                let total = [];
// eslint-disable-next-line
                Object.entries(this.cart).forEach(([key, val]) => {
                    total.push(val.price);
                });

                return total.reduce(function (total, num) {
                    return total + num
                }, 0);

            }
        },

    };
</script>


<style scoped>
    .navbar-bg {
        background-color: #444444;
    }


    .navbar-title {
        color: #00ff00;
        margin-left: 500px;
    }


    .table-rows {
        margin-left: 100px;
    }

    .contact-data {
        margin-left: 860px;
        margin-bottom: 20px;
    }

    .order-button {
        color: #00ff00;
        background-color: #444444;
        width: 120px;
        height: 30px;
        border-radius: 4px;
    }

    .order-alert {
        margin-top: 50px;
    }

    .back-button {
        margin-left: 400px;
        background-color: #444444;
        color: white;
        border-radius: 4px;
    }


</style>

