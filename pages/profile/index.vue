<script lang="ts" setup>
import { fulfillsRequirements, UserProfile } from '~/types/user_profile'
import axios from 'axios'
import LineWidget from '~/components/LineWidget.vue'
import DiscordWidget from '~/components/DiscordWidget.vue'

const authorization = useCookie('authToken')
if (!authorization.value) {
  useRouter().push('/')
}
const query = useRoute().query
const code = query.code
if (code) {
  const postData = async () => {
    try {
      await axios.post(`/api/auth-line?code=${code}`)
    } catch (error) {
      console.error(error)
    }
  }
  await postData()
}
const info = await useFetch('/api/info')
if (info.error.value) {
  console.log('error in getting info', info.error)
  useRouter().push('/')
}

const user = info.data.value as UserProfile

const require_line = user.line_username === undefined
const editMode = ref(!fulfillsRequirements(user))

const saveAction = async () => {
  const postData = async () => {
    try {
      await axios.post(`/api/mutate`, user)
    } catch (error) {
      console.error(error)
    }
  }
  await postData()
  editMode.value = false
}
const enterEditMode = () => {
  editMode.value = true
}
</script>

<template>
  <h2>Hello, {{ user.discord_username }} さん!</h2>
  <hr />
  <div v-if="require_line" id="require_line">
    <h2>LINE連携: 未連携</h2>
    <p>最初に下のボタンからLINE連携をお願いします。</p>
    <LINEButton />
  </div>
  <div v-else-if="editMode" id="edit-pane">
    <table id="profile-table">
      <tr>
        <th>姓&emsp;(例: 市川)</th>
        <td>
          <input
            v-model="user.last_name"
            placeholder="ここに入力"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <th>名&emsp;(例: 詩恩)</th>
        <td>
          <input
            v-model="user.first_name"
            placeholder="ここに入力"
            type="text"
          />
        </td>
      </tr>
      <tr>
        <th>学籍番号&emsp;(例: 2164789)</th>
        <td>
          <input
            v-model="user.student_id"
            placeholder="ここに入力"
            type="text"
          />
        </td>
      </tr>
    </table>
    <button id="save-button" @click="saveAction">保存する</button>
  </div>
  <div v-else id="info-pane">
    <table id="profile-table">
      <tr>
        <th>姓</th>
        <td>{{ user.last_name }}</td>
      </tr>
      <tr>
        <th>名</th>
        <td>{{ user.first_name }}</td>
      </tr>
      <tr>
        <th>学籍番号</th>
        <td>{{ user.student_id }}</td>
      </tr>
    </table>
    <button id="edit-button" @click="enterEditMode">編集する</button>
    <div id="integrations">
      <LineWidget
        :iconURL="user.line_picture_url!!"
        :username="user.line_username!!"
      />
      <DiscordWidget
        :iconURL="user.discord_picture_url!!"
        :username="user.discord_username!!"
      />
    </div>
    <NuxtLink v-if="user.has_access === true" to="/admin" id="admin-link"
      >管理者ページへ</NuxtLink
    >
  </div>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin: 10px;
}

hr {
  width: 100%;
  border: 2px solid #fff3db;
  border-radius: 2px;
  margin: 10px 0;
}

#require_line {
  display: flex;
  align-items: center;
  flex-direction: column;
}

#profile-table {
  width: 100%;
  border-collapse: collapse;

  tr {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    th,
    td {
      box-sizing: border-box;
      width: calc(min(100%, 500px));
    }
  }

  th {
    max-width: max-content;
  }

  td {
    input {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      background: transparent;
      border: 1px solid #fff3db;
      font-size: 1.2em;
      padding: 0.5em;
      border-radius: 0.5em;
      color: #fff3db;
    }
  }
}

#edit-pane,
#info-pane {
  display: flex;
  flex-direction: column;

  #save-button,
  #edit-button {
    background: #fff3db;
    font-size: 1.2em;
    color: #2e2f3f;
    padding: 0.5em 1em;
    border-radius: 0.5em;
    font-weight: bold;
    margin: 0 auto;
  }
}

#integrations {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
}

#admin-link {
  margin: 0 auto;
  display: block;
  background: #fff3db;
  font-size: 1.2em;
  color: #2e2f3f;
  padding: 0.5em 1em;
  border-radius: 0.5em;
  font-weight: bold;
  text-decoration: none;
}
</style>
