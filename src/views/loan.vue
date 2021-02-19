<template>
  <article class="panel">
    <p class="panel-heading">Solicitação de Empréstimo</p>
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
          <b-select v-model="credit_id">
            <option
              v-for="option in credits"
              :value="option.id"
              :key="option.id"
            >
              {{ option.created_at }} - {{ option.value }}: {{ option.remain }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Parcelamento" label-position="inside">
          <b-input
            placeholder="12"
            v-model="subdivision"
            :value="subdivision"
          ></b-input>
        </b-field>

        <b-field label="Juros" label-position="inside">
          <b-input
            placeholder="1.5"
            v-model="interest"
            :value="interest"
          ></b-input>
        </b-field>

        <b-table :data="loan" :striped="true" :hoverable="true">
          <b-table-column
            field="id"
            label="Vencimento"
            width="40"
            date
            v-slot="props"
          >
            {{ props.row.due_date }}
          </b-table-column>

          <b-table-column
            field="value"
            label="Valor"
            width="40"
            numeric
            v-slot="props"
          >
            {{ props.row.value }}
          </b-table-column>
        </b-table>

        <div class="buttons">
          <b-button type="is-primary" @click="submit(true)">Simular</b-button>
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
      search_client: "",
      credit_id: null,
      credits: [],
      subdivision: null,
      interest: null,
      loan: [
        { due_date: "2020-01-01", value: 1000 },
        { due_date: "2020-01-01", value: 1000 },
        { due_date: "2020-01-01", value: 1000 },
        { due_date: "2020-01-01", value: 1000 },
        { due_date: "2020-01-01", value: 1000 }
      ],
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

      // request credits
      this.credits = [
        { id: 1, created_at: "2021-01-01", value: 10000, remain: 10000 },
        { id: 2, created_at: "2021-01-02", value: 10000, remain: 500 }
      ];
    },
    clearForm() {
      this.value = null;
      this.search_client = "";
      this.client = null;
    },
    submit(preview = false) {
      if (this.loading) return;

      this.loading = true;
      const params = {
        client_id: this.client.id,
        credit_id: this.credit_id,
        subdivision: this.subdivision,
        interest: this.interest,
        preview: preview
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
