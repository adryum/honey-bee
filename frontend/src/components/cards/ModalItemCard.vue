<script setup>
defineProps({
  onCloseClick: Function
})
</script>

<template>
<div class="modal-container">
  <div class="pop-up-card">
    <div class="image">
      <div class="image-div">
        <img src="/src/ui/assets/images/honeyCombWall.jpg" alt="modal-image">
      </div>
      <hr class="modal-hr-vertical">
    </div>
    <div class="top-row">
      <h1>ITEMNAME</h1>
      <hr class="modal-hr-top-horizontal">
    </div>
    <div class="description">
      <h2>Description</h2>
      <hr class="modal-hr-horizontal">
      <div class="paragraph-div">
        <p>
          An axe is a versatile and ancient tool used primarily for chopping, splitting, and shaping wood, although it has also been adapted for various other tasks throughout history. It consists of a sharp blade, often made from steel or another durable metal, attached to a long handle, typically crafted from wood, fiberglass, or modern composite materials. The head of the axe is typically heavier and broad at one end to facilitate the cutting of wood, while the other end may be flat, pointed, or even equipped with a secondary feature like a pick or hammer for different uses.
          The history of the axe dates back to prehistoric times, with early versions being made from stone and later, as metallurgy advanced, from copper, bronze, and iron. The axe was an essential tool for survival, used in the construction of shelters, the gathering of firewood, and the crafting of other tools. Over time, it evolved into various specialized forms based on its intended use. In addition to its practical uses, the axe became a symbol of power and war, prominently featured in the toolkits of ancient warriors and soldiers.
          The blade of an axe is typically made with a sharp, beveled edge designed to maximize efficiency in cutting and splitting. Depending on the type of axe, the angle of the blade may vary. For instance, a felling axe, used primarily for chopping down trees, tends to have a wider, more acute angle, which allows it to slice through the wood fibers with minimal resistance. A splitting axe, on the other hand, has a thicker, wedge-shaped blade that helps to break apart the grain of the wood, making it ideal for splitting logs into smaller pieces for firewood.
          The handle of an axe is equally important as its blade. Traditionally, the handle was crafted from strong, durable hardwoods like hickory or ash, which provided a good balance between strength and flexibility. The handle's length can vary depending on the type of axe and the purpose for which it is intended. Shorter handles are typically used for tasks requiring more control and precision, such as trimming small branches or carving, while longer handles are favored for tasks like felling trees, where more swinging power is necessary. Modern axes may feature synthetic or composite handles, which are lighter and more resistant to wear and weather conditions.
          Axes come in numerous styles, each designed for specific purposes. A felling axe is designed for cutting down trees, while a hatchet is a small, one-handed axe used for lighter tasks such as trimming branches or splitting small logs. A splitting axe, also known as a maul, is a heavier, more robust tool specifically made for splitting firewood, often featuring a broad, wedge-shaped blade. The double-bit axe, with blades on both sides of the head, is designed to provide a more efficient cut and is often used by lumberjacks for felling trees and clearing land.
          The axe has also been used throughout history as a weapon in various cultures, from Viking battle axes to the more iconic American tomahawks. In these contexts, the axe's practicality as a tool was adapted into a form of personal defense or warfare.
          Beyond its utility as a tool and weapon, the axe remains an important part of cultural and symbolic traditions. From its role in rituals and ceremonies to its portrayal in literature and art, the axe continues to embody strength, craftsmanship, and resilience, making it a timeless symbol of human ingenuity.
        </p>
      </div>
    </div>
    <div class="add">Add</div>
    <div class="available">Available</div>
    <div class="assigned">Assigned</div>
  </div>
</div>
</template>

<style scoped>
@keyframes grow-in {
  from{
    scale: .95;
  }
  to {
    scale: 1;
  }
}
.sub-header {
  display: flex;
}
.sub-header > h2 {/*
  //flex: auto;*/
}
.modal-hr-top-horizontal {
  border: none;
  height: 4px;
  background: #323030;
  margin: 0 0 1rem;
}
.modal-hr-horizontal {
  border: none;
  height: 4px;
  margin: 0;
  background: #323030;
}
.modal-hr-vertical {
  border: none;
  width: 8px;
  margin: 0;
  background: #323030;
}
.modal-container {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* puts modal below header */
  height: calc(100% - var(--header-height));
  bottom: 0;
  backdrop-filter: brightness(20%) blur(4px);

  transition: .3s;
}
.pop-up-card {
  display: grid;
  grid-template-columns: 1fr repeat(3, 23%);
  grid-template-rows: 5rem calc(50% - 2rem) calc(50% - 3rem);

  border-radius: .7rem;

  font-family: Ebrima;
  font-weight: bold;

  width: 80%;
  height: 70%;
  background: linear-gradient(150deg, #3b3c43 10%, #313137);

  max-width: calc(100% - 3rem);
  max-height: calc(100% - 3rem);

  animation: grow-in ease-out .1s;
}
.image {
  display: flex;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 4;
}
.image-div {
  width: 100%;
}
.image-div > img {
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}
.top-row {
  grid-row: 1 / 2;
  grid-column: 2 / 5;

}
.description {
  display: flex;
  flex-direction: column;
  grid-area: 2 / 4 / 3 / 5;
  overflow: hidden;
}
.description > .paragraph-div {
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;

}
.description > .paragraph-div > p {
  text-overflow: ellipsis;
}
.add {
  grid-area: 3 / 4 / 4 / 5;

}
.available {
  grid-area: 2 / 3 / 4 / 4;
}
.assigned {
  grid-area: 2 / 2 / 4 / 3;
}

/* text css */
.top-row > h1 {
  margin: 0 0 0 1rem;
  font-size: 3rem;
  color: azure;
}
.pop-up-card > h1, h2 {
  margin: 0 0 1rem 1rem;
  color: azure;
}

.pop-up-card p {
  margin: 1rem 0 0 1rem;
  color: #bfbd9b;
  font-size: 1.1rem;
}
</style>
