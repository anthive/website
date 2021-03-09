<template>
  <section class="page-wrap">
    <v-container>
      <AntHivePageHeader
        title="Style guide"
        subtitle="Components"
      />
      <AntHiveChart
        :chart-data="chartdata"
        :height="200"
        title="AntHive Chart plugin"
        class="mt-10"
      />
      <div class="component">
        <h4>AntHiveButton</h4>
        <p v-if="$options.components['AntHiveButton'].props">
          Props: {{ $options.components['AntHiveButton'].props }}
        </p>
        <div>
          <AntHiveButton>Dark</AntHiveButton>
          <AntHiveButton light>Light</AntHiveButton>
          <AntHiveButton color="red">Colored</AntHiveButton>
          <AntHiveButton tile>Tile</AntHiveButton>
        </div>
      </div>

      <div class="component">
        <h4>AntHiveIcon</h4>
        <p v-if="$options.components['AntHiveIcon'].props">
          Props: {{ $options.components['AntHiveIcon'].props }}
        </p>
        <div>
          <AntHiveIcon icon="twitter" small />
          <AntHiveIcon icon="twitter" medium />
          <AntHiveIcon icon="twitter" big />
          <AntHiveIcon icon="twitter" color="green" />
        </div>
      </div>

      <div class="component">
        <h4>AntHiveBotHorizontal</h4>
        <p v-if="$options.components['AntHiveBotHorizontal'].props">
          Props: {{ $options.components['AntHiveBotHorizontal'].props }}
        </p>
        <div class="d-flex">
          <AntHiveBotHorizontal
            v-for="(bot, index) in bots"
            :key="bot.displayName + index"
            :bot="bot"
            :number="index + 1"
            class="mr-4"
          />
        </div>
      </div>

      <div class="component">
        <h4>AntHiveBotVertical</h4>
        <p v-if="$options.components['AntHiveBotVertical'].props">
          Props: {{ $options.components['AntHiveBotVertical'].props }}
        </p>
        <div class="d-flex">
          <AntHiveBotVertical
            v-for="(bot, index) in bots"
            :key="index + 'bot'"
            :bot="bot"
            class="mr-4"
          />
        </div>
      </div>

      <div class="component">
        <h4>AntHiveAuthor</h4>
        <p v-if="$options.components['AntHiveAuthor'].props">Props: {{ $options.components['AntHiveAuthor'].props }}</p>
        <div>
          <AntHiveAuthor :date="Date.now()" author="Player" />
        </div>
      </div>

      <div class="component">
        <h4>AntHivePageHeader</h4>
        <p v-if="$options.components['AntHivePageHeader'].props">
          Props: {{ $options.components['AntHivePageHeader'].props }}
        </p>
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
/* eslint-disable max-len */
import AntHiveButton from '@/components/AntHiveButton'
import AntHiveIcon from '@/components/AntHiveIcon'
import AntHiveAuthor from '@/components/AntHiveAuthor'
import GamesTable from '@/components/GamesTable'
import AntHiveBotHorizontal from '@/components/AntHiveBotHorizontal'
import AntHivePageHeader from '@/components/AntHivePageHeader'
import AntHiveBotVertical from '@/components/AntHiveBotVertical'
import Image from '@/mixins/image'

export default {
  components: {
    AntHiveButton,
    AntHiveIcon,
    AntHiveAuthor,
    GamesTable,
    AntHiveBotHorizontal,
    AntHivePageHeader,
    AntHiveBotVertical
  },
  mixins: [Image],
  data() {
    return {
      chartdata: {
        labels: Array.from(new Array(50).keys()),
        datasets: [
          {
            fill: false,
            label: 'Bot One',
            backgroundColor: 'red',
            borderColor: 'red',
            data: new Array(50).fill().map(n => (Math.random() * 10))
          },
          {
            fill: false,
            label: 'Bot Two',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: new Array(50).fill().map(n => (Math.random() * 10))
          }
        ]
      },
      bots: [
        {
          id: 325,
          skin: 1,
          v: 1,
          displayName: 'Unplausive-Efficience',
          avatar: 'ant-234',
          userId: 234,
          lang: 'php',
          isActive: false,
          games: 0,
          wins: 0,
          losses: 0,
          mmr: 0,
          score: 100,
          art: 0,
          errors: 0
        },
        {
          id: 326,
          skin: 1,
          v: 1,
          displayName: 'Oaken-Exploder',
          avatar: 'ant-234',
          userId: 234,
          lang: 'go',
          isActive: false,
          games: 0,
          wins: 0,
          losses: 0,
          mmr: 0,
          score: 100,
          art: 0,
          errors: 0
        },
        {
          id: 418,
          skin: 1,
          v: 1,
          displayName: 'court-turn',
          avatar: '37ca8fa5-db28-4892-8ec4-bf78e33c236f',
          userId: 225,
          lang: 'js',
          isActive: true,
          games: 9,
          wins: 1,
          losses: 2,
          mmr: 99,
          score: 100,
          art: 820,
          errors: 27
        }
      ],
      users: [
        {
          id: 1,
          avatar: '27418530-f184-4693-8e56-8333d8546944',
          background: '',
          username: 'anthive',
          displayName: 'AntHive.IO',
          description: '',
          socials: {},
          score: 100,
          mmr: 200,
          bots: []
        },
        {
          id: 225,
          avatar: '8d207be3-2ecb-4363-b735-32d2c3653d64',
          background: '',
          username: 'ant-225',
          displayName: 'Vitaly Kezlya',
          description: '',
          socials: {},
          score: 100,
          mmr: 200,
          bots: []
        },
        {
          id: 283,
          avatar: 'ant-283',
          background: '',
          username: 'ant-283',
          displayName: '234',
          description: 'asdf',
          score: 100,
          mmr: 200,
          socials: {}
        }
      ]
    }
  }
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
