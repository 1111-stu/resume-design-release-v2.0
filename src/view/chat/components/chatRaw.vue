<template>
  <div class="wrapper" :class="[{ ai: isAi }, { user: !isAi }]">
    <div class="chat">
      <div class="profile">
        <img :src="isAi ? bot : user" :alt="isAi ? 'bot' : 'user'" />
      </div>
      <div class="message" :id="id">{{ value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import bot from '@/assets/images/bot.svg'
import user from '@/assets/images/user.svg'
defineProps<{ isAi: boolean; value: FormDataEntryValue; id?: string }>()
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100vw;
  padding: 15px;

  .chat {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 10px;

    .profile {
      width: 36px;
      height: 36px;
      border-radius: 5px;
      background: #5436da;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .message {
      margin-top: 8px;
      color: #dcdcdc;
    }
  }
}

.ai {
  .chat {
    background: #40414f;
    display: flex;

    .profile {
      background: #10a37f;

      img {
        width: 60%;
        height: 60%;
        object-fit: contain;
      }
    }

    .message {
      flex: 1;
      color: #dcdcdc;
      font-size: 20px;
      max-width: 100%;
      overflow-x: scroll;
      white-space: pre-wrap;
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  }
}

.message::-webkit-scrollbar {
  display: none;
}
</style>
