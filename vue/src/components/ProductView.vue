<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-bg sticky-top">
            <a class="navbar-brand navbar-title" href="#">Fake RΛZΞR store</a>
            <a class="admin-button" href="/admin">Admin panel</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>

        <div class="container">
            <div class="row">
                <div class="col-xs-6">
                    <DropdownList @on-item-selected="dropdownSelection = $event"
                                  @on-item-reset="dropdownSelection = {}"/>
                </div>
                <div class="col-xs-6">
                    <label>
                        <input class="search-filter" type="text" v-model="search" placeholder="Search item.."/>
                    </label>
                </div>
                <div class="col-xs-6">
                    <a href="/cart" class="a-color" v-on:click="updateCart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
                             class="bi bi-cart4 cart" viewBox="0 0 16 16">
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                        </svg>
                    </a>
                </div>
            </div>
        </div>

        <div class="col-md-6 navbar-title">
            <table class="table table-bordered table-striped table-dark">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                </tr>
                <tr v-for="product in filteredList"
                    v-bind:item="product"
                    v-bind:key="product.name">
                    <td class="table-rows">{{product.name}}</td>
                    <td class="table-rows">{{product.description}}</td>
                    <td class="table-rows">{{product.price}}</td>
                    <td>
                        <button class="button-cart" @click="addProductToCart(product)">Add to cart</button>
                    </td>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";
    import DropdownList from '@/components/DropdownListCategory.vue'

    export default {
        name: "product-list",
        data() {
            return {
                products: [],
                cart: [],
                error: '',
                text: '',
                search: '',
                productsToCart: [],
                dropdownSelection: {}
            };
        },
        created() {
            try {
                http.get('/products').then(response => {
                    this.products = response.data
                });
            } catch (err) {
                this.error = err.message;
            }
        },
        computed: {
            filteredList: function () {
                let search = this.search;
                let dropdown = this.dropdownSelection;
                return this.products.filter((product) => {
                    if (Object.keys(dropdown).length !== 0) {
                        return product.name.toLowerCase().match(search.toLowerCase()) && product.categoryId === dropdown.id
                    } else {
                        return product.name.toLowerCase().match(search.toLowerCase())
                    }
                });
            }
        },
        methods: {
            addProductToCart(product) {
                let tempProduct = {name: String, price: Number, quantity: Number};
                let flag = 0;
                if (this.cart.length !== 0) {
                    for (const productInCart of this.cart) {
                        if (productInCart.id === product.id) {
                            flag = 1;
                            productInCart.quantity++;
                            productInCart.price += productInCart.price
                        }
                    }
                }
                if (!flag) {
                    tempProduct.id = product.id;
                    tempProduct.name = product.name;
                    tempProduct.price = product.price;
                    tempProduct.quantity = 1;
                    this.cart.push(tempProduct);
                }
            },

            updateCart() {
                for (const product of this.cart) {
                    try {
                        const name = JSON.stringify(product.name).replace(/['"]+/g, '');
                        const price = JSON.stringify(product.price)  .replace(/['"]+/g, '');
                        const quantity = JSON.stringify(product.quantity).replace(/['"]+/g, '');
                        http.post('/carts', {
                            name: name,
                            price: price,
                            quantity: quantity,
                            productId: product.id
                        });
                    } catch
                        (err) {
                        this.error = err.message;
                    }
                }
            }
        },
        components: {
            DropdownList,
        }

    };
</script>


<style scoped>
    .background {
        height: auto;
        min-height: 100%;
    }

    .navbar-bg {
        background-color: #444444;
    }

    .button-cart {
        background-color: #444444;
        width: 100px;
        border-radius: 8px;
    }

    .navbar-title {
        color: #00ff00;
        margin-left: 500px;
    }

    .search-filter {
        margin-left: 90px;
        margin-top: 20px;
        margin-bottom: 15px;
        padding: 10px 16px;
        border: 1px solid transparent;
        line-height: 1.5em;
        outline: none;
        border-radius: 8px;
        opacity: 0.7;
    }

    .table-rows {
        margin-left: 200px;
    }

    .cart {
        margin-left: 200px;
        margin-top: 20px;
        margin-bottom: 15px;
    }

    .a-color {
        color: lightgray;
    }

    .admin-button{
        color: #00ff00;
        margin-left: 700px;
    }

</style>

