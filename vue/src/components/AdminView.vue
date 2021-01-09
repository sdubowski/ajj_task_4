<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-bg sticky-top">
            <a class="navbar-brand navbar-title" href="#">Fake RΛZΞR store</a>
            <a class="admin-button" href="/">Back</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </nav>
        <div class="col-md-6 navbar-title">
            <div v-if="alert" class="alert alert-danger order-alert" role="alert">
                Invalid value!
            </div>
            <table class="table table-bordered table-striped table-dark">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Category</th>
                </tr>
                </thead>
                <tr v-for="product in products"
                    v-bind:item="product"
                    v-bind:key="product.name">
                    <td class="table-rows">{{product.name}}</td>
                    <td class="table-rows">{{product.description}}</td>
                    <td class="table-rows formulate">
                        <FormulateInput
                                type="text"
                                v-model="product.price"
                                disabled
                                id="price"
                        />
                    </td>
                    <td class="table-rows">
                        <FormulateInput
                                type="text"
                                v-model="product.weight"
                                id="weight"
                                disabled
                        />
                    </td>
                    <td class="table-rows"><FormulateInput
                            type="select"
                            v-model="product.categoryId"
                            :options="[
                                {value: '1', label: 'Keyboard'},
                                {value: '2',label: 'Mouse'},
                                {value: '4',label: 'MousePad'},
                                {value: '5', label:'Headphones'}
                            ]"
                            id="category"
                            disabled

                    /></td>
                    <td>
                        <button class="navbar-bg" v-on:click="editProperty()"> Edit</button>
                        <button class="navbar-bg" v-on:click="saveChanges(product)" id="save" disabled> Save</button>
                    </td>
                </tr>
            </table>
            <table class="table table-bordered table-striped table-dark">
                <thead>
                <tr>
                    <th>Approval date</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tr v-for="order in approvedOrders"
                    v-bind:item="order"
                    v-bind:key="order.name">
                    <td class="table-rows">{{order.approvalDate}}</td>
                    <td class="table-rows">{{getValue(order.id)}}</td>
                    <td>
                        <button class="navbar-bg" v-on:click="changeStatus(order.id, 3)">
                            Canceled
                        </button>
                        <button class="navbar-bg" v-on:click="changeStatus(order.id, 4)">
                            Completed
                        </button>
                    </td>
                </tr>
            </table>
            <div class="container">
                <div class="row">
                    <div class="col-xs-6">
                        <DropdownList @on-item-selected="dropdownSelection = $event"
                                      @on-item-reset="dropdownSelection = {}"/>
                    </div>
                </div>
            </div>
            <table class="table table-bordered table-striped table-dark">
                <thead>
                <tr>
                    <th>Approval date</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tr v-for="order in filteredList"
                    v-bind:item="order"
                    v-bind:key="order.name">
                    <td class="table-rows">{{order.approvalDate}}</td>
                    <td class="table-rows">{{getValue(order.id)}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";
    import DropdownList from "./DropdownListStatus"

    export default {
        name: "AdminView",
        data() {
            return {
                category: [],
                products: [],
                approvedOrders: [],
                orderList: [],
                allOrders: [],
                isError: false,
                dropdownSelection: {},
                saveButtonDisabled: true,
                disabled: true,
                alert: false
            };
        },
        created() {
            try {
                http.get('/category').then(response => {
                    this.category = response.data
                });
                http.get('/products').then(response => {
                    this.products = response.data
                });
                http.get('/order-list').then(response => {
                    this.orderList = response.data
                });
                http.get('/orders/status/' + 2).then(response => {
                    this.approvedOrders = response.data
                });
                http.get('/orders').then(response => {
                    this.allOrders = response.data
                });
            } catch (e) {
                this.error = e;
            }
            document.getElementById("save").disabled = true;
            document.getElementById("price").disabled = true;
            document.getElementById("weight").disabled = true;
        },
        methods: {
            getCategory(product) {
                var tmpCategoryId = product.categoryId;
                var tmpCategoryName = this.category.filter(c => c.id === tmpCategoryId);
                return tmpCategoryName[0].name;
            },
            getValue(id) {
                let tmpOrderList = this.orderList.filter(o => o.orderId === id);
                let sum = 0;
                for (const item of tmpOrderList) {
                    for (const product of this.products) {
                        if (item.productId === product.id) {
                            sum += product.price * item.quantity
                        }
                    }
                }
                return sum;
            },
            changeStatus(orderId, statusId) {
                http.put('/orders/' + orderId, {
                    orderStatusId: statusId
                });
                this.approvedOrders.pop(this.approvedOrders.filter(o => o.id === orderId));
            },
            editProperty() {
                this.disabled = false;
                document.getElementById("save").disabled = false;
                document.getElementById("price").disabled = false;
                document.getElementById("weight").disabled = false;
                document.getElementById("category").disabled = false;
            },
            async saveChanges(product) {
                let that = this;
                that.isError = false;
                await http.put('/products/' + product.id, {
                    price: product.price,
                    weight: product.weight,
                    categoryId: product.categoryId
                }).catch((error) => {
                    that.isError = true;
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    }
                });
                if (!that.isError) {
                    document.getElementById("save").disabled = true;
                    document.getElementById("price").disabled = true;
                    document.getElementById("weight").disabled = true;
                    document.getElementById("category").disabled = true;
                    this.alert = false
                } else {
                    this.alert = true;
                }

            }
        },
        computed: {
            filteredList: function () {
                let dropdown = this.dropdownSelection;
                if (Object.keys(dropdown).length !== 0) {
                    return this.allOrders.filter((order) =>
                        order.orderStatusId === dropdown.id
                    );
                } else {
                    return this.allOrders;
                }
            }
        },
        components: {
            DropdownList,
        }
    }
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
        margin-left: 200px;
    }


    .admin-button {
        color: #00ff00;
        margin-left: 700px;
    }

    .formulate {
        width: 15px;
    }

</style>
