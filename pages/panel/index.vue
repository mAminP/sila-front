<template>
  <div>
    Panel
    {{ $auth.loggedIn }}
  </div>
</template>

<script>
export default {
  name: 'PanelPage',
  middleware: 'admin-role'
}
</script>
