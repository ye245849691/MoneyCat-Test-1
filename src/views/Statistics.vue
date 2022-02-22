<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <ol>
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{ beautify(group.title) }}<span>￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id" class="record">
            <span class="tags" @click="showAllTags(item)">{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
            <div class="popup" v-show="showTags">
              <div class="logo">标签</div>
              <div class="allTags">{{ allTags }}</div>
              <div class="but"><span class="close" @click="closeTags">关闭</span></div>
            </div>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs},
})
export default class Statistics extends Vue {
  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.map(item => item.name).join('，');
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get recordList() {
    return (this.$store.state as RootStater).recordList;
  }

  get groupedList() {
    const {recordList} = this;
    if (recordList.length === 0) return [];
    const newList = (clone(recordList) as RecordItem[]).filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    type Result = { title: string, total?: number, items: RecordItem[] }[];
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    return result;
  }
  showTags=false;
  allTags="";
  showAllTags(item :RecordItem) {
    this.allTags=this.tagString(item.tags as Tag[]);
    this.showTags=true;
  }
  closeTags(){
    this.showTags=false;
  }


  type = '-';
  recordTypeList = recordTypeList;

};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

::v-deep .type-tabs-item {
  background: #c4c4c4;

  &.selected {
    color: $color-highlight;
    background: $background-highlight;

    &::after {
      display: none;
    }
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item;
}

.record {
  @extend %item;
  background: white;
}

.tags {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 50px;
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color:#999;
}

.popup {
  position: fixed;
  border-radius: 12px;
  background-color: #fff;
  top: 25%;
  left: 7.2%;
  width: 85.6%;
  height: 170px;
  z-index: 999;

}

.logo {
  display: block;
  background: $color-highlight;
  color: white;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  padding: 2.7% 0;
  margin: 0 auto;

}

.allTags {
  font-size: 24px;
  margin-top: 8%;
  width: 76%;
  margin-left: 12%;
  text-align: center
}

.but {
  margin-top: 10%;
}

.close {
  text-align: center;
  background: #ff7c50;
  display: block;
  width: 30.4%;
  margin: 0 auto;
  font-size: 16px;
  color: #fff;
  font-weight: 700;
  height: 36px;
  border-radius: 12px;
  line-height: 36px;
}
</style>