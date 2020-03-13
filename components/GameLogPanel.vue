<template lang="pug">
.log-panel__wrap(class="mt-3")
	v-tabs(dark hide-slider) 
		v-tab(ripple='' dark)
			| Requests
		v-tab(ripple='' dark)
			| Response
		v-tab(ripple='' dark)
			| Logs
		v-tab-item
			v-card(flat='' dark)
			v-card-text
				pre.log-panel__text Requests go here...
		v-tab-item
			v-card(flat='' dark)
			v-card-text 
				pre.log-panel__text Response go here...
		v-tab-item
			v-card(flat='' dark)
			v-card-text
				pre.log-panel__text Logs go here...
</template>

<script>
export default {
  name: 'GameLogPanel'
}
</script>

<style>
.log-panel__wrap {
  height: 476px;
  background-color: #262626;
}

.log-panel__wrap > .v-tabs {
  height: 100%;
}

.log-panel__wrap .v-tabs-items {
  height: 90%;
  background-color: #191919;
  overflow: auto;
}
.log-panel__wrap .v-card__text {
  background-color: #191919;
}

.log-panel__wrap .v-slide-group__wrapper {
  background: #343434;
  align-items: center;
}

.log-panel__wrap .v-tab {
  border: 2px solid #474747;
  margin: 0 10px;
  text-transform: none;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #595959 !important;
}

.log-panel__wrap .v-tab--active {
  background: #595959;
  border: 1px solid #404040;
  color: #ffffff !important;
}

.log-panel__wrap .v-slide-group__content {
  height: 35px;
  margin: 0 10px;
}

.log-panel__text {
  font-family: Consolas;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
}
</style>
