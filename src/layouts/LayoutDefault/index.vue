<template>
  <div class="app-wrapper layout-default">
    <default-header></default-header>
    <slot />
    <default-footer></default-footer>
  </div>
</template>

<script>
import DefaultHeader from '@/components/DefaultHeader'
import DefaultFooter from '@/components/DefaultFooter'
export default {
  name: 'LayoutDefault',
  components: {
    DefaultHeader,
    DefaultFooter
  }
}
</script>

<style scoped>

</style>
