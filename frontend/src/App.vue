<template>
  <div>
    <div>
      MindMap-Vue
    </div>
    <div id="cy"></div>
  </div>
</template>

<script>
var cytoscape = require("cytoscape");
var cxtmenu = require("cytoscape-cxtmenu");
var eh = require("cytoscape-edgehandles");
cytoscape.use(cxtmenu);
cytoscape.use(eh);
export default {
  name: "Mindmap",
  components: {},
  created: function() {},
  data: function() {
    return {
      input: "",
      output: "",
      msg: "vue to cytoscape",
      count: 0
    };
  },
  methods: {
    view_init: function() {
      //       var data = {
      //         nodes: [
      //             { data: { id: "cat", name: "test1" } },
      //             { data: { id: "bird", name: "test2" } },
      //             { data: { id: "ladybug", name: "test3" } },
      //             { data: { id: "aphid", name: "test4" } },
      //             { data: { id: "rose", name: "test5" } },
      //             { data: { id: "grasshopper", name: "test6" } },
      //             { data: { id: "plant", name: "test7" } },
      //             { data: { id: "wheat", name: "test8" } }
      //           ],
      //           edges: [
      //             { data: { source: "cat", target: "bird" } },
      //             { data: { source: "bird", target: "ladybug" } },
      //             { data: { source: "bird", target: "grasshopper" } },
      //             { data: { source: "grasshopper", target: "plant" } },
      //             { data: { source: "grasshopper", target: "wheat" } },
      //             { data: { source: "ladybug", target: "aphid" } },
      //             { data: { source: "aphid", target: "rose" } }
      //           ]
      //       }
      //       // var pr = .pageRank();
      //       const cy_for_rank = cytoscape({
      //         elements: data
      //       });
      // // rank를 활용하기 위해 data만 입력한 cytoscape 객체입니다

      //       const pr = cy_for_rank.elements().pageRank();
      var cy = cytoscape({
        //기본 cytoscape 설정
        container: document.getElementById("cy"),
        boxSelectionEnabled: false,
        autounselectify: true,

        elements: {
          nodes: [
            { data: { id: "cat", name: "test1" } },
            { data: { id: "bird", name: "test2" } },
            { data: { id: "ladybug", name: "test3" } },
            { data: { id: "aphid", name: "test4" } },
            { data: { id: "rose", name: "test5" } },
            { data: { id: "grasshopper", name: "test6" } },
            { data: { id: "plant", name: "test7" } },
            { data: { id: "wheat", name: "test8" } }
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
        },
        style: cytoscape
          .stylesheet()
          //node css
          .selector("node")
          .css({
            content: "data(name)",
            "text-valign": "center",
            color: "white",
            "text-outline-width": 2,
            "text-outline-color": "#888",
            "background-color": "#888",
            "text-wrap": "wrap"
            // width: function (ele) {
            //   return 50 *  1/this.elements.rank('#'+ ele.id()) + 5;
            // },
            // width : function(ele){
            //   return 50 * this.elements().pageRank().rank('#'+ ele.id());
            // }
            // 'height': function (ele) {
            //   return 50 *  1/cy.elements().rank('#'+ ele.id()) + 5;
            // },
            // 'font-size': function (ele) {
            //     return 8 *  1/cy.elements().rank('#'+ ele.id()) + 5;
            // }
          })
          .selector("edge")
          .css({
            width: 2,
            "curve-style": "bezier",
            "line-color": "#888",
            "target-arrow-color": "#888",
            "target-arrow-shape": "vee",
            "arrow-scale": 0.8
          })
          //선택된 node css 설정
          .selector(":selected")
          .css({
            "background-color": "black",
            "line-color": "black",
            "target-arrow-color": "black",
            "source-arrow-color": "black",
            "text-outline-color": "black"
          })
          .selector(".eh-handle")
          .css({
            "background-color": "blue",
            width: 12,
            height: 12,
            shape: "ellipse",
            "overlay-opacity": 0,
            "border-width": 12,
            "border-opacity": 0
          })
          .selector(".eh-hover")
          .css({
            "background-color": "blue"
          })

          .selector(".eh-source")
          .css({
            "border-width": 2,
            "border-color": "blue"
          })
          .selector(".eh-target")
          .css({
            "border-width": 2,
            "border-color": "blue"
          })

          .selector(".eh-preview, .eh-ghost-edge")
          .css({
            "background-color": "blue",
            "line-color": "blue",
            "target-arrow-color": "blue",
            "source-arrow-color": "blue"
          })
          .selector(".eh-ghost-edge.eh-preview-active")
          .css({
            opacity: 0
          }),
        //cytoscape 마인드맵에서 사용하는 데이터 구조

        layout: {
          name: "circle",
          padding: 10,
          animate: false,
          gravityRangeCompound: 1.5,
          fit: true,
          tile: true
        }
      });
      eh = cy.edgehandles();
      eh.enabled = false;
      let resizeTimer;
      window.addEventListener("resize", function() {
        this.clearTimeout(resizeTimer);
        resizeTimer = this.setTimeout(function() {
          cy.fit();
        }, 200);
      });
      cy.cxtmenu({
        selector: "node",
        commands: [
          {
            content: "test",
            select: function(ele) {
              var pr = cy.elements().pageRank();
              const nodeMaxSize = 50;
const nodeMinSize = 5;
const fontMaxSize = 8;
const fontMinSize = 5;
              // console.log(cy.elemenets.pageRank.rank(ele));
              console.log("g rank: " + pr.rank("#" + ele.id()));
              console.log(
                cy
                  .elements()
                  .pageRank()
                  .rank("#" + ele.id())
              );
              cy.json({
              style: [ // the stylesheet for the graph
        {
            selector: 'node',
            style: {
                content: "data(name)",
            "text-valign": "center",
            color: "white",
            "text-outline-width": 2,
            "text-outline-color": "#888",
            "background-color": "#888",
            "text-wrap": "wrap",
                
                'label': 'data(label)',
                'width': function (ele) {
                    return nodeMaxSize *  (1/pr.rank('#' + ele.id()))  + nodeMinSize;
                },
                'height': function (ele) {
                    return nodeMaxSize *  (1/pr.rank('#' + ele.id())) + nodeMinSize;
                },
                'font-size': function (ele) {
                    return fontMaxSize *   (1/pr.rank('#' + ele.id())) + fontMinSize;
                }
            }
        },
              ]});
            }
          },
          {
            content: "Add",
            select: function(ele) {
              console.log(ele);
              console.log(eh);
              console.log("add_node");
              cy.add([
                {
                  group: "nodes",
                  data: { id: cy.json().elements.nodes.length + 1 + "node" }
                },
                {
                  group: "edges",
                  data: {
                    id: cy.json().elements.edges.length + 1 + "edge",
                    source: ele.id(),
                    target: cy.json().elements.nodes.length + 1 + "node"
                  }
                }
              ]);
            }
          },

          {
            content: "start",

            select: function() {
              eh.enabled = true;
              cy.on("tapdragout", "edge", function() {
                eh.enabled = false;
              });
            }
          },
          {
            content: "Delete",
            select: function(ele) {
              console.log(ele.id());
              console.log("delete_node");
              cy.remove("#" + ele.id());
            }
          }
        ]
      });
      cy.cxtmenu({
        selector: "edge",

        commands: [
          {
            content: "Delete",
            select: function(ele) {
              console.log(ele.position());
              console.log("delete_edge");
              cy.remove("#" + ele.id());
            }
          }
        ]
      });

      cy.cxtmenu({
        selector: "core",

        commands: [
          {
            content: "Add",
            select: function() {
              console.log("add_node");
              cy.add([
                {
                  group: "nodes",
                  data: { id: "asdfjksdfakljfsdajksdfa" }
                }
              ]);
            }
          },

          {
            content: "기타",
            select: function() {
              console.log("옵션");
            }
          }
        ]
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
  width: 80%;
  height: 80%;
  position: absolute;
  left: 0px;
  text-align: initial;
}
body {
  font: 14px helvetica neue, helvetica, arial, sans-serif;
}
</style>
