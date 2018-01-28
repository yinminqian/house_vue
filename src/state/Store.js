import vue from 'vue'
import vuex from 'vuex'
import Sender from '../Sender/sender'

vue.use(vuex)


const store = new vuex.Store({
  state: {
    count: 2,
    location: []
  },
  mutations: {
    inst(state) {
      state.count++;
    },
    location(state, location) {
      state.location = location;
    }
  },
  actions: {
    get_location(context) {
      Sender.post('http://localhost:2333/api/read_location')
        .then(function (data) {
          context.commit("location",data)
        });
    }
  },
  getters:{
    get_location(state){
      return state.location
    }
  }

})


export default store
