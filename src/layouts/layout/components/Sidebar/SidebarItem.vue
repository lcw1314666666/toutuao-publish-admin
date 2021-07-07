<template>
  <div
    v-if="!item.meta || !item.meta.hidden"
    :class="[isCollapse ? 'simple-mode' : 'full-mode', {'first-level': isFirstLevel}]"
  >
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <sidebar-item-link
        v-if="theOnlyOneChild.meta"
        :to="resolvePath(theOnlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(theOnlyOneChild.path)"
          class="menu-item"
          :class="{'submenu-title-noDropdown': isFirstLevel}"
        >
          <i v-if="theOnlyOneChild.meta.icon" :class="`icon ${theOnlyOneChild.meta && theOnlyOneChild.meta.icon}`" />
          <template slot="title">
            <span v-if="theOnlyOneChild.meta.title">{{ theOnlyOneChild.meta.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <el-submenu
      v-else
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <i v-if="item.meta && item.meta.icon" :class="`icon ${item.meta && item.meta.icon}`" />
        <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
      </template>
      <template v-if="item.children">
        <sidebar-item
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :is-collapse="isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import SidebarItemLink from './SidebarItemLink'

export default {
  name: 'SidebarItem',
  components: { SidebarItemLink },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isFirstLevel: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  computed: {
    alwaysShowRootMenu() {
      if (this.item.meta && this.item.meta.alwaysShow) {
        return true
      }
      return false
    },
    showingChildNumber() {
      if (this.item.children) {
        const showingChildren = this.item.children.filter((item) => {
          if (item.meta && item.meta.hidden) {
            return false
          } else {
            return true
          }
        })
        return showingChildren.length
      }
      return 0
    },
    theOnlyOneChild() {
      if (this.showingChildNumber > 1) {
        return null
      }
      if (this.item.children) {
        for (const child of this.item.children) {
          if (!child.meta || !child.meta.hidden) {
            return child
          }
        }
      }
      // If there is no children, return itself with path removed,
      // because this.basePath already conatins item's path information
      return { ...this.item, path: '' }
    }
  },
  methods: {
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-item {
  &.is-active {
    background-color: $subMenuHover!important;
  }
}
.icon {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
  font-size: 18px;
  color: #ffffff;
}

</style>
