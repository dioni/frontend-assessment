<template>
    <div id="contact-form">
        <div class="title text-center">
           <span> Contact Agent</span>
        </div>
        <b-form @submit="onSubmit" >
            <b-form-group>
                <b-form-input
                    id="full-name"
                    v-model="formData.fullName"
                    type="text"
                    placeholder="Full Name *"                                
                    novalidate="true" >
                </b-form-input>
                <b-form-invalid-feedback :state="fullNameValidation">
                    Required *
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group>
                <b-form-input
                    id="email"
                    v-model="formData.email"
                    type="text"
                    placeholder="Email *" >
                </b-form-input>
                <b-form-invalid-feedback :state="emailValidation">
                    Required *
                </b-form-invalid-feedback>
                <b-form-invalid-feedback :state="emailFormatValidation">
                    Enter a valid e-mail *
                </b-form-invalid-feedback>   
            </b-form-group>   
            <b-form-group>                    
                <b-form-input
                    id="phone-number"
                    v-model="formData.phoneNumber"
                    type="text"
                    placeholder="Phone Number *"
                    v-mask="'+1 (###) ###-####'">
                </b-form-input>
                <b-form-invalid-feedback :state="phoneNumberValidation">
                    Required *
                </b-form-invalid-feedback>
            </b-form-group>  
            <b-form-group>
                <b-form-textarea
                    id="comments"
                    v-model="formData.comments"
                    placeholder="Comments *"
                    rows="3"
                    max-rows="6">
                </b-form-textarea>
                <b-form-invalid-feedback :state="commentValidation">
                    Required *
                </b-form-invalid-feedback>
            </b-form-group>
            <div class="text-center">
                <b-button id="submit-form" squared type="submit" variant="primary">Contact Now</b-button>
                <b-form-valid-feedback :state="successfullySubmited">
                    Message sent successfully
                </b-form-valid-feedback>
            </div>
        </b-form>
    </div>    
</template>
<script>
export default {
    name: 'ContactForm',
    data() {
        return {
            formSubmited: false,
            formSaved: false,
            formData: {
                fullName: '',
                email: '',
                phoneNumber: '',
                comments: ''
            },
        }
    },
    computed: {
        fullNameValidation() {
            if (this.formSubmited) {
                if (this.formData.fullName)
                    return true
                else
                    return false
            }
            else {
                return true
            }
        },
        emailFormatValidation() {
            if (this.formSubmited) {
                if (this.formData.email) {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.formData.email)) { //eslint-disable-line
                        return true
                    } else {
                        return false
                    }
                }
                else
                    return true
            }
            else {
                return true
            }
        },
        emailValidation() {
            if (this.formSubmited) {
                if (this.formData.email) {
                    return true
                }
                else
                    return false
            }
            else {
                return true
            }
        },
        phoneNumberValidation() {
            if (this.formSubmited) {
                if (this.formData.phoneNumber)
                    return true
                else
                    return false
            }
            else {
                return true
            }
        },
        commentValidation() {
            if (this.formSubmited) {
                if (this.formData.comments)
                    return true
                else
                    return false
            }
            else {
                return true
            }
        },
        successfullySubmited() {
            return this.formSaved
        },
    },
    watch: {
        formData: {
            handler() {
                this.formSubmited = false;
            },
            deep: true
        },
    },
    methods: {
        onSubmit(event){
            event.preventDefault()
            /* eslint-disable no-debugger */
            //debugger
            /* eslint-enable no-debugger */
            this.formSubmited = true;
            if (this.checkValidations()) {
                this.formSaved = true
            }            
        },
        checkValidations() {
            return this.commentValidation &&
                this.phoneNumberValidation &&
                this.emailValidation &&
                this.emailFormatValidation &&
                this.fullNameValidation
        },
    }
}
</script>
<style>
#contact-form {
    background-color: lightgray;
    padding: 20px 40px 20px 40px;
}
.title {
    font-size: 18px;
}
.form-group {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>