<template>
  <section id="index-orders">
    <h4 class="text-center">Your Orders</h4>
    <div class="container">
      <div class="text-center" v-if="orders.length < 1">
        <p>You don't have any orders.</p>
        <router-link class="btn btn-light" to="menu">Go to Menu</router-link>
        <router-link class="btn btn-light" to="checkout">Checkout Items</router-link>
      </div>
      <div v-for="order in orders">
      <div class="row" v-if="order.order_items" style="margin-top: 10px;">
        <div class="col-lg-8">
          <p><b>Orderd for</b> <span class="text-primary">{{ order.order_name }}</span></p>
          <div class="card item-card" style="width: 100%;" v-for="order_item in order.order_items">
            <div class="row">
              <div class="col-sm-3">
                <h5>Name</h5>
                <span>{{ order_item.item_name }}</span>
              </div>
              <div class="col-sm-3">
                <h5>Price</h5>
                <span>{{ order_item.item_price }} MMK</span>
              </div>
              <div class="col-sm-3">
                <h5>quantity</h5>
                <span>{{ order_item.quantity }}</span>
              </div>
              <div class="col-sm-3">
                <h5>Total amount</h5>
                <span>{{ totalPrice(order_item.item_price, order_item.quantity) }} MMK</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card item-card delivery-card">
            <p class="card-title">Delivering Status</p>
            <span class="status text-warning" v-if="order.order_status === 0">Pending</span>
            <span class="status text-primary" v-else-if="order.order_status === 1">Delivering</span>
            <span class="status text-success" v-else-if="order.order_status === 2">Delivered</span>
            <button class="btn btn-sm btn-danger btn-order" v-if="order.order_status === 0" @click="removeOrder(order['.key'])">Remove Order</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
</template>
<style>
#index-orders {
  margin-top: 50px;
  margin-bottom: 50px;
}

#index-orders h4 {
  margin-bottom: 30px;
}

.delivery-card .card-title {
  font-weight: 700;
}

.delivery-card {
  margin-top: 40px;
}

.card-title {
  margin: 0;
}

.status {
  font-size: 16px;
  margin-bottom: 5px;
}

.btn-order {
  width: 105px;
}

</style>
<script>
import firebase from '../firebase';

export default {
  name: 'index-orders',
  firebase() {
    return {
      orders: {
        source: firebase.db.ref('orders').child(firebase.auth.currentUser.uid),
        asObject: false
      }
    }
  },
  methods: {
    totalPrice(price, quantity) {
      const p = price * 1;
      const q = quantity * 1;
      return p * q;
    },
    removeOrder(key) {
      this.$firebaseRefs.orders.child(key).remove();
    }
  }
}
</script>