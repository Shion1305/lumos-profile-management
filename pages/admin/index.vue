<script lang="ts" setup>
import axios from 'axios'
import type { UserProfile } from '~/types/user_profile'

const members = await axios
  .get<UserProfile[]>('/api/admin/members')
  .then((res) => {
    const tableData = []
    for (const m of res.data) {
      tableData.push({
        name: `${m.last_name} ${m.first_name}`,
        student_id: m.student_id,
        discord_on_server: m.discord_on_server,
        discord_member_role: m.discord_member_role,
        line: m.line_username,
        line_img: m.line_picture_url,
        discord: m.discord_username,
        discord_nick: m.discord_nickname,
        discord_img: m.discord_picture_url,
        has_access: m.has_access
      })
    }
    return tableData
  })
  .catch((error) => {
    console.log('error in getting members', error)
    return []
  })
if (members.length === 0) useRouter().push('/profile')
</script>

<template>
  <h2>Members List</h2>
  <v-data-table
    class="rounded-lg"
    :headers="[
      { title: '名前', key: 'name' },
      { title: '学籍番号', key: 'student_id' },
      { title: 'LINE', key: 'line' },
      { title: 'Discord', key: 'discord' },
      { title: 'Admin', key: 'has_access' }
    ]"
    :items="members"
    :items-per-page="-1"
  >
    <template v-slot:header.discord>
      <div class="text-center font-weight-bold text-subtitle-1">Discord</div>
    </template>
    <template v-slot:header.line>
      <div class="text-center font-weight-bold text-subtitle-1">LINE</div>
    </template>
    <template v-slot:item.line="{ item }">
      <div class="d-flex flex-row pa-1 align-center">
        <v-img
          :src="item.line_img"
          class="rounded-circle flex-grow-0 mr-2"
          height="36"
          width="36"
        />
        <div class="line-label">{{ item.line }}</div>
      </div>
    </template>
    <template v-slot:item.discord="{ item }">
      <div class="d-flex flex-row pa-1 align-center">
        <v-img
          :src="item.discord_img"
          class="rounded-circle flex-grow-0 mr-2"
          height="36"
          width="36"
        />
        <div class="discord-label">{{ item.discord }}</div>
        <div class="discord-label">{{ item.discord_nick }}</div>
      </div>
    </template>
  </v-data-table>
</template>

<style lang="scss" scoped>
.line-label {
  width: 6rem;
  font-size: 0.8rem;
  display: -webkit-box;
  overflow: hidden;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}

.discord-label {
  width: 5rem;
  font-size: 0.8rem;
  display: -webkit-box;
  overflow: hidden;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
</style>
