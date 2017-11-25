<template>
  <section id="admin-orders" class="col-lg-12">
    <div class="container">
      <h4 class="text-center admin-title">Delivery Orders</h4>
      <div class="row" v-for="(order, customer_key) in customer_orders">
        <div v-for="(item, item_index) in order" class="card item-card">
          <div class="row">
            <div class="col-sm-2">
              <h5>Ordered For</h5>
              <span>{{ item.order_name }}</span>
            </div>
            <div class="col-sm-2">
              <h5>Delivery Items</h5>
              <span v-for="item_order in item.order_items">{{ item_order.item_name }}, </span>
            </div>
            <div class="col-sm-6">
              <h5>Delivery Address</h5>
              <span>{{ item.order_address }}</span>
            </div>
            <div class="col-sm-2">
              <h5>Delivery Status</h5>
              <deliver-stat 
              :selected-status="item.order_status" 
              :item-index="item_index"
              :customer-key="customer_key"
              ></deliver-stat>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style>
#admin-orders, #admin-reservation {
  margin-top: 20px;
  height: calc(100vh - 20px);
  overflow: auto;
}

.admin-title {
  margin-bottom: 20px;
}

.item-card {
  width: 100%;
  padding: 10px;
  border-radius: 0;
}

.item-card h5 {
  font-size: 16px;
}

</style>
<script>
import firebase from '../../firebase';
import deliverStat from './AdminDeliverStat';

export default {
  name: 'admin-orders',
  components: {
    deliverStat
  },
  created() {
    firebase.db.ref('orders').on('value', (snapshot) => {
      this.customer_orders = snapshot.val();
    })
  },
  data() {
    return {
      customer_orders: null,
      selected_status: 0,
    };
  }
}
</script>