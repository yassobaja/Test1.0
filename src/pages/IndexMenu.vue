<template>
  <section id="index-menu">
    <div class="container">
      <div class="row">
        <div class="col-md-3 card-group" style="margin-top: 20px;" :key="menu_item['.key']" v-for="menu_item in menu_items">
          <div class="card">
            <img class="card-img-top card-img" :src="Object.entries(menu_item.item_photos)[0][1]" :alt="menu_item.item_name" v-if="menu_item.item_photos">
            <div class="card-body">
              <h4 class="card-title">{{ menu_item.item_name }}</h4>
              <p class="card-text item-price">{{ menu_item.item_price }} Kyats</p>
              <span class="card-text item-category">{{ menu_item.item_category }}</span>
              <router-link class="btn btn-primary btn-view-item" :to="{ name: 'index-item', path: '/menu', params: { item: menu_item['.key'] } }" >View Item</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
#index-menu {
  margin-bottom: 60px;
}

.card-img {
  width: 100%;
  height: 220px;
}

.card-title {
  margin: 0;
}

.card-text {
  width: 100%;
  overflow: hidden;
  display: block;
  word-wrap: break-word;
  white-space: word-wrap;
  text-overflow: ellipsis;
}

.item-price {
  font-weight: 700;
  color: #898989;
  margin-top: 5px;
  margin-bottom: 5px;
}

.item-category {
  padding: 8px;
  border-radius: 5px;
  width: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: rgba(158, 225, 255, 0.5);
  color: #2d2d2d;
  display: inline-block;
  font-size: 14px;
}

.btn-view-item {
  display: block;
}

</style>
<script>
import firebase from '../firebase';
import IndexItem from '../pages/IndexItem';

export default {
  name: 'index-menu',
  components: {
    IndexItem
  },
  firebase: {
    menu_items: firebase.db.ref('menu_items')
  },
  data() {
    return {
    };
  }
}
</script>