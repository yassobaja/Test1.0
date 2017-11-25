<template>
  <section id="admin-items" class="col-lg-12">
    <div class="container">
      <div class="row">
        <el-form ref="adminItemForm" @submit.native.prevent="handleItemSubmit" style="width: 100%;">
          <el-form-item label="Item Name">
            <el-input placeholder="eg: Sandwich" v-model="item_name"></el-input>
          </el-form-item>

          <el-form-item label="Item Price">
            <el-input placeholder="eg: 1000 MMK" v-model="item_price"></el-input>
          </el-form-item>

          <el-form-item label="Item Description">
            <el-input type="textarea" v-model="item_description"></el-input>
          </el-form-item>

          <el-form-item label="Select Category">
            <el-select v-model="item_category" placeholder="Select Categories">
              <el-option
                v-for="category in categoryData"
                :key="category.category_name"
                :label="category.category_name"
                :value="category.category_name"
              ></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item>
            <label class="d-block" style="margin: 0;">Upload Photos</label>
            <el-upload
              multiple
              ref="itemPhotos"
              action=""
              :auto-upload="false"
              list-type="picture"
              :on-change="attachItemPhotos">
              <el-button size="small" type="primary">Attach Files</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" native-type="submit">Submit</el-button>
            <el-button type="default" native-type="reset">Clear</el-button>
          </el-form-item>

        </el-form>
      </div>
        <el-table
          :data="menu_items"
          style="width: 100%"
          height="250">

          <el-table-column
            label="Item Name"
            width="180">
            <template slot-scope="scope">
              <div slot="reference">
                <span>{{ scope.row.item_name }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="Category"
            width="180">
            <template slot-scope="scope">
              <div slot="reference">
                <span>{{ scope.row.item_category }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="Item Price">
            <template slot-scope="scope">
              <div slot="reference">
                <span>{{ scope.row.item_price }} MMK</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="Operation">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row['.key'])"
              >Delete</el-button>
            </template>
          </el-table-column>  

        </el-table>
    </div>

  </section>
</template>
<style>
</style>
<script>
import firebase from '../../firebase';

export default {
  name: 'admin-items',
  firebase: {
    categoryData: firebase.db.ref('categories'),
    menu_items: firebase.db.ref('menu_items')
  },
  data() {
    return {
      item_name: '',
      item_price: '',
      item_category: '',
      item_description: '',
      itemPhotos: null
    };
  },
  methods: {
    handleItemSubmit() {
      const menuItemRef = firebase.db.ref('menu_items');
      const itemPhotos = this.itemPhotos;
      menuItemRef.push().set({
        item_name: this.item_name,
        item_price: this.item_price,
        item_category: this.item_category,
        item_description: this.item_description
      });
      const menuItemStorageRef = firebase.storage.refFromURL('gs://restaurant-pos-8cdeb.appspot.com/menu_items');
      menuItemRef.limitToLast(1).on('child_added', (menu) => {
        for (let i = 0; i < itemPhotos.length; i++) {
          menuItemStorageRef.child(menu.key).child(itemPhotos[i].name).put(itemPhotos[i].raw)
          .then((menuPhoto) => {
            menuItemRef.child(menu.key).child('item_photos').push(menuPhoto.downloadURL);
          });
        }
        this.itemPhotos = null;
      });
    },
    attachItemPhotos(file, fileList) {
      this.itemPhotos = fileList;
      console.log(typeof fileList);
    },
    handleDelete(index, row_key) {
      this.$firebaseRefs.menu_items.child(row_key).remove();
    }
  }
}
</script>