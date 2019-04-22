<template>
  <q-page class="row justify-center">
    <div style="width: 100%; max-width: 100vw;">
      <q-collapsible indent collapse-icon="sentiment_satisfied" icon="mail" label="Inbox" sublabel="5 unread emails" opened>
        <q-collapsible indent icon="receipt" label="Receipts">
          <q-collapsible label="Today">
            <div>{{ lorem }}</div>
          </q-collapsible>
          <q-collapsible label="Yesterday">
            <div>{{ lorem }}</div>
          </q-collapsible>
        </q-collapsible>

        <q-collapsible indent icon="schedule" label="Postponed">
          <div>{{ lorem }}</div>
        </q-collapsible>
      </q-collapsible>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageGroups',
  data() {
    return {
      lorem:"12312"
    }
  },
}
</script>

<style>
</style>
