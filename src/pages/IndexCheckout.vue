<template>
  <section id="index-checkout">
    <div class="container">
      <h4 class="text-center">Checkout your items.</h4>
      <div class="spacer"></div>
      <div class="row">
        <div class="col-lg-6">
          <section class="checkout-items">
            <div
            class="card d-flex flex-row align-items-center justify-content-between card-checkout"
            :key="cart_item['.key']"
            v-for="cart_item in cart_items"
            >
              <div>
                <span class="d-block item-name">{{ cart_item.item_name }}</span>
                <span class="d-block">{{ cart_item.item_price }} MMK</span>
              </div>
              <div>
                <el-input-number size="mini" :min="1" v-model="cart_item.quantity" style="margin-right: 0;margin-bottom: 0px;"></el-input-number>
              </div>
              <button type="button" class="btn btn-danger btn-sm" @click="onRemoveItem(cart_item['.key'])">Remove</button>
            </div>
          </section>
          <div class="text-center" v-if="cart_items.length === 0">
            <div v-if="order_user['.value'] === null">
              <p style="margin-top: 30px;">No items in your cart.</p>
              <router-link class="btn btn-light" to="menu">Go to Menu</router-link>
            </div>
            <div v-else>
              <p style="margin-top: 30px;">Your items are on the way.</p>
              <router-link class="btn btn-light" to="orders">Go to Orders</router-link>
            </div>
          </div>
          
        </div>
        <div class="col-lg-6">
          <form @submit.prevent="onCheckoutSubmit">
            <div class="form-group">
              <label>Name</label>
              <input type="text" required v-model="order_name" class="form-control" placeholder="Please enter name of to whom we have to deliver." maxlength="100" pattern="^[a-zA-Z ]+$" title="Special characters (*, / #) and numbers are not allowed.">
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <div class="input-group">
                <span class="input-group-addon">+959</span>
                <input type="tel" v-model="phone_number" class="form-control" placeholder="969786696" name="Phone Number" required minlength="9" maxlength="9" pattern="[0-9]{1,9}\d$" title="Please enter Myanmar Phone Number"/>
              </div>
            </div>
            <div class="form-group">
              <label>Address</label>
              <textarea v-model="order_address" class="form-control" placeholder="Please enter where we have to deliver." required></textarea>
            </div>
            <div class="form-group">
              <p class="text-warning">* Payment is only available for cash-on-delivery.</p>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary" :disabled="!cart_items">Order Delivery</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.col-same-height {
  overflow: auto;
}

.item-name {
  font-size: 18px;
  font-weight: 700;
}

#index-checkout {
  margin-top: 60px;
}

.card-checkout {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
}
</style>
<script>
import firebase from '../firebase';

export default {
  name: 'index-checkout',
  firebase() {
    return {
      cart_items: firebase.db.ref('users').child(firebase.auth.currentUser.uid).child('cart'),
      order_form: firebase.db.ref('orders'),
      order_user: {
        source: firebase.db.ref('orders').child(firebase.auth.currentUser.uid),
        asObject: true
      }
    }
  },
  data() {
    return {
      order_name: '',
      phone_number: '',
      order_address: ''
    }
  },
  methods: {
    onRemoveItem(itemKey) {
      firebase.db.ref('users').child(firebase.auth.currentUser.uid).child('cart').child(itemKey).remove();
    },
    onCheckoutSubmit() {
      const cart_items = this.cart_items;
      cart_items.forEach((item) => {
        delete item['.key'];
        return item;
      });
      this.$firebaseRefs.order_form.child(firebase.auth.currentUser.uid || localStorage.getItem('userId')).push().set({
        order_name: this.order_name,
        phone_number: this.phone_number,
        order_address: this.order_address,
        order_items: cart_items,
        order_status: 0
      })
      .then(() => {
        this.$firebaseRefs.cart_items.remove();
        this.cart_items = [];
        this.order_name = '',
        this.phone_number = '',
        this.order_address = ''
      });
    }
  }
}
</script>