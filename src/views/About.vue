<!-- About View
- Displays info about the project context
-->

<template>
  <div class="about">
    <h1>This Website</h1>
    <p>
      Was created as part of the TDDD27 Advanced Web Programming Course at LiU.
    </p>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>

<style scoped>
.about {
  max-width: 480px;
  margin: var(--space-2xl) auto;
  padding: var(--space-xl);
  text-align: center;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.about h1 {
  margin: 0 0 var(--space-md);
  color: var(--color-text);
}

.about p {
  color: var(--color-text-muted);
}
</style>
