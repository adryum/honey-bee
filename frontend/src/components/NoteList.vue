<script setup>
import SideTaskbarCard from './NoteListCard.vue'

</script>

<template>
  <div class="wrapper">
    <div class="hotbar">
      <input class="searchbar" placeholder="search...">
      <button>smth.</button>
      <button>filter by ...</button>
      <button>Edit tasks</button>
      <!--    when edit tasks will be enabled, then remove card hover transform -->
      <button>-></button>
    </div>
    <div class="taskbar">
      <SideTaskbarCard title="title" time="23.23.3425"/>
      <SideTaskbarCard title="title2" time="23.23.33`15"/>
      <SideTaskbarCard title="213312b" time="23.23.123425"/>
      <SideTaskbarCard title="title is bigger" time="23.23.3425"/>
      <SideTaskbarCard title="title IS EVEN BIGGER THAN BEFORE" time="23.23.3425"/>
      <SideTaskbarCard title="213312b" time="23.23.123425"/>
      <SideTaskbarCard title="title is bigger" time="23.23.3425"/>
      <SideTaskbarCard title="title IS EVEN BIGGER THAN BEFORE" time="23.23.3425"/>
    </div>
  </div>
</template>

<style scoped>

.hotbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  flex: 0.5;

  padding-left: 2px;
  padding-right: 2px;
  box-sizing: border-box;


  background: #979797;
}
.hotbar button{
  height: 100%;
  min-width: 3em;
  background: transparent;
  border: none;
}
button:hover {
  backdrop-filter: brightness(0.8);
}
.searchbar {
  width: 100%;
  height: 70%;
  border-radius: 2px;
  border: none;
}

.taskbar {
  flex: 10;

  display: grid;
  grid-auto-rows: 9em;
  grid-row-gap: 3px;
  padding: 2px;

  box-sizing: border-box;
  overflow: scroll;
}

.wrapper{
  position: relative;
  display: flex;
  flex-direction: column;
  height: calc(100% - 20px);
  width: calc(20vw - 20px);
  margin: 10px;

  padding: 2px;
  box-sizing: border-box;
  border-radius: var(--inner-border);

  z-index: 0;
  background: #7a7a7a;
}
.wrapper::before{
  content: '';
  position: absolute;
  border-radius: calc(var(--inner-border) - 2px);
  height: calc(100% - var(--inner-border) * 2);
  width: calc(100% - var(--inner-border) * 2);
  filter: brightness(.8);
  background: gray;
  z-index: -1;
}

</style>
