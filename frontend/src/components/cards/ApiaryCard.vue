<script setup>
import NoteList from "@/ui/components/NoteList.vue";

defineProps({
  name: String
})
</script>

<template>
  <div class="item-card-wrapper display-flex-row cut-rounded-border">
    <div class="display-flex-column flex-2">

      <div class="top-row cut-rounded-border">
        <h1>NR. 1</h1>
        <h2 class="flex-1">NAme n shit</h2>
        <div>options</div>
      </div>

      <hr class="hr-horizontal-transparent">
      <div class="bottom-row flex-1 display-flex-row">

        <div class="first-column">
          <div class="image-container cut-rounded-border"><img class="this-card-image" src="/src/ui/assets/images/honeyCombWall.jpg" alt=""></div>
          <hr class="hr-horizontal-transparent">
          <div class="description cut-rounded-border">description</div>
        </div>

        <hr class="hr-vertical">

        <div class="second-column">
         <NoteList></NoteList>
        </div>

        <hr class="hr-vertical">

        <div class="third-column cut-rounded-border">
          <div class="hives">hives</div>
          <hr class="hr-horizontal-transparent">
          <div class="weather">weather</div>
          <hr class="hr-horizontal-transparent">
          <div class="location">location</div>
        </div>

      </div>
    </div>
    <hr class="hr-vertical">
    <div class="history cut-rounded-border">Action history</div>
  </div>
</template>

<style scoped>
.item-card-wrapper {
  aspect-ratio: 10/4;
  width: 100%;
  background: #ac4d0a;
  transition: .1s;
  padding: 3px;
}
.top-row {
  display: flex;
  backdrop-filter: blur(3px);
  height: 15%;
  background: var(--transparent-white-80);
}
.first-column {
  display: flex;
  flex-direction: column;
  flex: 1 2 30%;
}
.second-column {
  display: flex;
  flex-direction: column;
  flex: 30%;
}
.third-column {
  display: flex;
  flex-direction: column;
  flex: 1 2 20%;
}
.third-column > div {
  flex: auto;
}
.hives{
  background: var(--transparent-white-80);
}
.weather {
  background: var(--transparent-white-80);
}
.location {
  background: var(--transparent-white-80);
}
.history {
  flex: 1;
  background: var(--transparent-white-80);
}
.notes {
  flex: 1 1 50%;
  background: var(--transparent-white-80);
}
.description {
  flex: 1 50%;
  background: var(--transparent-white-80);
}
.right-side > div {
  flex: 1;
}

.image-container {
  max-height: 50%;
  background: var(--transparent-white-80);
}
.this-card-image {
  width: 100%;
  height: 100%;
  object-position: center;
  object-fit: cover;
}
</style>
