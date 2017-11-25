<template>
  <section id="index-item">
    <div class="container">
      <div class="row">
        <div class="offset-2 col-lg-4">
          <el-carousel trigger="click" height="220px">
            <el-carousel-item v-for="item_photo in menu_item.item_photos">
              <img :src="item_photo" class="carousel-img"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="col-lg-6 d-flex flex-column justify-content-center">
          <h3 class="item-name">{{ menu_item.item_name }}</h3>
          <div class="item-price">
            <label>Price (MMK): </label>
            <span>{{ menu_item.item_price }} kyats</span>
          </div>
          <div style="margin-bottom: 5px;">
            <span class="item-category">{{ menu_item.item_category }} </span>
          </div>
          <div class="item-description">
            <p>{{ menu_item.item_description }}</p>
          </div>
          <div class="item-quantity">
            <label>Quantity</label>
            <el-input-number size="mini" :min="1" v-model="quantity" style="margin-bottom: 10px;"></el-input-number>
          </div>
          <button class="btn btn-primary" style="width: 150px;" @click="onCartHandle">Add to Cart</button>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.carousel-img {
  width: 100%;
  height: 220px;
}

.item-name, .item-price, .item-category, .item-quantity {
  margin-top: 5px;
}

.item-quantity p {
  margin-bottom: 0;
}

.item-quantity label {
  display: block;
}

</style>
<script>
import firebase from '../firebase';

export default {
  name: 'index-item',
  props: {
    item: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  firebase() {
    return {
      menu_item: {
        source: firebase.db.ref('menu_items').child(this.item),
        asObject: true
      }
    }
  },
  methods: {
    onCartHandle() {
      const itemKey = this.item; // this comes from item key
      firebase.db.ref('users').child(firebase.auth.currentUser.uid).child('cart').child(itemKey).set({
        item_name: this.menu_item.item_name,
        item_category: this.menu_item.item_category,
        item_price: this.menu_item.item_price,
        item_description: this.menu_item.item_description,
        item_photos: this.menu_item.item_photos,
        quantity: this.quantity
      }).then(() => {
        this.$message('Item added to checkout.');
      });
    }
  }
}
</script>