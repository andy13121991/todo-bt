//create store for storing datas
import Vue from 'vue';
import Vuex from 'vuex';

// Use vuex
Vue.use(Vuex);

// Create and export a new Vuex store instance
export default new Vuex.Store({

  // Default values for the application state
  state: {
    filterValue: 'all',
    isActive: false,
  },

  // Mutations are functions that directly modify the state
  mutations: {

    // Set a new value for filterValue
    setFilterValue(state, filterValue) {
      state.filterValue = filterValue;
    },

    // Set a new value for isActive
    setIsActive(state, isActive) {
      state.isActive = isActive;
    },
  },

  // Actions are functions that commit mutations, useful for asynchronous operations
  actions: {

    // Action to update filterValue
    updateFilterValue({ commit }, filterValue) {
      commit('setFilterValue', filterValue);
    },

    // Action to update isActive
    updateIsActive({ commit }, isActive) {
      commit('setIsActive', isActive);
    },
  },

  // Getters are used to retrieve values from the state
  getters: {

    // Getter for retrieving filterValue
    getFilterValue: state => state.filterValue,

    // Getter for retrieving isActive
    getIsActive: state => state.isActive,
  },
});
