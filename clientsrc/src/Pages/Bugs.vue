<template>
  <div class="Bugs text-light text-center">
    <div class="row d-flex">
      <div class="col-12">
        <h1 class="spcHeader">All Bugs</h1>
      </div>
    </div>
    <form @submit.prevent="addBug" class="d-flex">
      <div class="row col-10 justify-content-end">
        <div class="col-2">
          <input
            type="text"
            class="form-control"
            placeholder="Bug Title..."
            v-model="newBug.title"
            required
          />
        </div>
        <div class="col-2">
          <input
            type="text"
            class="form-control"
            placeholder="Bug Description..."
            v-model="newBug.description"
            required
          />
        </div>
      </div>
      <button type="submit" class="btn btn-success">REPORT!</button>
    </form>
    <div class="row d-flex justify-content-around boarder">
      <div class="col-3 textShadow">
        <h4 class="spcText"><b>Title</b></h4>
      </div>
      <div class="col-3 textShadow">
        <h4 class="spcText"><b>Reported by</b></h4>
      </div>
      <div class="col-3 textShadow">
        <h4 class="spcText"><b>Status</b></h4>
      </div>
      <div class="col-3 textShadow">
        <h4 class="spcText"><b>Last Modified</b></h4>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row d-flex justify-content-around">
        <div class="card col-10">
          <div class="row">
            <bugs-component
              class="bugRow"
              v-for="bug in bugs"
              :key="bug.id"
              :bugProp="bug"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import bugsComponent from "../components/BugComponent.vue";
export default {
  name: "Bugs",
  mounted() {
    this.$store.dispatch("getAllBugs");
  },
  data() {
    return {
      newBug: {
        title: "",
        description: "",
      },
    };
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
    },
  },
  methods: {
    addBug() {
      this.$store.dispatch("createBug", this.newBug);
      this.newBug = { title: "", description: "" };
    },
  },
  components: {
    bugsComponent,
  },
};
</script>


<style scoped>
.spcbackground {
  background-color:#F1FAEE;
}
.textShadow {
  text-shadow: 0.5px 0.5px #070404;
}
.spcHeader{
  font-size: 7vh;
}
.spcText{
  font-size: 3vh;
}
</style>
