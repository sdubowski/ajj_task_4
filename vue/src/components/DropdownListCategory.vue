<template>
    <div class="dropdown">
        <input v-if="Object.keys(selectedItem).length === 0" ref="dropdowninput" v-model.trim="inputValue" class="dropdown-input" type="text" placeholder="Select category" />
        <div v-else @click="resetSelection" class="dropdown-selected">
            {{ selectedItem.name }}
        </div>
        <div v-show="inputValue" class="dropdown-list">
            <div @click="selectItem(item)" v-show="itemVisible(item)" v-for="item in itemList" :key="item.name" class="dropdown-item">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";
    export default {
        data () {
            return {
                selectedItem: {},
                inputValue: '',
                itemList: [],
                error: ''

            }
        },
        mounted () {
            this.getList()
        },
        methods: {
            resetSelection () {
                this.selectedItem = {};
                this.$nextTick( () => this.$refs.dropdowninput.focus() );
                this.$emit('on-item-reset')
            },
            selectItem (theItem) {
                this.selectedItem = theItem;
                this.inputValue = '';
                this.$emit('on-item-selected', theItem)
            },
            itemVisible (item) {
                let currentName = item.name.toLowerCase();
                let currentInput = this.inputValue.toLowerCase();
                return currentName.includes(currentInput)
            },
            getList () {
                try {
                    http.get('/category').then(response => {
                        this.itemList = response.data
                    });
                } catch (err) {
                    this.error = err.message;
                }
            }
        }
    }
</script>

<style>
    .dropdown{
        width: 230px;
        margin-left: 300px;
        margin-top: 20px;
        margin-bottom: 15px;
        z-index:1000;
    }
    .dropdown-input, .dropdown-selected{
        width: 230px;
        padding: 10px 16px;
        border: 1px solid transparent;
        background: lightgray;
        line-height: 1.5em;
        outline: none;
        border-radius: 8px;
    }
    .dropdown-input:focus, .dropdown-selected:hover{
        background: lightgray;
        border-color: #e2e8f0;
    }
    .dropdown-input::placeholder{
        opacity: 0.7;
        color: dimgrey;

    }
    .dropdown-selected{
        font-weight: bold;
        cursor: pointer;

    }
    .dropdown-list{
        width: 100%;
        max-height: 500px;
        margin-top: 4px;
        overflow-y: auto;
        background: #ffffff;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        z-index:1000;
        position: absolute;

    }
    .dropdown-item{
        display: flex;
        width: 100%;
        padding: 11px 16px;
        cursor: pointer;
        z-index:9999;
    }
    .dropdown-item:hover{
        background: #edf2f7;
        z-index:9999;
    }
</style>
