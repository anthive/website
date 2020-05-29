<template>
  <div class="user-info-full elevation-6 d-flex">
    <v-card
      class="user-info-full__card elevation-3 pa-2"
      :to="{ path: '/user/?username=' + us.Username }"
      color="#fff"
      tile
    >
      <v-row class="px-3">
        <p class="user-info-full__number primary--text">{{ number }}</p>
        <v-col class="pa-0 ml-2" cols="7">
          <div class="d-flex">
            <v-avatar class="py-4 user-info-full__avatar" size="60">
              <v-img class="grey lighten-4" :src="us.photoUrl(100)"></v-img>
            </v-avatar>
            <v-avatar class="user-info-full__ant-img ml-n4" size="32">
              <v-img :src="us.antUrl(true)"> </v-img>
            </v-avatar>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-expand-transition>
      <v-card
        class="user-info-full__statistic"
        color="#fff"
        tile
        :class="{ opened: isOpened }"
      >
        <div
          class="statistic-key user-info-full__statistic-value pa-4 pb-1 mx-auto text-left f-rubik f-text primary--text"
        >
          {{ us.Username }}
        </div>
        <div class="pa-4 pt-1 tb-1 subtitle-1 font-weight-medium">
          <div class="d-flex user-info-full__statistic-container">
            <v-col class="col-4 pa-0">
              <v-card-text class="pa-0 body-2"
                ><span class="user-info-full__statistic-key primary--text  mr-1">{{
                  $t("infoSpan")
                }}</span
                ><span class="statistic-key user-info-full__statistic-value accent--text "
                  >Y{{ player.Y }}, X{{ player.X }}</span
                ></v-card-text
              >
              <v-card-text class="pa-0 body-2"
                ><span class="user-info-full__statistic-key primary--text  mr-1">{{
                  $t("infoTicks")
                }}</span
                ><span class="statistic-key user-info-full__statistic-value accent--text ">{{
                  player.Stats.Age
                }}</span></v-card-text
              >
            </v-col>
            <v-col class="col-4 pa-0">
              <v-card-text class="pa-0 body-2"
                ><span class="user-info-full__statistic-key primary--text  mr-1">{{
                  $t("infoAnts")
                }}</span
                ><span class="statistic-key user-info-full__statistic-value accent--text ">{{
                  player.Stats.Ants
                }}</span></v-card-text
              >
              <v-card-text class="pa-0 body-2"
                ><span class="user-info-full__statistic-key primary--text  mr-1">{{
                  $t("infoHiveSize")
                }}</span
                ><span class="statistic-key user-info-full__statistic-value accent--text ">{{
                  player.Stats.Hive
                }}</span></v-card-text
              >
            </v-col>
            <v-col class="col-4 pa-0">
              <v-card-text class="pa-0 body-2"
                ><span class="user-info-full__statistic-key primary--text  mr-1">{{
                  $t("infoErrors")
                }}</span
                ><span class="statistic-key user-info-full__statistic-value accent--text ">{{
                  player.Stats.Errors
                }}</span></v-card-text
              >
              <v-card-text class="pa-0 body-2"
                ><span class="user-info-full__statistic-key primary--text  mr-1">{{
                  $t("infoEarned")
                }}</span
                ><span class="statistic-key user-info-full__statistic-value accent--text ">{{
                  player.Wealth
                }}</span></v-card-text
              >
            </v-col>
          </div>
          <div class="user-info-full__statistic-info-badges">
            <v-col class="pa-1">
              <v-avatar class="elevation-6" size="30" color="white"
                ><span class="caption font-weight-bold"
                  >v.{{ us.Version }}</span
                ></v-avatar
              >
            </v-col>
            <v-col class="pa-1">
              <v-avatar class="elevation-6" size="30">
                <v-img :src="us.langUrl(us.Lang)"></v-img>
              </v-avatar>
            </v-col>
          </div>
        </div>
      </v-card>
    </v-expand-transition>
  </div>
</template>


<script>
import { User } from '@/services/User'
export default {
  name: 'usersInfo',
  props: {
    player: Object,
    locale: String,
    number: Number,
    isOpened: Boolean
  },
  data: () => ({
    us: null,
    showBotInfo: false
  }),
  created() {
    this.us = new User()
    this.us.initUser(this.player)
  },
  watch: {
    player() {
      this.us = new User()
      this.us.initUser(this.player)
    }
  }
}
</script>

<style>
.user-info-full {
  display: inline-block;
}
@media screen and (max-width: 997px) {
  .user-info-full {
    flex-direction: column;
  }
}
.user-info-full__number {
  position: absolute;
}
.user-info-full__avatar {
  box-sizing: content-box;
}
.user-info-full__statistic.opened {
  display: block;
  width: 460px;
}
@media screen and (max-width: 997px) {
  .user-info-full__statistic.opened {
    width: 297px;
  }
}
.user-info-full__statistic {
  display: none;
  width: 0;
}
@media screen and (max-width: 997px) {
  .user-info-full__statistic-container {
    flex-direction: column;
  }
}
.user-info-full__statistic-key primary--text {
}
.statistic-key user-info-full__statistic-value accent--text {
}
.user-info-full__statistic-info-badges {
  position: absolute;
  top: 10px;
  right: 5px;
  display: flex;
}
.user-info-full__ant-img {
  background-color: white;
  border: 2px solid #26262680;
  background: #e1567c0d;
  box-sizing: border-box;
}
.user-info-full__meta-item-title {
  display: inline-block;
  width: 90px;
  margin-right: 5px;
  font-size: 14px;
  padding-top: 6px;
}
</style>
