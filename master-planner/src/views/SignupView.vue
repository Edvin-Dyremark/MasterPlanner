<!-- Signup View
- Displays a SignupForm component for user registration.
-->
<template>
  <div class="signup-view">
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from "../components/SignupForm";

export default {
  components: {
    SignupForm,
  },
};
</script>

<style scoped>
.signup-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
}
</style>
