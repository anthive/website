<template lang="pug">
    section
        v-container.mt-n12
            v-row(justify-center)
                v-col.pa-2.justify-left(cols="12" md="4")
                    v-card.elevation-6.white(height='100%')
                        v-card-text.pb-0
                            v-row.justify-space-between.wrap.pa-2
                                v-avatar.lighten-1(size='45', color='brown')
                                    v-card-text.title.white--text(pa-0) 1
                                v-icon.orange--text.text--lighten-2(x-large) cloud_download
                        v-card-title.pt-3.display-1.font-weight-thin Get a sample bot
                        v-card-text.subheading
                            | Choose coding language that you prefer. Git clone sample repository or 
                            a(href='https://github.com/new/import', style='color: blue;') import
                            |   it. You can choose sample from next languages.
                        div.text-xs-left.px-3.py-3
                            v-chip.mr-1.brown.lighten-2.white--text(href='https://github.com/anthive/js', target='_blank') JS
                            v-chip.mr-1.brown.lighten-2.white--text(href='https://github.com/anthive/python', target='_blank') Python
                            v-chip.mr-1.brown.lighten-2.white--text(href='https://github.com/anthive/go', target='_blank') Go
                            v-chip.mr-1.brown.lighten-2.white--text(href='https://github.com/anthive/cpp', target='_blank') C++
                            v-chip.mr-1.brown.lighten-2.white--text(href='https://github.com/anthive/php', target='_blank') PHP
                v-col.pa-2.justify-left(cols="12" md="4")
                    v-card.elevation-6.white(height='100%')
                        v-card-text.pb-0
                            v-row.justify-space-between.wrap.pa-2
                                v-avatar.lighten-1(size='45', color='brown')
                                    v-card-text.title.white--text(pa-0) 2
                                v-icon.orange--text.text--lighten-2(x-large) insert_link
                        v-card-title.pt-3.display-1.font-weight-thin Link your repo
                        v-card-text.subheading
                            | In your repository set your username in ANTHIVE file. Link your repository in profile settings page.
                        v-btn.ma-3(href='https://profile.anthive.io/login/', color='brown white--text') Profile
                v-col.pa-2.justify-left(cols="12" md="4")
                    v-card.elevation-6.white(height='100%')
                        v-card-text.pb-0
                            v-row.justify-space-between.wrap.pa-2
                                v-avatar.lighten-1(size='45', color='brown')
                                    v-card-text.title.white--text(pa-0) 3
                                v-icon.orange--text.text--lighten-2(x-large) flash_on
                        v-card-title.pt-3.display-1.font-weight-thin Code strategies code
                        v-card-text.subheading
                            | Refactor code with your own strategies. Git push to origin. Start games, compete and climb the 
                            a(href='/leaderboard/', style='color: blue;') leaderboard
                            | .
                        v-btn.ma-3(to='/rules/', color='brown white--text') Rules
</template>

<script>
export default {
    data: () => ({
    }),
    mounted() {
    },
    components: {
    }
}
</script>

<style>
a { 
    text-decoration: none;
} 
</style>