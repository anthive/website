<template>
  <section>
    <h1 class="text-center">Components</h1>
    <div class="mb-10">
      <h3>Name: AntHiveBtn</h3>
      <p v-if="$options.components['AntHiveBtn'].props">Props: {{ $options.components['AntHiveBtn'].props }}</p>
      <div class="relative">
        <AntHiveBtn>Dark</AntHiveBtn>
        <AntHiveBtn light>Light</AntHiveBtn>
        <AntHiveBtn color="red">Colored</AntHiveBtn>
        <AntHiveBtn tile>Tile</AntHiveBtn>
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: AntHiveIcon</h3>
      <p v-if="$options.components['AntHiveIcon'].props">Props: {{ $options.components['AntHiveIcon'].props }}</p>
      <div class="relative">
        <AntHiveIcon small>twitter</AntHiveIcon>
        <AntHiveIcon medium>twitter</AntHiveIcon>
        <AntHiveIcon big>twitter</AntHiveIcon>
        <AntHiveIcon color="green">twitter</AntHiveIcon>
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: GameLogPanel</h3>
      <p v-if="$options.components['GameLogPanel'].props">Props: {{ $options.components['GameLogPanel'].props }}</p>
      <div class="relative">
        <GameLogPanel />
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: GamePlayerList</h3>
      <p v-if="$options.components['GamePlayerList'].props">Props: {{ $options.components['GamePlayerList'].props }}</p>
      <div class="relative">
        <GamePlayerList :players="players" />
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: GamesAuthorChip</h3>
      <p v-if="$options.components['GamesAuthorChip'].props">Props: {{ $options.components['GamesAuthorChip'].props }}</p>
      <div class="relative">
        <GamesAuthorChip author="Player" :date="Date.now()" />
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: GamesLeaderCard</h3>
      <p v-if="$options.components['GamesLeaderCard'].props">Props: {{ $options.components['GamesLeaderCard'].props }}</p>
      <div class="relative">
        <GamesLeaderCard
          :key="player.displayName + index"
          v-for="(player, index) in players"
          :place="index + 1"
          :leader="player"
        />
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: GamesUserIcon</h3>
      <p v-if="$options.components['GamesUserIcon'].props">Props: {{ $options.components['GamesUserIcon'].props }}</p>
      <div class="relative">
        <GamesUserIcon
          v-for="(player, index) in players"
          :key="player.displayName + index"
          :player="player"
        />
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: GamesUserChip</h3>
      <p v-if="$options.components['GamesUserChip'].props">Props: {{ $options.components['GamesUserChip'].props }}</p>
      <div class="relative d-flex">
        <GamesUserChip
          class="mr-4"
          v-for="(player, index) in players"
          :key="player.displayName + index"
          :player="player"
          :number="index + 1"
        />
      </div>
    </div>

    <div class="mb-5">
      <h3>Name: TheHeader</h3>
      <p v-if="$options.components['TheHeader'].props">Props: {{ $options.components['TheHeader'].props }}</p>
      <div class="relative">
        <TheHeader />
      </div>
    </div>

    <div class="mb-10" style="margin-top: 100px">
      <h3 style="margin-bottom: 80px">Name: TheFooter</h3>
      <p v-if="$options.components['TheFooter'].props">Props: {{ $options.components['TheFooter'].props }}</p>
      <div class="relative">
        <TheFooter />
      </div>
    </div>

    <div class="mb-10 pt-10">
      <h3>Name: ThePageHeader</h3>
      <p v-if="$options.components['ThePageHeader'].props">Props: {{ $options.components['ThePageHeader'].props }}</p>
      <div class="relative">
        <ThePageHeader title="Title" />
        <br><br>
        <ThePageHeader
          title="With tooltip and subtitle"
          tooltip-text="Tooltip text"
          subtitle="Subtitle text"
        />
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: UserAchivementChip</h3>
      <p v-if="$options.components['UserAchivementChip'].props">Props: {{ $options.components['UserAchivementChip'].props }}</p>
      <div class="relative">
        <UserAchivementChip
            v-for="(chip, index) in 3"
            :key="index + 'achivement'"
            :title="`Best bot 202${index}`"
            description="Javascript beginner"
          />
      </div>
    </div>

    <div class="mb-10">
      <h3>Name: UserBotChip</h3>
      <p v-if="$options.components['UserBotChip'].props">Props: {{ $options.components['UserBotChip'].props }}</p>
      <div class="relative d-flex">
        <UserBotChip
          class="mr-4"
          v-for="(player, index) in players"
          :key="player.displayName + index"
          :lang="player.lang"
          :name="player.displayName"
          :avatar="`https://api.anthive.io/images/${player.avatar}/200/200`"
          games="1234514"
          wins="2331"
        />
      </div>
    </div>
    

    <!-- <div class="mb-10">
      <h3>Name: GamesTable</h3>
      <p v-if="$options.components['GamesTable'].props">Props: {{ $options.components['GamesTable'].props }}</p>
      <div class="relative d-flex">
        <GamesTable :games-limit="5" />
      </div>
    </div> -->

  </section>
</template>

<script>
import AntHiveBtn from '@/components/AntHiveBtn'
import AntHiveIcon from '@/components/AntHiveIcon'
import GameLogPanel from '@/components/GameLogPanel'
import GamePlayerList from '@/components/GamePlayerList'
import GamesAuthorChip from '@/components/GamesAuthorChip'
import GamesLeaderCard from '@/components/GamesLeaderCard'
// import GamesTable from '@/components/GamesTable'
import GamesUserIcon from '@/components/GamesUserIcon'
import GamesUserChip from '@/components/GamesUserChip'
import TheFooter from '@/components/TheFooter'
import TheHeader from '@/components/TheHeader'
import ThePageHeader from '@/components/ThePageHeader'
import UserAchivementChip from '@/components/UserAchivementChip'
import UserBotChip from '@/components/UserBotChip'

// to big components
// import GamePlayer from '@/components/GamePlayer'
// import HomeForWhom from '@/components/HomeForWhom'
// import HomeSlogan from '@/components/HomeSlogan'
// import HomeStatistics from '@/components/HomeStatistics'
// import DocsSidebar from '@/components/DocsSidebar'
// import SandboxEditor from '@/components/SandboxEditor'

// unused
// import AreaChart from '@/components/AreaChart'
// import UserChip from '@/components/UserChip'
// import UserInfoFull from '@/components/UserInfoFull'
// import GamesUserCard from '@/components/GamesUserCard'
export default {
  layout: 'blank',
  components: {
    AntHiveBtn,
    AntHiveIcon,
    // DocsSidebar
    GameLogPanel,
    // GamePlayer
    GamePlayerList,
    GamesAuthorChip,
    GamesLeaderCard,
    // GamesTable,
    // GamesUserCard
    GamesUserIcon,
    GamesUserChip,
    // HomeForWhom
    // HomeSlogan,
    // HomeStatistics,
    // SandboxEditor,
    TheFooter,
    TheHeader,
    ThePageHeader,
    UserAchivementChip,
    UserBotChip
    // UserChip,
    // UserInfoFull
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
  })
}
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
}
</style>
