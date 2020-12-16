<template>
  <section class="page-wrap">
    <v-container>
      <AntHivePageHeader
        title="Style guide"
        subtitle="Components"
      />
      <div class="component">
        <h4>AntHiveButton</h4>
        <p v-if="$options.components['AntHiveButton'].props">Props: {{ $options.components['AntHiveButton'].props }}</p>
        <div>
          <AntHiveButton>Dark</AntHiveButton>
          <AntHiveButton light>Light</AntHiveButton>
          <AntHiveButton color="red">Colored</AntHiveButton>
          <AntHiveButton tile>Tile</AntHiveButton>
        </div>
      </div>

      <div class="component">
        <h4>AntHiveIcon</h4>
        <p v-if="$options.components['AntHiveIcon'].props">Props: {{ $options.components['AntHiveIcon'].props }}</p>
        <div>
          <AntHiveIcon icon="twitter" small />
          <AntHiveIcon icon="twitter" medium />
          <AntHiveIcon icon="twitter" big />
          <AntHiveIcon icon="twitter" color="green" />
        </div>
      </div>

      <div class="component">
        <h4>AntHiveBotSmall</h4>
        <p v-if="$options.components['AntHiveBotSmall'].props">Props: {{ $options.components['AntHiveBotSmall'].props }}</p>
        <div>
          <AntHiveBotSmall
            v-for="(player, index) in players"
            :key="player.displayName + index"
            :avatar="player.avatar"
          />
        </div>
      </div>

      <div class="component">
        <h4>AntHiveBotHorizontal</h4>
        <p v-if="$options.components['AntHiveBotHorizontal'].props">Props: {{ $options.components['AntHiveBotHorizontal'].props }}</p>
        <div class="d-flex">
          <AntHiveBotHorizontal
            class="mr-4"
            v-for="(player, index) in players"
            :key="player.displayName + index"
            :bot="player"
            :number="index + 1"
          />
        </div>
      </div>

      <div class="component">
        <h4>AntHiveBotVertical</h4>
        <p v-if="$options.components['AntHiveBotVertical'].props">Props: {{ $options.components['AntHiveBotVertical'].props }}</p>
        <div class="d-flex">
          <AntHiveBotVertical
            class="mr-4"
            v-for="(player, index) in players"
            :key="player.displayName + index"
            :lang="player.lang"
            :name="player.displayName"
            :avatar="getAvatar(player.avatar, 100)"
            games="1234514"
            wins="2331"
          />
        </div>
      </div>

      <div class="component">
        <h4>AntHiveAuthor</h4>
        <p v-if="$options.components['AntHiveAuthor'].props">Props: {{ $options.components['AntHiveAuthor'].props }}</p>
        <div>
          <AntHiveAuthor author="Player" :date="Date.now()" />
        </div>
      </div>

      <div class="component">
        <h4>GamesLeaderCard</h4>
        <p v-if="$options.components['GamesLeaderCard'].props">Props: {{ $options.components['GamesLeaderCard'].props }}</p>
        <div>
          <GamesLeaderCard
            :key="player.displayName + index"
            v-for="(player, index) in players"
            :place="index + 1"
            :leader="player"
          />
        </div>
      </div>

      <div class="component">
        <h4>AntHivePageHeader</h4>
        <p v-if="$options.components['AntHivePageHeader'].props">Props: {{ $options.components['AntHivePageHeader'].props }}</p>
        <div>
          <AntHivePageHeader title="Title" />
          <br><br>
          <AntHivePageHeader
            title="With tooltip and subtitle"
            tooltip-text="Tooltip text"
            subtitle="Subtitle text"
          />
        </div>
      </div>

      <div class="component">
        <h4>AntHiveAchivement</h4>
        <p v-if="$options.components['AntHiveAchivement'].props">Props: {{ $options.components['AntHiveAchivement'].props }}</p>
        <div>
          <AntHiveAchivement
              v-for="(chip, index) in 3"
              :key="index + 'achivement'"
              :title="`Best bot 202${index}`"
              description="Javascript beginner"
            />
        </div>
      </div>

      <div class="component">
        <h4>GamesTable</h4>
        <p v-if="$options.components['GamesTable'].props">Props: {{ $options.components['GamesTable'].props }}</p>
        <div class="d-flex">
          <GamesTable :games-limit="5" />
        </div>
      </div>
    </v-container>
  </section>
</template>

<script>
import AntHiveButton from '@/components/AntHiveButton'
import AntHiveIcon from '@/components/AntHiveIcon'
import AntHiveAuthor from '@/components/AntHiveAuthor'
import GamesLeaderCard from '@/components/GamesLeaderCard'
import GamesTable from '@/components/GamesTable'
import AntHiveBotSmall from '@/components/AntHiveBotSmall'
import AntHiveBotHorizontal from '@/components/AntHiveBotHorizontal'
import AntHivePageHeader from '@/components/AntHivePageHeader'
import AntHiveAchivement from '@/components/AntHiveAchivement'
import AntHiveBotVertical from '@/components/AntHiveBotVertical'
import Image from '@/mixins/image'

export default {
  components: {
    AntHiveButton,
    AntHiveIcon,
    AntHiveAuthor,
    GamesLeaderCard,
    GamesTable,
    AntHiveBotSmall,
    AntHiveBotHorizontal,
    AntHivePageHeader,
    AntHiveAchivement,
    AntHiveBotVertical
  },
  data: () => ({
    players: [
      {
        id: 192,
        displayName: 'Player1',
        lang: 'go',
        avatar: 'ant-195',
        stats: {
          ants: 1,
          age: 1000,
          art: 116,
          hive: 1,
          score: 98,
          errors: 902
        }
      },
      {
        id: 193,
        displayName: 'Player2',
        lang: 'js',
        avatar: 'ant-190',
        stats: {
          ants: 21,
          age: 1000,
          art: 316,
          hive: 2,
          score: 198,
          errors: 102
        }
      }
    ]
  }),
  mixins: [Image]
}
</script>

<style lang="scss" scoped>
.component {
  margin-top: 100px;
}
.relative {
  position: relative;
}
</style>
