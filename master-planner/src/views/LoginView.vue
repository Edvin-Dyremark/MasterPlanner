<!-- Login View
- Displays a LoginForm component for user login.
-->

<template>
  <section class="login-view">
    <LoginForm />
  </section>
</template>

<script>
import LoginForm from "../components/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.login-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
</style>
