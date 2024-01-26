<template>

    <!-- Container for each item in the list -->
    <div :id="index" :key="index" class="body-btn" style="z-index: 3;">

        <!-- Container for the menu button and additional options -->
        <div class="list-container" :class="{ active: isActive }">

            <!-- Button to trigger the menu -->
            <button class="more-button" aria-label="Menu Button" @click="openEdit(index)">
                <!-- Menu icon with three lines -->
                <div class="menu-icon-wrapper">
                    <div class="menu-icon-line half first"></div>
                    <div class="menu-icon-line"></div>
                    <div class="menu-icon-line half last"></div>
                </div>
            </button>

            <!-- List of additional options -->
            <ul class="more-button-list">

                <!-- Option to mark the item as done -->
                <li class="more-button-list-item" @click="makeDone">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="480" height="480" viewBox="0 0 30 30" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                        <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
                    </svg>
                    <span>Done</span>
                </li>

                <!-- Option to delete the item -->
                <li class="more-button-list-item" @click="deleteItem(index)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/>
                    </svg>
                    <span>Delete</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

// Import Vuex actions
import { mapActions } from 'vuex';

export default {

    // Data properties for managing the state of the menu
    data() {
        return {
            isActive: false,
            isDone: false,
            index: 0,
        };
    },
    methods: {

        // Map Vuex actions
        ...mapActions(['updateIsActive']),

        // Method to open/close the menu
        openEdit() {

            // Toggle state isActive
            this.isActive = !this.isActive;

            // Find the index of the current element in the list
            const el = document.getElementsByClassName('body-btn');
            const indexEl = Array.from(el).indexOf(this.$el);
            this.index = indexEl;

            // Update Vuex state
            this.updateIsActive(this.isActive);

            // Sending event and state and data to parent
            this.$emit('openedEdit', this.isActive, this.index);
        },

        // Map Vuex actions
        ...mapActions(['updateIsActive']),

        // Method to mark the item as done
        makeDone() {

            //Toggle state isDone
            this.isDone = !this.isDone;

            // Set isActive state to false
            this.isActive = false;

            // Emit event to update the parent component
            this.$emit('updateIsDone', this.isDone);

            // Update Vuex state
            this.updateIsActive(this.isActive);
        },

        // Map Vuex actions
        ...mapActions(['updateIsActive']),

        // Method to delete the item
        deleteItem(index) {

            // Set isActive state to false
            this.isActive = false;

            // Emit event to update the parent component
            this.$emit('deleteItem', index);

            // Update Vuex state
            this.updateIsActive(this.isActive);
        },
    }
}

</script>

<style lang="scss">

/* Imports fonts and variables */
@import '../assets/fonts.scss';
@import '../assets/variables.scss';


/* Variable for transition */
$menu-icon-transition: transform 300ms cubic-bezier(0.52, -0.80, 0.52, 0.52);

/* Styles for the menu button and additional options */
.body-btn {
    height: 99.2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 1.5em;
    font-family: 'Montserrat', sans-serif;
    z-index: 2;
}

.list-container {
    position: relative;

    /* Styles for the active state of the container */
    &.active {
        .more-button-list {
            opacity: 1;
            transform: scale(1);
        }

        /* Animation styles for list items */
        .more-button-list-item {
            animation: fadeInItem .6s .2s forwards;

            &:nth-child(2) {
                animation-delay: .4s;
            }

            &:nth-child(3) {
                animation-delay: .6s;
            }

            &:nth-child(4) {
                animation-delay: .8s;
            }
        }

        /* Animation styles for the menu button */
        .more-button {
            animation: onePulse .6s forwards linear;
        }

        /* Transformation of the menu icon in the active state */
        .menu-icon-wrapper {
            transform: rotate(-45deg);
        }

        /* Transformation of the lines in the menu icon */
        .menu-icon-line {
            &.first {
                transform: rotate(-90deg) translateX(1px);
            }

            &.last {
                transform: rotate(-90deg) translateX(-1px);
            }
        }
    }
}

/* Styles for the menu button */
.more-button {
    background-color: $button-bg;
    box-shadow: 1px 4px 4px 1px $sandShadow;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: .2s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    position: relative;
    z-index: 3;


    /* Hover and focus styles */
    &:hover,
    &:focus {
        box-shadow: 1px 4px 4px 1px $sandShadow;
        background-color: darken($button-bg, 4%);
    }

    &:hover {
        transform: scale(1.1);
        transition: $menu-icon-transition;
    }

    &:focus {
        outline: 0;
    }

    /* Styles for the list of additional options */
    &-list {
        background-color: $list-bg;
        border-radius: 8px;
        list-style-type: none;
        width: 140px;
        box-shadow: 1px 4px 4px 1px $sandShadow;
        padding: 0;
        padding: 6px;
        position: absolute;
        right: -130px;
        bottom: 1em;
        opacity: 0;
        z-index: 1;
        transform: scale(0);
        transform-origin: bottom left;
        transition: all .3s ease .1s;

        li {
            opacity: 0;
        }
    }

    /* Styles for individual list items */
    &-list-item {
        display: flex;
        align-items: center;
        color: $text-color;
        padding: 10px;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        transition: .2s ease-in;
        transform: translatex(-10px);

        /* Hover styles for list items */
        &:hover {
            color: $text-color-hover;
            background: $sand;
        }

        /* Separator line after each list item */
        &:after {
            content: '';
            position: absolute;
            height: 1px;
            width: calc(100% - 24px);
            left: 12px;
            bottom: 0;
            background-color: rgba(132, 160, 244, 0.1);
        }

        /* Hide separator line after the last list item */
        &:last-child:after {
            display: none;
        }

        /* Styles for the SVG icon within list items */
        svg {
            width: 18px;
            height: 18px;
        }

        /* Styles for the text within list items */
        span {
            display: inline-block;
            line-height: 20px;
            font-size: 14px;
            margin-left: 8px;
        }
    }
}

/* Keyframes for the pulse animation */
@keyframes onePulse {
    0% {
        box-shadow: 1px 4px 4px 1px $sandShadowMore;
    }

    50% {
        box-shadow: 1px 4px 4px 1px $sandShadow;
    }

    100% {
        box-shadow: 1px 4px 4px 1px $sandShadowMore;
    }
}

/* Keyframes for the fade-in animation of list items */
@keyframes fadeInItem {
    100% {
        transform: translatex(0px);
        opacity: 1;
    }
}

/* Styles for the menu icon wrapper */
.menu-icon-wrapper {
    border-radius: 2px;
    width: 20px;
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    cursor: pointer;
    transition: transform 330ms ease-out;
}

/* Styles for the lines within the menu icon */
.menu-icon-line {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 2px;

    /* Different styles for the first and last lines */
    &.half {
        width: 50%;
    }

    &.first {
        transition: $menu-icon-transition;
        transform-origin: right;
    }

    &.last {
        align-self: flex-end;
        transition: $menu-icon-transition;
        transform-origin: left;
    }
}

/* Responsive styles for small screens */
@media screen and (max-width: 500px) {
    .more-button-list {
        width: 100px;
        right: -30px;
        bottom: 40px;
    }
}

</style>

