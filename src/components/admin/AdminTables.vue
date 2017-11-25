<template>
  <section id="admin-reservation" class="col-lg-6">
    <el-form @submit.native.prevent="onTableSubmit">
      <el-form-item label="Table Number">
        <el-input v-model="table_number" placeholder="eg: 1" />
      </el-form-item>
      <el-form-item>
        <label>Total People</label>
        <br>
        <el-input-number v-model="total_people" :min="1" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Submit</el-button>
      </el-form-item>
    </el-form>
    
    <el-table
      :data="table_data"
      style="width: 100%">
      <el-table-column
        label="Table Number"
        width="180">
        <template slot-scope="scope">
          <div slot="reference">
            <span>{{ scope.row.table_number }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Total People"
        width="180">
        <template slot-scope="scope">
          <div slot="reference">
            <el-tag size="medium">{{ scope.row.total_people }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Operations">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button>
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
import firebase from '../../firebase';

export default {
  name: 'admin-reservation',
  firebase: {
    table_data: firebase.db.ref('tables'),
  },
  data() {
    return {
      table_number: null,
      total_people: null
    };
  },
  methods: {
    onTableSubmit() {
      firebase.db.ref('tables').push().set({
        table_number: this.table_number,
        total_people: this.total_people
      });
    },
    handleDelete(index, row) {
      this.$firebaseRefs.table_data.child(row['.key']).remove();
    }
  },
}
</script>