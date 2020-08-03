<template>
  <div id="view">
    <HelloWorld position="relative" msg="👍Cytoscape Prac example👍" />
    <input v-model="push.node.id" placeholder="추가할 노드 아이디" />
    <input v-model="push.edge.id" placeholder="추가할 에지 아이디" />
    <input v-model="push.edge.source" placeholder="추가할 에지 소스" />
    <input v-model="push.edge.target" placeholder="추가할 에지 타겟" />
    <button v-on:click="add_node_custom()">push</button>
    <br />
    <button v-on:click="remove_node">remove</button>
    <button v-on:click="log">log</button>
    <button v-on:click="logElements">Elements</button>
    <button v-on:click="cyjson">cyjson</button>
    <br />
    <br />
    <div id="cy"></div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import cytoscape from "cytoscape";

export default {
  name: "Cytoscape",
  components: { HelloWorld },
  created: function() {},
  data: function() {
    return {
      input: "",
      output: "",
      msg: "vue to cytoscape",
      count: 0,
      push: {
        node: {
          id: ""
        },
        edge: {
          source: "",
          target: ""
        }
      },
      remove: {
        node: {
          id: ""
        },
        edge: {
          source: "",
          target: ""
        }
      }
    };
  },
  methods: {
    add_node: function() {
      console.info(this.cy);
      this.cy.add([
        {
          group: "nodes",
          data: { id: "node" + this.count },
          position: { x: 300, y: 200 }
        },
        {
          group: "edges",
          data: {
            id: "edge" + this.count,
            source: "node" + this.count,
            target: "cat"
          }
        }
      ]);
    },
    add_node_custom: function() {
      this.cy.add([
        {
          group: "nodes",
          data: { id: this.push.node.id }
          //position: { x: 300, y: 200 }
        },
        {
          group: "edges",
          data: {
            id: this.push.edge.id,
            source: this.push.edge.source,
            target: this.push.edge.target
          }
        }
      ]);
    },
    remove_node: function() {
      console.info(this.cy);
      let ej = this.cy.$("#CAT");
      this.cy.remove(ej);
    },
    remove_node_custom: function() {
      console.info(this.cy);
      let ej = this.cy.$("#cat");
      this.cy.remove(ej);
    },
    log: function() {
      console.info(this.cy);
    },
    logElements: function() {
      console.info(this.cy.Core);
    },
    cyjson: function() {
      this.cy.json({
        elements: {
          nodes: [
            { data: { id: "cat" } },
            { data: { id: "bird" } },
            { data: { id: "ladybug" } },
            { data: { id: "aphid" } },
            { data: { id: "rose" } },
            { data: { id: "grasshopper" } },
            { data: { id: "plant" } },
            { data: { id: "wheat" } }
          ],
          edges: [
            { data: { source: "cat", target: "bird" } },
            { data: { source: "bird", target: "ladybug" } },
            { data: { source: "bird", target: "grasshopper" } },
            { data: { source: "grasshopper", target: "plant" } },
            { data: { source: "grasshopper", target: "wheat" } },
            { data: { source: "ladybug", target: "aphid" } },
            { data: { source: "aphid", target: "rose" } }
          ]
        }
      });
    },
    view_init: function() {
      this.cy = cytoscape({
        container: document.getElementById("cy"),
        boxSelectionEnabled: false,
        autounselectify: true,
        style: cytoscape
          .stylesheet()
          .selector("node")
          .css({
            height: 80,
            width: 80,
            "background-fit": "cover",
            "border-color": "#000",
            "border-width": 3,
            "border-opacity": 0.5,
            content: "data(name)",
            "text-valign": "center",
            label: "data(id)"
          })
          .selector("edge")
          .css({
            width: 6,
            "target-arrow-shape": "triangle",
            "line-color": "#ccc",
            "target-arrow-color": "#ccc",
            "curve-style": "bezier"
          }),
        elements: {
          nodes: [
            { data: { id: "cat" } },
            { data: { id: "bird" } },
            { data: { id: "ladybug" } }
            //{ data: { id: "aphid" } },
            //{ data: { id: "rose" } },
            //{ data: { id: "grasshopper" } },
            //{ data: { id: "plant" } },
            //{ data: { id: "wheat" } }
          ],
          edges: [
            { data: { source: "cat", target: "bird" } },
            { data: { source: "bird", target: "ladybug" } }
            //{ data: { source: "bird", target: "grasshopper" } },
            //{ data: { source: "grasshopper", target: "plant" } },
            //{ data: { source: "grasshopper", target: "wheat" } },
            //{ data: { source: "ladybug", target: "aphid" } },
            //{ data: { source: "aphid", target: "rose" } }
          ]
        },
        layout: {
          name: "breadthfirst",
          directed: true,
          padding: 10
        }
      });
    }
  },
  computed: {},
  mounted: function() {
    this.view_init();
  }
};
</script>
<style scoped>
#cy {
  width: 100%;
  height: 80%;
  position: absolute;
  top: 200px;
  left: 0px;
  text-align: left;
}

body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>
