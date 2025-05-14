<script setup>
import {ref} from "vue";
import InputField from "@/ui/components/InputField.vue";
import CheckboxWithText from "@/ui/components/buttons/CheckboxWithText.vue";
import LockableButton from "@/ui/components/buttons/LockableButton.vue";

defineProps({
  username: String,
  // email: String,
  password: String
})
let email = ref("")
const requiredFields = [
  {
    "title": "Username",
    "placeHolder" : "...",
    "type" : "text"
  },
  {
    "title": "E-mail",
    "placeHolder" : "...",
    "type" : "email"
  },
  {
    "title": "Password",
    "placeHolder" : "...",
    "type" : "password"
  },
  {
    "title": "Confirm Password",
    "placeHolder" : "...",
    "type" : "password"
  }
]
</script>

<template>
  <div class="container">
    <h1 class="login-title"><strong>Sign Up</strong></h1>

    <InputField class="input-field" v-for="(field, i) in requiredFields" :key="i"
                :title="field['title']"
                :place-holder="field['placeHolder']"
                :type="field['type']"
                @onEdit="args => email = args"
    />
    <CheckboxWithText class="checkbox" text="Agree to terms and services"/>
    <CheckboxWithText class="checkbox" text="Receive spam and other things"/>
    <LockableButton class="submit-button" :is-unlocked="true" type="submit" text="Sign Up"/>
    <RouterLink to="/login">Log in</RouterLink>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 30rem;

  background: rgba(255,255,255,0.8);
  box-shadow: 0 0 8px 2px rgba(0, 0, 0, .5);
  border-radius: 20px;
}
.container > * {
  margin: 10px 20px 10px;
}
.input-field {

}
.login-title {
  align-self: center;
  font-size: 3rem;
}
.checkbox {
font-size: 1em;
}
.submit-button {
  align-self: center;
  font-size: 2.5rem;
  width: calc(100% - 40px);
  height: 2em;
}
.options {
  align-self: center;
  justify-self: center;
  margin-top: auto;
}
</style>
