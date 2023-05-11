<script setup lang="ts">
import axios from "axios";
import {UserProfile} from "~/types/user_profile";

const {data: membersData, status} = await axios.get("/api/admin/members")
if (status !== 200) {
    console.log("error in getting members", status)
    useRouter().push('/profile')
}
const members = membersData as UserProfile[]
console.log(members)
</script>

<template>
    <h2>ユーザー一覧</h2>
    <table id="data-table">
        <tr>
            <th>名前</th>
            <th>学籍番号</th>
            <th>Discord</th>
            <th>LINE</th>
        </tr>
        <tr v-for="m in members">
            <td>{{ m.last_name }} {{ m.first_name }}</td>
            <td>{{ m.student_id }}</td>
            <td>
                <img :src="m.discord_picture_url" alt="">
                {{ m.discord_username }}
            </td>
            <td><img :src="m.line_picture_url" alt="">
                {{ m.line_username }}
            </td>
        </tr>
    </table>
</template>

<style scoped lang="scss">
#data-table {
  border: 1px solid #e2e2e2;
  border-collapse: collapse;

  tr {
    height: 4em;
  }

  th, td {
    font-size: 1.2em;
    border: 1px solid #e2e2e2;

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