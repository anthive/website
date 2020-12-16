<template>
  <div class="page-header">
    <h1 class="page-header__title">{{ title }}</h1>
    <p v-if="subtitle" class="page-header__subtitle">{{ subtitle }}</p>
    <div v-if="tooltipText" class="page-header__info">
      <v-tooltip right nudge-left color="accent" content-class="b-radius-0">
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <AntHiveIcon icon="alert-circle" class="ml-1" small color="#4c377f" />
          </div>
        </template>
        {{ tooltipText }}
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'AntHivePageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false,
      default: ''
    },
    tooltipText: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    AntHiveIcon
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.page-header {
  position: relative;
  display: inline-block;

  &__subtitle {
    color: $color-violet-600;
    font-weight: 400;
  }

  &__info {
    position: absolute;
    top: -5px;
    right: -26px;
  }
}
</style>
