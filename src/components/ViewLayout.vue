<template>

  <!-- Main content area -->
    <main class="appMain">

      <!-- Include AddTodo component and listen for the 'addtodo' event -->
      <Addtodo @addtodo="addTodo"/>

      <!-- Todo list with transition animations -->
      <ul class="todo-list">

        <!-- Apply transition-group for smooth animations -->
        <transition-group name="bounce" :key="todo.id">

          <!-- Render TodoItem component for each todo in filteredTodos array -->
          <TodoItem v-for="(todo, index) in filteredTodos"
          :key="todo.id"
          :index="index"
          :todo="todo"
          v-model="todo.isDone"
          @deleteSend="deleteMethod(index)"/>
        </transition-group>
      </ul>
    </main>
</template>

<script>

// Import store getters
import { mapGetters } from 'vuex';

// Import components
import Addtodo from '../components/AddTodo.vue'
import TodoItem from '../components/TodoItem.vue'

export default {

  // Define emitted events for the child components
  emits: {
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
  },

  // Define data
  data() {
    return {
      route: '',
      isDone: false,
      item: [],
      todo: [],
      index: 0,
      id: 0,
    }
  },
  methods: {

    // Method to delete a todo at the specified index
    deleteMethod(index) {
      this.item.splice(index, 1);
    },

    // Method to generate a unique ID for todos, prepaired for future with real app
    generateUniqueId() {
      return this.id++;
    },

    // Method to add a new todo
    addTodo(todo) {
      const newTodo = { ...todo ,isDone : false, id: this.generateUniqueId() };
      this.item.push(newTodo);
    },
  },

  // Register AddTodo and TodoItem components
  components: {
    Addtodo,
    TodoItem,
  },
  computed: {
    ...mapGetters(['getFilterValue']),

    // Computed property for filtered todos based on route and status
    filteredTodos() {
      const routeName = this.$route.name;
      const filterValue = this.getFilterValue;

      return this.item.filter((todo) => {

        // Filter by routeName
        const listMatch = todo.item.route == routeName;

        // Filter by status (all, done, undone)
        if (filterValue == 'done')
        {
          return todo.isDone;
        }

        else if (filterValue == 'undone')
        {
          return !todo.isDone;
        }

        else
        {
          return listMatch;
        }
      });
    },
  },
}
</script>

<style>

/* Styles for the main content area */
.appMain {
  grid-area: main;
  margin-top: 2em;
  width: 100%;
}

/* Styles for the todo list */
.todo-list {
    width: 100%;
    list-style: none;
}

/* Animation styles for the todo items */
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>