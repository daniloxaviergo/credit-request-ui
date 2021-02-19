<template>
  <article class="panel">
    <p class="panel-heading">Novo Cliente</p>
    <div class="panel-block">
      <section>
        <b-field label="Razão Social" label-position="inside">
          <b-input v-model="name" :value="name"></b-input>
        </b-field>
        <b-field label="CNPJ" label-position="inside">
          <b-input v-model="cnpj" :value="cnpj"></b-input>
        </b-field>
        <div class="buttons">
          <b-button type="is-success" outlined @click="addAddress()">
            +
          </b-button>
          <div class="label">Endereços</div>
        </div>
        <b-field v-for="address in addresses" :key="address.id">
          <b-input v-model="address.value" :value="address.value"></b-input>
        </b-field>
        <div class="buttons">
          <b-button type="is-success" outlined @click="addPhone()">
            +
          </b-button>
          <div class="label">Telefones</div>
        </div>
        <b-field v-for="phone in phones" :key="phone.id">
          <b-input v-model="phone.value" :value="phone.value"></b-input>
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
      name: "",
      cnpj: "",
      addresses: [{ id: "a1", value: "" }],
      phones: [{ id: "p1", value: "" }],
      loading: false
    };
  },
  methods: {
    addAddress() {
      return this.addresses.push({
        id: `a${this.addresses.length + 1}`,
        value: ""
      });
    },
    addPhone() {
      return this.phones.push({ id: `p${this.phones.length + 1}`, value: "" });
    },
    clearForm() {
      this.name = "";
      this.cnpj = "";
      this.addresses = [{ id: "a1", value: "" }];
      this.phones = [{ id: "a1", value: "" }];
    },
    submit() {
      if (this.loading) return;

      this.loading = true;
      const params = {
        name: this.name,
        cnpj: this.cnpj,
        addresses: this.addresses,
        phones: this.phones
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
