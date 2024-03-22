<script lang="ts" setup>
import axios from 'axios'
import type { UserProfile } from '~/types/user_profile'

const members: UserProfile[] = await axios
  .get<UserProfile[]>('/api/admin/members')
  .then((res) => res.data)
  .catch((error) => {
    console.log('error in getting members', error)
    return []
  })
if (members.length === 0) useRouter().push('/profile')
</script>

<template>
  <h2>Members List</h2>
  <div id="table-area">
    <table id="data-table">
      <tr>
        <th>名前</th>
        <th>学籍番号</th>
        <th>LINE</th>
        <th>Discord</th>
        <th>Joined</th>
        <th>Nickname</th>
        <th>Role</th>
      </tr>
      <tr v-for="m in members as UserProfile[]">
        <td>{{ m.last_name }} {{ m.first_name }}</td>
        <td>{{ m.student_id }}</td>
        <td>
          <img :src="m.line_picture_url" alt="" />
          {{ m.line_username }}
        </td>
        <td>
          <img :src="m.discord_picture_url" alt="" />
          {{ m.discord_global_name ?? m.discord_username }}
        </td>
        <td>
          {{ m.discord_on_server ? '✅' : '❌' }}
        </td>
        <td>
          {{ m.discord_nickname }}
        </td>
        <td>
          {{ m.discord_member_role ? '✅' : '❌' }}
        </td>
      </tr>
    </table>
  </div>
</template>

<style lang="scss" scoped>
h2 {
  text-align: center;
}

#table-area {
  max-width: 100%;
  overflow-x: auto;
}

#data-table {
  max-width: 90vw;
  overflow-x: scroll;
  border: 1px solid #e2e2e2;
  border-collapse: collapse;

  th,
  td {
    font-size: 1.2em;
    border: 1px solid #e2e2e2;
    padding: 0.7em;

    > * {
      vertical-align: middle;
    }

    > img {
      border-radius: 50%;
      height: 2em;
    }
  }
}
</style>
