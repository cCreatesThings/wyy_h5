<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
const userStore = useUserStore()

const quickAccessItems = [
  { icon: 'mdi:clock-outline', label: '最近' },
  { icon: 'mdi:folder-outline', label: '本地' },
  { icon: 'mdi:cloud-outline', label: '云盘' },
  { icon: 'mdi:shopping-outline', label: '已购' },
  { icon: 'mdi:apps', label: '更多' }
]
const router = useRouter()
const gotoUserInfo = () => {
  router.push('/userInfo')
}
</script>
<template>
  <div class="personal-center">
    <!-- Header -->
    <header class="header">
      <Icon icon="mdi:menu" class="icon" />
      <button class="add-status">+ 添加状态</button>
      <div class="header-right">
        <Icon icon="mdi:magnify" class="icon" />
        <Icon icon="mdi:dots-vertical" class="icon" />
      </div>
    </header>

    <!-- Profile Info -->
    <div class="profile-info">
      <van-image
        @click="gotoUserInfo"
        round
        width="20vw"
        height="20vw"
        :src="userStore.userDetail?.profile.avatarUrl"
      />
      <h1 class="username" @click="gotoUserInfo">
        {{ userStore.userDetail.profile.nickname }}
      </h1>
      <div class="badges">
        <span class="badge ip-badge">
          <span class="dot"></span>
          IP 绑定
        </span>
        <span class="badge">音符捕捉手</span>
      </div>
      <p class="user-details">2枚徽章 | 湖北 武汉 · ♂ 00后 双鱼座 · 村龄4年</p>
      <div class="stats">
        <div class="stat-item">
          <p class="stat-value">3</p>
          <p class="stat-label">关注</p>
        </div>
        <div class="stat-item">
          <p class="stat-value">0</p>
          <p class="stat-label">粉丝</p>
        </div>
        <div class="stat-item">
          <p class="stat-value">Lv.{{ userStore.userDetail.level }}</p>
          <p class="stat-label">等级</p>
        </div>
        <div class="stat-item">
          <p class="stat-value">34时</p>
          <p class="stat-label">听歌</p>
        </div>
      </div>
    </div>

    <!-- Quick Access Buttons -->
    <div class="quick-access">
      <button
        v-for="(item, index) in quickAccessItems"
        :key="index"
        class="quick-access-btn"
      >
        <Icon :icon="item.icon" class="icon" />
        <span>{{ item.label }}</span>
      </button>
    </div>

    <!-- Tabs and Content -->
    <div class="content-area">
      <!-- <div class="tabs">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="['tab-btn', { active: activeTab === index }]"
          @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div> -->
      <van-tabs>
        <van-tab title="音乐">
          <div class="tab-content">
            <div class="section-header">
              <span>近期</span>
              <span class="created-count">创建1</span>
            </div>
            <div class="playlist-item">
              <van-image
                width="15vw"
                height="15vw"
                src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
              />
              <div class="playlist-info ml-[3.3vw]">
                <h3>我喜欢的音乐</h3>
                <p>70首 155次播放</p>
              </div>
              <button class="heart-mode-btn">心动模式</button>
            </div>
            <div class="playlist-item">
              <div class="playlist-icon">
                <Icon
                  icon="mdi:chart-bar"
                  class="text-[#fff] bg-[#f6864e] w-[100%] h-[100%]"
                />
              </div>
              <div class="playlist-info">
                <h3>听歌排行</h3>
                <p>累计听歌{{ userStore.userDetail.listenSongs }}首</p>
              </div>
              <Icon icon="mdi:dots-vertical" class="icon" />
            </div>
            <div class="playlist-item">
              <div class="playlist-icon create-playlist">
                <Icon icon="mdi:plus" class="icon" />
              </div>
              <div class="playlist-info">
                <h3>新建歌单</h3>
              </div>
            </div>
            <div class="playlist-item">
              <div class="playlist-icon import-playlist">
                <Icon icon="mdi:import" class="icon" />
              </div>
              <div class="playlist-info">
                <h3>导入外部歌单</h3>
              </div>
            </div>
          </div></van-tab
        >
        <van-tab title="播客">内容 2</van-tab>
        <van-tab title="动态">内容 3</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.personal-center {
  background-color: #4a4a4a;
  color: white;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  padding-bottom: 15vw; // Space for bottom navigation
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4vw;

  .add-status {
    font-size: 3.5vw;
    background: none;
    border: none;
    color: white;
  }

  .header-right {
    display: flex;
    gap: 4vw;
  }
}

.profile-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 4vw;

  .avatar {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
  }

  .username {
    font-size: 5vw;
    font-weight: bold;
    margin-top: 3vw;
  }

  .badges {
    display: flex;
    gap: 2vw;
    margin-top: 2vw;

    .badge {
      font-size: 2.5vw;
      padding: 1vw 2vw;
      border-radius: 4vw;
      background-color: rgba(255, 255, 255, 0.2);

      &.ip-badge {
        .dot {
          display: inline-block;
          width: 1.5vw;
          height: 1.5vw;
          background-color: red;
          border-radius: 50%;
          margin-right: 1vw;
        }
      }
    }
  }

  .user-details {
    font-size: 3vw;
    color: #ccc;
    margin-top: 2vw;
  }

  .stats {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 4vw;

    .stat-item {
      text-align: center;

      .stat-value {
        font-size: 3.5vw;
        font-weight: bold;
      }

      .stat-label {
        font-size: 3vw;
        color: #ccc;
      }
    }
  }
}

.quick-access {
  display: flex;
  justify-content: space-around;
  margin-top: 6vw;

  .quick-access-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    color: white;

    .icon {
      font-size: 6vw;
      margin-bottom: 1vw;
    }

    span {
      font-size: 2.5vw;
    }
  }
}

.content-area {
  margin-top: 6vw;
  background-color: white;
  border-top-left-radius: 3vw;
  border-top-right-radius: 3vw;
  padding: 4vw;
  color: #333;

  .tabs {
    display: flex;
    justify-content: space-around;
    margin-bottom: 4vw;

    .tab-btn {
      font-size: 4vw;
      font-weight: bold;
      background: none;
      border: none;
      color: #999;

      &.active {
        color: #ff3a3a;
      }
    }
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4vw;

    span {
      font-size: 3.5vw;
      font-weight: bold;
    }

    .created-count {
      font-size: 3vw;
      color: #999;
    }
  }

  .playlist-item {
    display: flex;
    align-items: center;
    margin-bottom: 4vw;

    .playlist-cover,
    .playlist-icon {
      width: 15vw;
      height: 15vw;
      border-radius: 3vw;
      margin-right: 4vw;
    }

    .playlist-icon {
      background-color: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 6vw;
      color: #999;

      &.create-playlist {
        background-color: #ff3a3a;
        color: white;
      }

      &.import-playlist {
        background-color: #3a3aff;
        color: white;
      }
    }

    .playlist-info {
      flex: 1;

      h3 {
        font-size: 3.5vw;
        margin-bottom: 1vw;
      }

      p {
        font-size: 3vw;
        color: #999;
      }
    }

    .heart-mode-btn {
      font-size: 2.5vw;
      padding: 1vw 2vw;
      border-radius: 4vw;
      border: 1px solid #999;
      background: none;
      color: #999;
    }
  }
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  background-color: #f8f8f8;
  padding: 2vw 0;

  .nav-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    color: #999;

    .icon {
      font-size: 5vw;
      margin-bottom: 1vw;
    }

    span {
      font-size: 2.5vw;
    }

    &:nth-child(5) {
      color: #ff3a3a;
    }
  }
}

.icon {
  width: 6vw;
  height: 6vw;
}
</style>
