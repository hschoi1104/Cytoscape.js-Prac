<template>
  <div id="app">
    <HelloWorld msg="👍Cytoscape Prac example👍" />

    <cytoscape
      ref="cy"
      :config="config"
      v-on:mousedown="addNode"
      v-on:cxttapstart="updateNode"
    >
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:mousedown="deleteNode($event, def.data.id)"
      />
    </cytoscape>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "App",
  components: {
    HelloWorld
  },
  data() {
    return {
      config: {
        style: [
          {
            selector: "node",
            style: {
              "background-color": "#666",
              label: "data(id)"
            }
          },
          {
            selector: "edge",
            style: {
              width: 3,
              'curve-style': 'bezier',
              "line-color": "#ccc",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle"
            }
          }
        ],
        layout: {
          name: "grid",
          rows: 1
        }
      },
      elements: [
        {
          // node a
          data: { id: "a" }
        },
        {
          // node b
          data: { id: "b" }
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" }
        }
      ]
    };
  }
};
</script>
