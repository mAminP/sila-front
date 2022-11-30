<template>
  <div>
    Admin
  </div>
</template>

<script>
export default {
  name: 'AdminIndex',
  layout: 'admin',
  middleware: ['admin-role']
}
</script>

<style scoped>

</style>
