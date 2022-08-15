<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    videos: ApiVideo[];
    currentIndex?: number;
  }>(),
  { currentIndex: 0 }
);

const currentVideoIndex = ref(props.currentIndex);

const videoSelected = computed(() => {
  return props.videos[currentVideoIndex.value];
});

const goToVideo = (index: number) => {
  currentVideoIndex.value = index;
};
</script>

<template>
  <div class="c-video-carousel">
    <VideoPlayer
      class="c-video-carousel__player"
      :video="videoSelected"
      autoplay
    />

    <MediaScroller class="c-video-carousel__list">
      <VideoPreviewCard
        v-for="(video, index) in videos"
        :key="video.id"
        class="c-video-carousel__item"
        :class="{
          'c-video-carousel__item--selected': video === videoSelected,
        }"
        tag="button"
        type="button"
        :video="video"
        @click="goToVideo(index)"
      />
    </MediaScroller>
  </div>
</template>

<style lang="scss">
.c-video-carousel {
  display: grid;
  gap: space(4);
  align-items: center;
  justify-content: center;
  width: 960px;

  &__list {
    $_show-items-count: 4;
    --size: calc(
      (960px - #{space(4)} * #{$_show-items-count - 1}) / #{$_show-items-count}
    );
    --gap: 0;
    gap: space(4);
  }

  &__item {
    opacity: 0.5;
    transition: opacity 75ms ease-in-out;

    &--selected {
      opacity: 1;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
