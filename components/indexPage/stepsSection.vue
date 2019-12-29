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
                        v-card-title.pt-3.display-1.font-weight-thin {{ $t('step1Title') }}
                        v-card-text.subheading
                            | {{ $t('step1Text1') }} 
                            a(href='https://github.com/new/import', style='color: blue;') {{ $t('import') }}
                            |  {{ $t('step1Text2') }}  
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
                        v-card-title.pt-3.display-1.font-weight-thin {{ $t('step2Title') }}
                        v-card-text.subheading
                            | {{ $t('step2Text') }} 
                        v-btn.ma-3(href='https://profile.anthive.io/login/', color='brown white--text') {{ $t('profile') }}
                v-col.pa-2.justify-left(cols="12" md="4")
                    v-card.elevation-6.white(height='100%')
                        v-card-text.pb-0
                            v-row.justify-space-between.wrap.pa-2
                                v-avatar.lighten-1(size='45', color='brown')
                                    v-card-text.title.white--text(pa-0) 3
                                v-icon.orange--text.text--lighten-2(x-large) flash_on
                        v-card-title.pt-3.display-1.font-weight-thin {{ $t('step3Title') }}
                        v-card-text.subheading
                            | {{ $t('step3Text') }}  
                            a(href='/leaderboard/', style='color: blue;') {{ $t('step3leaderboard') }} 
                            | .
                        v-btn.ma-3(to='/rules/', color='brown white--text') {{ $t('rules') }}
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
    a{ 
		text-decoration: none;
	} 
</style>