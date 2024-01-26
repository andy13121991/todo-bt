<template>
<div>

    <!-- BootstrapVue Modal Component -->
    <b-modal
    id="modal-prevent-closing"
    ref="modal"
    title="Submit Your To Do"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    >

    <!-- Custom header for the modal -->
    <header class="customModal-header">
        <h6 class="customModal-title">Submit your To Do</h6>

        <!-- Close button for the modal -->
        <img 
        src="../assets/icons8-close.svg" 
        class="customModal-closeBtn" 
        @click="$bvModal.hide('modal-prevent-closing')"
        >
    </header>

    <!-- Horizontal line for styling -->
    <hr class="customModal-hr">

    <!-- Form inside the modal -->
    <form ref="form" @submit.stop.prevent="handleSubmit">
        
        <!-- Title input field -->
        <b-form-group
        label="Title"
        label-for="title-input"
        invalid-feedback="Title is required"
        :state="titleState"
        >
        <b-form-input
            id="title-input"
            v-model="title"
            :state="titleState"
            required
        ></b-form-input>
        </b-form-group>
        
        <!-- Text input field -->
        <b-form-group
        label="Text"
        label-for="text-input"
        >
        <b-form-input
            id="text-input"
            v-model="text"
        ></b-form-input>
        </b-form-group>
        
        <!-- Date input field -->
        <b-form-group
        label-for="date-input"
        invalid-feedback="Date is required"
        :state="dateState"
        required
        >
        <div>
            <label for="datepicker">Choose a date</label>
            <b-form-datepicker 
            id="example-datepicker" 
            v-model="date" 
            class="mb-2" 
            label="Date"
            locale="de"
            :date-format-options="{  day: 'numeric', month: 'numeric', year: 'numeric' }"
            label-for="date-input"
            invalid-feedback="Date is required"
            :state="dateState"
            ></b-form-datepicker>
            </div>
        </b-form-group>
        
        <!-- Time input field -->
        <b-form-group
        label-for="time-input"
        invalid-feedback="Time is required"
        :state="timeState"
        required
        >
        <div>
            <label for="timepicker">Choose a time</label>
            <b-form-timepicker 
            v-model="time" 
            locale="de"
            label="Time"
            label-for="time-input"
            invalid-feedback="Time is required"
            :state="timeState"
            ></b-form-timepicker>
            <div class="mt-2"></div>
        </div>
        </b-form-group>
    </form>
    </b-modal>
</div>
</template>

<script>

export default {
    data() {
        return {

            // Data properties for form inputs
            title: '',
            text: '',
            date: '',
            time: '',
            item: [],

            // Validation states for form inputs
            titleState: null,
            dateState: null,
            timeState: null,
        }
    },
    methods: {

        // Check the validity of the form
        checkFormValidity() {
            let valid = this.$refs.form.checkValidity()

            // Title validation
            if (!this.title || this.title.trim() === '')
            {
                this.titleState = false;
                valid = false;
            }

            else
            {
                this.titleState = true;
            }

            // Date validation
            if (!this.date || this.date.trim() === '')
            {
                this.dateState = false;
                valid = false;
            }

            else
            {
                this.dateState = true;
            }
            
            // Time validation
            if (!this.time || this.time.trim() === '')
            {
                this.timeState = false;
                valid = false;
            }

            else
            {
                this.timeState = true;
            }
            
            this.titleState = valid;
        
            return valid
        },

        // Reset modal data and states
        resetModal() {
            this.title = ''
            this.date = ''
            this.time = ''
            this.text = ''
            this.titleState = null
            this.dateState = null
            this.timeState = null
        },

        // Prevent modal from closing and trigger submit handler
        handleOk(bvModalEvent) {
            // Prevent modal from closing
            bvModalEvent.preventDefault()
            // Trigger submit handler
            this.handleSubmit()
        },

        // Handle form submission
        handleSubmit() {

            // Exit when the form isn't valid
            if (!this.checkFormValidity())
            {
            return
            }

            // Push the name to item array
            this.$emit('addtodo', {
                item: this.item = {
                    title: this.title,
                    date: this.date,
                    time: this.time,
                    text: this.text,
                    route: this.currentRouteName,
                }
            });

            // Hide the modal manually
            this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
            })
        },
    },
    computed: {

        // Get the current route name
        currentRouteName() {
            return this.$route.name;
        }
    },
}
</script>

<style lang="scss">

/* Import variables */
@import '../assets/variables.scss';

/* Bootstrap section */
/* Custom styling for the modal content */
#modal-prevent-closing___BV_modal_content_{
    background-color: $sand;
}

/* Styling for the close button in the header */
.customModal-iconBtn {
    width: 7%;
}

.customModal-iconBtn:hover {
    transform: scale(1.2);
    transition: .25s ease;
}

/* Hide the default modal header */
header#modal-prevent-closing___BV_modal_header_{
    display: none;
}

/* Custom styling for the modal header */
.customModal-header {
    width: 100%;
    display: flex;
}

/* Styling for the horizontal line */
.customModal-hr {
    width: 106.8%;
    position: relative;
    left: -1em;
    border: 1px solid $white;
}

/* Styling for the modal title */
.customModal-title {
    width: 100%;
    padding-top: 0.3em;
    font-size: 1.2em;
}

/* Styling for the close button and hover effect */
.customModal-closeBtn {
    width: 8%;

    &:hover {
        transform: scale(1.2);
        transition: .25s ease;
    }
}

/* Styling for the primary button (Submit) */
.btn-primary{
    background-color: $submitGreen !important;
    border-color: $submitGreen !important;

    &:hover {
        transform: scale(1.3);
        transition: .25s ease; 
    }
}

/* Styling for the secondary button (Cancel) */
.btn-secondary{
    background-color: $sandDarker !important;
    border-color: $redder !important;

    &:hover {
        transform: scale(1.2);
        transition: .25s ease;
    }
}

</style>