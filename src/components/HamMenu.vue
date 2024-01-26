<template>
<div class="hamNav">

    <!-- Hamburger menu Button Wrapper -->
    <div class="ham-wrapper">

        <!-- Bootstrap button component with sidebar -->
        <b-button v-b-toggle.sidebar-1 class="hamBtn">

            <!-- Hamburger menu Icon -->
            <img src="../assets/icons8-menu.svg" class="hamIcon">
        </b-button>
    </div>

    <!-- Sidebar Navigation -->
    <b-sidebar id="sidebar-1" title="Navigation" shadow>
            <ul class="navig">

                <!-- Navigation Links -->
                <li class="nav-item"><router-link to="/">My day</router-link></li>
                <li class="nav-item"><router-link to="/important">Important</router-link></li>
                <li class="nav-item"><router-link to="/planned">Planned</router-link></li>
                <li class="nav-item"><router-link to="/tasks">Tasks</router-link></li>
                <li class="nav-item"><router-link to="/shoplist">Shop List</router-link></li>
            </ul>
    </b-sidebar>

    <!-- Filter Dropdown from bootstrap dropdown components -->
    <div class="filter-wrapper">
        <b-dropdown id="filter" class="m-md-2" v-model="filterValue">

            <!-- Filter Icon -->
            <template #button-content>
                <i class="icon-wrapper">
                    <img src="../assets/filter.png" alt="filter" class="filter-icon">
                </i>
            </template>

            <!-- Filter Options -->
            <b-dropdown-item-button
                v-for="filter in filters"
                :key="filter.value"
                @click="toggleFilter(filter.value)"
                :class="{ selected: filterValue === filter.value }"
                :value="filter.value">
                {{ filter.label }}
            </b-dropdown-item-button>
        </b-dropdown>
</div>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {

    // Data properties for the filter and filter options
    data() {
        return {
            filterValue: "all",
            filters: [
                { value: "all", label: "All" },
                { value: "done", label: "Done" },
                { value: "undone", label: "Undone" },
            ],
        }
    },
    methods: {

        // Map Vuex actions
        ...mapActions(['updateFilterValue']),

        // Method to toggle the selected filter
        toggleFilter(filterStatus) {

            // Update Vuex state with the selected filter
            this.updateFilterValue(filterStatus);

            // Update the local filter value
            this.filterValue = filterStatus;
        },
    },
}
</script>

<style lang="scss">

/* imports fonts and variables */
@import '../assets/fonts.scss';
@import '../assets/variables.scss';

/* style section for bootstrap elements */
/* Close Button Styles */
.close {
    border: 1px solid $redder !important;
    background: $redder !important;
    border-radius: 25%;
    box-shadow: -1px 4px 3px 2px $sandDarker !important;

    &:hover {
        transform: scale(1.1);
        transition: .25s ease;
    }
}

/* Close Icon Styles */
.bi-x {
    width: 1.8em !important;
    height: 1.8em !important;
    fill: whitesmoke !important;
}

/* Sidebar Styles */
#sidebar-1 {
    background-color: $sand !important;
    z-index: 2;
}

/* Additional Styles for HamMenu Button */
.btn-secondary.hamBtn {
    background: transparent;
    border: none;
}

.btn-secondary.hamBtn:hover {
    transform: scale(1.1);
    transition: .25s ease;
    background: transparent;
}

/* style section for my elements */
/* Main Navigation Container */
.hamNav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 1000;
}

/* HamMenu Button Wrapper Styles */
.ham-wrapper {
    width: 30%;
    position: relative;
    top: 0.5em;
    left: 0.5em;
}

/* HamMenu Button Styles */
.hamBtn {
    margin: 1em !important;
    background-color: $sandDarker !important;
    border-radius: 15px !important;
    box-shadow: 1px 4px 4px 1px $sandShadow !important;
}

/* HamMenu Icon Styles */
.hamIcon {
    width: 40%;
}

/* Navigation List Styles */
.navig {
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Navigation Item Styles */
.nav-item {
    width: 100%;
    text-align: center;
    padding-top: 0.5em;
}

/* Router Link Styles */
a {
    font-weight: bold;
    color: $black;
    display: block !important;
    width: 100% !important;
    text-decoration: none !important;

    &.router-link-exact-active {
        color: $gold !important;
        border-top: 1px solid $sandDarker;
        border-bottom: 1px solid $sandDarker;
    }

    &:visited {
        color: $black;
    }

    &:hover {
        color: $cream;
        background: $sandDarker;
    }
}

/* style section for bootstrap elements */
/* Filter Dropdown Wrapper Styles */
.filter-wrapper {
    margin-right: 2em;
}

/* Filter Dropdown Styles */
#filter {
    margin: 1em !important;
}

/* Filter Toggle Button Styles */
#filter__BV_toggle_ {
    padding-inline-start: 0 !important;
    padding-inline-end: 0 !important;
    background-color: $sandDarker !important;
    border-radius: 15px !important;
    border-color: $sandDarker !important;
    box-shadow: 1px 4px 4px 1px $sandShadow !important;
}

/* Filter Icon Wrapper Styles */
.icon-wrapper {
    width: 10%;
}

/* Filter Icon Styles */
.filter-icon {
    width: 30%;
}

/* Dropdown Menu Item Styles */
.dropdown-menu > li {
    margin: 0.3em;
    border-bottom: 1px solid $grayTran;
}

/* Dropdown Item Styles */
.dropdown-item {
    padding-inline: 0 !important;
    padding: 0.3em !important;
    border-radius: 0.375em !important;

    &:hover {
        color: $text-color-hover !important;
        background: $sand !important;
        transition: 250ms cubic-bezier(0.52, -0.80, 0.52, 0.52);
    }
}

/* Selected Filter Styles */
.selected {
    background-color: $sandDarker;
    border-radius: 7px;

    & > .dropdown-item {
        color: $goldLight;
    }
}

/* Responsive Styles for Small Screens */
@media screen and (max-width: 500px) {
    #filter {
        margin-top: 1.5em !important;
        margin-right: 0em !important;
    }
    .filter-icon {
        width: 24%;
    }    
}

</style>

