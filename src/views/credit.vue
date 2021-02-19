<template>
  <article class="panel">
    <p class="panel-heading">Solicitação de Crédito</p>
    <div class="panel-block">
      <section>
        <b-field label="Cliente" label-position="inside">
          <b-autocomplete
            :data="filteredDataArray"
            v-model="search_client"
            :open-on-focus="true"
            clearable
            field="name"
            @select="client_selected"
          >
            <template #empty>Nenhum cliente foi encontrado</template>
          </b-autocomplete>
        </b-field>

        <b-field label="Crédito" label-position="inside">
          <b-input v-model="value" v-currency :value="value"></b-input>
        </b-field>

        <div class="buttons">
          <b-button type="is-danger is-light" @click="clearForm()"
            >Limpar</b-button
          >
          <b-button :loading="loading" type="is-success" @click="submit()"
            >Salvar</b-button
          >
        </div>
      </section>
    </div>
  </article>
</template>

<script>
import { HTTP } from "../libaries/http-common";

export default {
  name: "client",
  data: () => {
    return {
      clients: [
        { id: 1, name: "Joao - 823948238904" },
        { id: 2, name: "Marcelo - 82322168" },
        { id: 3, name: "Maria - 12365687" },
        { id: 4, name: "Renata - 77898215" },
        { id: 5, name: "Lucas - 6518980" }
      ],
      client: null,
      value: "",
      search_client: "",
      loading: false
    };
  },
  computed: {
    filteredDataArray() {
      return this.clients.filter(option => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(this.search_client.toLowerCase()) >= 0
        );
      });
    }
  },
  methods: {
    client_selected(option) {
      this.client = option;
    },
    clearForm() {
      this.value = null;
      this.search_client = "";
      this.client = null;
    },
    submit() {
      if (this.loading) return;

      this.loading = true;
      const params = {
        client_id: this.client.id,
        value: parseFloat(this.value.toString().replace("R$", ""))
      };

      HTTP.post(`posts`, params)
        .then(response => {
          this.posts = response.data;
          this.loading = false;
          // this.clearForm()
          this.$buefy.notification.open({
            message: "Cadastrado com sucesso",
            type: "is-success"
          });
        })
        .catch(e => {
          this.loading = false;
          this.errors.push(e);

          this.$buefy.notification.open({
            message: "Ocorreu um erro",
            type: "is-danger"
          });
        });
    }
  }
};
</script>
