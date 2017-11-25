<template>
  <div>
    <el-select v-model="statusCode" size="small" @change="changeDeliveryStatus()">
      <el-option label="Pending" :value="0"></el-option>
      <el-option label="Delivering" :value="1"></el-option>
      <el-option label="Delivered" :value="2"></el-option>
    </el-select>
    <button class="btn btn-sm btn-danger btn-order" @click="removeOrder">Remove Order</button>
  </div>
</template>
<style scoped>
.btn-order {
  margin-top: 10px;
  cursor: pointer;
}
</style>
<script>
import firebase from '../../firebase';

export default {
  name: 'deliver-status',
  props: ['selectedStatus', 'itemIndex', 'customerKey'],
  data() {
    return {
      statusCode: this.selectedStatus
    }
  },
  methods: {
    changeDeliveryStatus() {
      firebase.db.ref('orders').child(this.customerKey).child(this.itemIndex).update({
        order_status: this.statusCode
      });
    },
    removeOrder() {
      firebase.db.ref('orders').child(this.customerKey).child(this.itemIndex).remove();
    }
  }
}
</script>