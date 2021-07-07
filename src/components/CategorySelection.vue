<template>
  <q-card-section class="q-pa-xs" >
    <q-expansion-item header-style="background-color: rgba(0, 0, 0, 0.05);padding:4px 4px;color:rgba(0, 0, 0, 0.6)"
                      v-model="expandSelectCategory"
                      label="Category"
                      :caption="selectedCategoryTitle"
                      :disable="disable == 1"
    >
      <q-card>
        <q-card-section>

          <q-tree ref="categoryTree" text-color="rgba(0, 0, 0, 0.6)"
                  :nodes="availableCategoryOptions"
                  node-key="id"
                  label-key="title"
                  no-connectors
                  @lazy-load="onLazyLoad"
                  :selected.sync="selectedCategoryId"
                  @update:selected="selectCategoryItem"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>

  </q-card-section>
</template>

<script>
export default {
  name: 'category-selection',
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Object,
      default: null
    }
  },
  computed: {
    selectedCategoryTitle: function () {
      return this.selectedOption?.title
    }
  },
  data () {
    return {
      expandSelectCategory: false,
      availableCategoryOptions: [],
      selectedCategoryId: null,
      selectedOption: null
    }
  },
  methods: {
    fetchCategories (parent, action) {
      const categories = []
      this.$axios.get(`categorylist/${parent}`)
        .then(res => {
          res.data.map(item => {
            const hasChildren = item.children.length > 0
            categories.push({
              title: item.title,
              id: item.id,
              lazy: hasChildren,
              selectable: !hasChildren,
              img: item.img,
              handler: hasChildren ? this.toggleNode : null
            })
          })
          action(categories)
        })
        .catch(e => {
          console.log(e)
        })
    },
    toggleNode (node) {
      const isExpanded = this.$refs.categoryTree.isExpanded(node.id)
      this.$refs.categoryTree.setExpanded(node.id, !isExpanded)
    },
    onLazyLoad ({ node, key, done, fail }) {
      this.fetchCategories(node.id, (items) => {
        done(items)
      })
    },
    selectCategoryItem (nodeKey) {
      const selectedCategoryObject = this.$refs.categoryTree.getNodeByKey(nodeKey)
      this.selectedOption = selectedCategoryObject
      this.expandSelectCategory = false
      this.$emit('selection:changed', selectedCategoryObject)
    }
  },
  created () {
    this.fetchCategories('', (items) => {
      this.availableCategoryOptions = items
    })
    this.selectedOption = this.selected
  }
}
</script>

<style scoped>
  .q-tree >>> .q-tree__img.q-mr-sm {
    width: 66px;
    height: 58px;
  }
</style>
