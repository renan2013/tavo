<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDelete" />
    </div>
</template>

<script>
export default {
  name: 'CellRendererActions',
  methods: {
    confirmDelete() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar Borrado',
        text: `Desea borrar el registro "${this.params.data.NOM_CIA}"`,
        accept: this.deleteRecord,
        acceptText: 'Sí',
        cancelText: 'No'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose this.params.data.COD_CIA */
      this.dummySuccess()

      /* UnComment below lines for enabling true flow if deleting user */
      // this.$store.dispatch("userManagement/removeRecord", this.params.data.id)
      //   .then(()   => { this.showDeleteSuccess() })
      //   .catch(err => { console.error(err)       })
    },
    dummySuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'User Deleted',
        text: 'The selected user was successfully deleted'
      })
    }
  }
}
</script>
