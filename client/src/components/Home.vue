<template>
  <div id="app" text-align: center>
      <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true,
      }"
      :pagination-options="{
        enabled: true,
        perPage: 5,
      }"
      styleClass="vgt-table striped bordered"/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data () {
    return {
      columns: [
        {
          label: 'Name',
          field: 'name',
          filterOptions: {
            enabled: true
          }
        },
        {
          label: 'stars',
          field: 'starsCount',
          type: 'number'
        }
      ],
      rows: []
    }
  },
  mounted () {
    axios({ method: 'GET', 'url': 'http://localhost:8081/' }).then(result => {
      console.log(result.data)
      this.rows = result.data
    }, error => {
      console.error(error)
    })
  },
  methods: {
  }
}
</script>
