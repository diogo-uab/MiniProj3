<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Patrocinador" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
              <select
                id="sltGroup"
                class="form-control form-control-lg"
                v-model="animal"
                required
              >
                <option value>-- SELECIONA ANIMAL --</option>
                <option
                  v-for="animal in animalList"
                  :key="animal._id"
                  :value="animal._id"
                >
                  {{ animal.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <input
                v-model="photo"
                type="url"
                class="form-control form-control-lg"
                id="txtPhoto"
                placeholder="escreve link para foto ou logótipo"
                required
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <router-link
              :to="{ name: 'listSponsors' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
              ><i class="fas fa-window-close"></i> CANCELAR</router-link
            >
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      animal: "",
      photo: "",
      animalList: []
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getMessage"]),
    ...mapGetters("animal", ["getAnimals"])
  },
  methods: {
    add() {
      this.$store
        .dispatch(`sponsor/${ADD_SPONSOR}`, {
          name: this.name,
          animal: this.animal,
          photo: this.photo
        })
        .then(
          () => {
            this.$alert(this.getMessage, "Patrocinador adicionado!", "success");
            router.push({ name: "listSponsors" });
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
    }
  },
  created() {
    this.$store.dispatch(`animal/${FETCH_ANIMALS}`).then(
      () => {
        this.animalList = this.getAnimals;
      },
      err => {
        this.$alert(`${err.message}`, "Erro", "error");
      }
    );
  }
};
</script>
