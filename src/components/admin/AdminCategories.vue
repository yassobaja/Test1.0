<template>
  <section class="col-lg-12">
    <el-form ref="adminCategoryForm" @submit.native.prevent="onCategorySubmit" height="300">

      <el-form-item label="Category Name">
        <el-input v-model="categoryName" placeholder="eg: Desserts"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">Submit</el-button>
        <el-button type="default" native-type="reset">Clear</el-button>
      </el-form-item>

    </el-form>

    <el-table
      :data="categoryData"
      style="width: 100%">
      <el-table-column
        label="Category Name"
        width="180">
        <template slot-scope="scope">
          <div slot="reference">
            <span>{{ scope.row.category_name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

  </section>
</template>
<style>
</style>
<script>
import firebase from '../../firebase'
const categoryRef = firebase.db.ref('categories');

export default {
  name: 'admin-categories',
  firebase: {
    categoryData: firebase.db.ref('categories')
  },
  mounted() {

  },
  data() {
    return {
      categoryName: '',
      categoryPhoto: null,
      editable: false
    }
  },
  methods: {
    onCategorySubmit(e) {
      const categoryName = this.categoryName;
      const categoryPhoto = this.categoryPhoto;
      categoryRef.push().set({
        category_name: categoryName
      });
    },
    handleCategoryPhoto(e) {
      const categoryPhoto = e.target.files[0];
      this.categoryPhoto = categoryPhoto;
    },
    handleEdit(index, row) {
      this.editable = true;
    },
    handleDelete(index, row) {
      this.$firebaseRefs.categoryData.child(row['.key']).remove();
    }
  }
}
</script>