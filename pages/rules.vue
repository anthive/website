<template lang="pug">
  section#inspire.rules
    v-navigation-drawer(:clipped='$vuetify.breakpoint.lgAndUp' app)
      v-list(dense)
        template(v-for='(item, index) in items')
          v-list-group(v-if='item.children' :key='item.text' :prepend-icon="item.icon")
            template(v-slot:activator)
              v-list-item-content
                v-list-item-title
                  | {{ item.text }}
            v-list-item(v-for='(child, i) in item.children', :key='i', link @click="$vuetify.goTo($refs[`rule${child.id}`])")
              v-list-item-content
                v-list-item-title.list-children
                  | {{ child.text }}
          v-list-item(v-else :key='item.text' link)
            v-list-item-action
              v-icon {{ item.icon }}
            v-list-item-content
              v-list-item-title
                | {{ item.text }}
    v-container
      section
        .headline.brown--text Chapter 1
        .title(ref="rule1") Rule 1
        p
          | Lorem ipsum dolor sit amet, consectetur 
          kbd npm install vuetify
          |  adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at. 
        .title(ref="rule2") Rule 2
        p 
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          code &lt;code&gt;
          |  Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        .title(ref="rule3") Rule 3
        p 
          var v = u * e
        |Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.
      section
        .headline.brown--text Chapter 2
        .title(ref="rule4") Rule 4
        p 
          | Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores m 
          kbd
            | sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab a 
            code &lt;project name&gt;
            |  and runm veniam, expedita quis laboriosam, ullam faodi quidem veniam, expedita quis laboriosam, ulla
        .title(ref="rule5") Rule 5
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.
        .title(ref="rule6") Rule 6
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.
      section
        .headline.brown--text Chapter 3
        .title(ref="rule7") Rule 7
        p Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo nupedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.
        .title(ref="rule8") Rule 8
        p Lorem ipsum dolor sit amet, consectetur uptate sapiente corrupti asperiores rem nemo numquam fuga ab at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.
        .title(ref="rule9") Rule 9
        p Lorem ipsum dolor sit amet, consectetur adpiente corrupti asperiores rem nemo numquam fuga ab at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.
        .title(ref="rule10") Rule 10
        p Lorem ipsum dolor sit amet, consectetur adipis
        .title(ref="rule11") Rule 11
        p Lorem ipsum dolor sit amet, consectetur adpiente corrupti asperiores rem nemo numquam fuga ab at. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum maiores modi quidem veniam, expedita quis laboriosam, ullam facere adipisci, iusto, voluptate sapiente corrupti asperiores rem nemo numquam fuga ab at.
        .title(ref="rule12") Rule 12
        p Lorem ipsum dolor sit amet, consectetur adipis
</template>

<script>
export default {
  data: () => ({
    items: [
      { icon: 'mdi-contacts', text: 'Chapter 1' },
      {
        icon: 'mdi-settings',
        text: 'Chapter 2',
        children: [{ id: 1, text: 'Rule 1' }, { id: 2, text: 'Rule 2' }, { id: 3, text: 'Rule 3' }]
      },
      {
        icon: 'mdi-keyboard',
        text: 'Chapter 3',
        children: [{ id: 4, text: 'Rule 1' }, { id: 5, text: 'Rule 2' }, { id: 6, text: 'Rule 3' }]
      },
      {
        icon: 'mdi-history',
        text: 'Chapter 4',
        children: [{ id: 7, text: 'Rule 1' }, { id: 8, text: 'Rule 2' }, { id: 9, text: 'Rule 3' }]
      },
      {
        icon: 'mdi-content-copy',
        text: 'Chapter 5',
        children: [{ id: 10, text: 'Rule 1' }, { id: 11, text: 'Rule 2' }, { id: 12, text: 'Rule 3' }]
      }
    ]
  })
}
</script>

<style scoped>
.rules {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}

.rules .list-children {
  padding-left: 58px;
}
</style>
