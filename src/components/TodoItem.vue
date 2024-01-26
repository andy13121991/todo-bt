<template>

    <!-- Wrapper for each todo item -->
    <li :id="todo.id" class="todo-item-wrapper" :class="{ done: isDone }" :style="{ 'zIndex': zIndex }">

        <!-- Container for todo item details -->
        <div class="todo-item" :id="todo.id">

            <!-- Todo item title -->
            <h2 class="todo-title"> {{ todo.item.title }} </h2>

            <!-- Todo item text -->
            <article class="todo-text"> {{ todo.item.text }} </article>

            <!-- Todo item date and time with formated date from moment.js -->
            <p class="todo-date"> 
                {{ todo.item.date | moment }} 
                <span> &nbsp; / &nbsp; </span> 
                {{ todo.item.time }} 
            </p>
        </div>

        <!-- Edit button component -->
        <EditButton 
        :id="index" 
        :isDone="isDone" 
        @updateIsDone="addDone" 
        @openedEdit="activeSend" 
        @deleteItem="deleteSend(index)"/>
    </li>
</template>

<script>

// Import moment library and EditButton component
import moment from 'moment';
import EditButton from '../components/EditButton.vue';

export default {

    // Define component props
    props: {
        title: {
            type: String,
        },
        text: {
            type: String,
        },
        date: {
            type: String,
        },
        time: {
            type: String,
        },
        todo: {
            type: Object,
        },
        index: {
            type: Number,
        },
        filteredTodos: {
            type: Object,
        },
        value: {
            type: Boolean,
            default: false,
        },
    },

    // Define component data properties
    data() {
        return {
            isDone: this.value,
            item: [],
            routeName: null,
            isActive: false,
            localIsZ: false,
            idBtn: 0,
        };
    },

    // Define custom filter for formatting date using moment.js
    filters: {
        moment: function (date) {
            return moment(date).format('D.MM.YYYY');
        }
    },
    methods: {

        // Emit event to delete the todo item
        deleteSend(index) {
            this.$emit('deleteSend', index);
        },

        // Update the isDone property and emit event
        addDone(isDone) {
            this.isDone = isDone;
            this.$emit('input', isDone);
        },

        // Emit event to notify parent component about the edit button status
        activeSend(isActive, index) {
            this.isActive = isActive;
            this.idBtn = index;
            this.localIsZ = this.isActive && this.idBtn == this.index;
        }
    },

    // Register EditButton component
    components: {
        EditButton,
    },
    computed: {

        // Get the current route name
        currentRouteName() {
            return this.routeName;
        },

        // Compute the z-index based on localIsZ
        zIndex() {
            return this.localIsZ ? 2 : 1;
        },
    },
}
</script>

<style lang="scss">

/* Import font and variable styles */
@import '../assets/fonts.scss';
@import '../assets/variables.scss';


/* Styles for the todo item wrapper */
.todo-item-wrapper {
    display: flex;
    width: 90%;
}

/* Styles for the todo item container */
.todo-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #efefef;
    border-radius: 11px;
    box-shadow: 1px 4px 4px 1px $sandShadow;
    margin: 0.5em 0.2em;

    /* Hover effect on todo item */
    &:hover {
        transform: scale(1.05);
        transition: .25s ease;
    }
}

/* Styles for the todo item title */
.todo-title {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: $sand;
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
    padding: 0.2em;
    word-break: break-all;
}

/* Styles for the todo item text */
.todo-text {
    display: flex;
    justify-content: flex-start;
    padding: 0em 0.5em 0em 1em;
    word-break: break-all;
}

/* Styles for the todo item date */
.todo-date {
    display: flex;
    justify-content: flex-end;
    padding: 0em 0.5em 1em 1em;
    margin-bottom: 0em !important;
}

/* Styles for the completed todo items */
.done {
    opacity: 0.8;
}

/* Styles for the strike-through effect on completed items */
.done > .todo-item > .todo-title,
.done > .todo-item > .todo-text,
.done > .todo-item > .todo-date {
    text-decoration: line-through;
}

/* Media query for small screens */
@media screen and (max-width: 500px) {
    .todo-title,
    .todo-text {
        font-size: 1em;
    }

    .todo-date,
    .todo-time {
        font-size: 0.9em;
    }
}

</style>

