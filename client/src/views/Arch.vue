<template>
  <div id="box">
    <main :class="{ active: isLeftSidebarOpen }">
      <div class="d-flex">
        <div>
          <b-dropdown
            id="dropdown-structure"
            text="Test"
            class="m-2"
            variant="info"
            ref="dropdown"
          >
            <template #button-content>
              <b-icon icon="funnel-fill" class="mr-1"></b-icon
              ><span> Filter</span>
            </template>
            <b-dropdown-form
              class="filter-panel"
              @submit.stop.prevent="() => {}"
            >
              <div class="d-flex justify-content-between">
                <small>Add an item to start your diagram.</small>
              </div>
              <b-form-tags v-model="tagValue" no-outer-focus class="mb-2">
                <template v-slot="{ tags, removeTag }">
                  <div class="d-flex">
                    <b-form-select
                      v-model="filterType"
                      :options="filterOptions"
                    ></b-form-select>
                    <b-form-select
                      v-model="filterResult"
                      :options="filterVal"
                    ></b-form-select>
                    <b-button
                      @click="addTag()"
                      size="sm"
                      :disabled="addTagBtn_state"
                    >
                      add
                    </b-button>
                  </div>
                  <div class="d-inline-block" style="font-size: 14px">
                    <b-form-tag
                      v-for="tag in tags"
                      @remove="removeTag(tag)"
                      :key="tag"
                      :title="tag"
                      variant="info"
                      class="m-1 "
                      >{{ tag }}</b-form-tag
                    >
                  </div>
                </template>
              </b-form-tags>
              <b-dropdown-divider></b-dropdown-divider>
              <div class="d-flex justify-content-end">
                <b-button @click="removeAllTag" class="mr-2" variant="danger"
                  ><b-icon icon="trash"></b-icon> Remove all</b-button
                >
                <b-button variant="success" @click="onClick" id="filter_apply"
                  >Apply</b-button
                >
              </div>
            </b-dropdown-form>
          </b-dropdown>
        </div>
      </div>
      <div class="mt-2 filter-result">
        <p v-show="showFilterResult">
          {{ filterTypeText }} : {{ filterValText }}
        </p>
      </div>
      <!-- <button @click="test">test</button> -->
      <!-- <button id="test">test</button> -->

      <div class="loading" v-if="loading">Loading...</div>
      <div id="cy" v-else></div>
      <!-- <div v-for="(value, key) in nodes" :key="key">
      <span>{{ value.data }}--{{ key }}</span>
    </div> -->
    </main>
    <b-sidebar
      id="rightSidebar"
      class="rightSidebar-menu"
      shadow
      v-model="isRightSidebarOpen"
      right
      width="30%"
    >
      <div class="px-3 py-2 info-content">
        <div class="content-title d-flex">
          <img :src="newTargetObj.Url" alt="" />
          <div class="titleAndType">
            <b-badge href="#" variant="info">{{ newTargetObj.Type }}</b-badge>
            <!-- <input type="text" :disabled="checkInput('Name')" v-model="newTargetObj.Name" /> -->
            <input
              type="text"
              :disabled="disabledInput"
              v-model="newTargetObj.Name"
            />
          </div>
          <b-icon
            icon="pencil-square"
            @click="testInput()"
            class="h5 mx-2"
          ></b-icon>
        </div>
        <hr />
        <!-- <button @click="testInput()"></button> -->
        <div
          v-for="(value, index) in checkNewTargetObj(newTargetObj)[0]"
          :key="value.id"
          class="my-1"
        >
          <span class="info-content-title">{{ index }}: </span>
          "
          <!-- <input
            type="text"
            v-model="checkNewTargetObj(newTargetObj)[0][index]"
            :disabled="checkInput(index)"
          /> -->
          <input
            type="text"
            v-model="checkNewTargetObj(newTargetObj)[0][index]"
            :disabled="disabledInput"
          />
          "
        </div>
        <div
          v-for="(value, index) in checkNewTargetObj(newTargetObj)[1]"
          :key="value.id"
        >
          <span class="info-content-title">{{ index }}: </span>
          <div
            class="my-1"
            v-for="(val, i) in checkNewTargetObj(newTargetObj)[1][index]"
            :key="val.id"
          >
            <span class="info-content-subtitle">{{ i }}: </span>
            "
            <!-- <input
              type="text"
              v-model="checkNewTargetObj(newTargetObj)[1][index][i]"
            /> -->
            <input
              type="text"
              v-model="checkNewTargetObj(newTargetObj)[1][index][i]"
              :disabled="disabledInput"
            />
            "
            <!-- {{ val }} -->
          </div>
        </div>
        <hr />

        <p class="cost">
          <b-icon icon="currency-dollar"></b-icon>
          {{ newTargetObj.Cost_for_month }} USD / month
        </p>
        <b-button class="console-link"
          ><a :href="newTargetObj.Console_url" target="_blank"
            ><b-icon icon="box-arrow-up-right"></b-icon></a
        ></b-button>
      </div>
    </b-sidebar>
    <div class="close-sidebar" v-show="!isLeftSidebarOpen">
      <b-button v-b-toggle.leftSidebar
        ><b-icon icon="layout-sidebar-inset"></b-icon
      ></b-button>
    </div>
    <b-sidebar
      id="leftSidebar"
      class="leftSidebar-menu"
      width="250px"
      shadow
      v-model="isLeftSidebarOpen"
      bg-variant="dark"
      text-variant="light"
    >
      <div class="px-3 py-2">
        <div>
          <h3 class="py-2 sidebar-title">{{ archName }}</h3>
          <p class="fw-bold">Accounts</p>
          <ul class="px-2">
            <li v-for="result in ResourceAccountID" :key="result">
              {{ result }}
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <p class="fw-bold">Imported Regions</p>
          <ul class="px-2">
            <li v-for="result in ResourceRegionResult" :key="result">
              {{ result }}
            </li>
          </ul>
        </div>
        <hr />
        <div class="py-2">
          <p class="fw-bold">Included resource types</p>
          <ul class="px-2">
            <li v-for="result in ResourceTypeResult" :key="result">
              {{ result }}
            </li>
          </ul>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import axios from "axios";
import "cytoscape-navigator/cytoscape.js-navigator.css";
import jQuery from "jquery";
window.$ = window.jQuery = jQuery
// cytoscape
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';

cytoscape.use( dagre );
var navigator = require("cytoscape-navigator");

navigator(cytoscape); // register extension
/*eslint-disable*/

export default {
  name: "cytoscape",
  components: {
   
  },
  data() {
    return {
      nodes: [],
      edges: [],
      requestID: "",
      archName: "",
      showFilterResult: false,
      loading: false,
      structureSelected: [],
      structureOpt: [
        { text: "Account", value: "account_id" },
        { text: "Region", value: "region" },
        { text: "Application", value: "tag.Application" },
        { text: "Department", value: "tag.Department" },
        { text: "Environment", value: "tag.Environment" },
        { text: "Owner", value: "tag.Owner" },
        { text: "Project", value: "tag.Project" },
      ],
      newTargetObj: {},
      filterOpt: ["id", "url", "parent", "type"],
      isRightSidebarOpen: false,
      isLeftSidebarOpen: true,
      ResourceTypeResult: [],
      ResourceRegionResult: [],
      ResourceAccountID: [],
      ResourceRGResult: [],
      ResourceTag: [],
      filterOptions: [
        { value: null, text: "Attribute name", disabled: true },
        { value: "account_id", text: "Account" },
        { value: "region", text: "Region" },
        { value: "resourceGroup", text: "Resource-Group" },
        {
          label: "Tag",
          options: [
            { value: "tag.Application", text: "Application" },
            { value: "tag.Department", text: "Department" },
            { value: "tag.Environment", text: "Environment" },
            { value: "tag.Owner", text: "Owner" },
            { value: "tag.Project", text: "Project" },
          ],
        },
      ],
      addTagBtn_state: true,
      tagValue: [],
      filterType: null,
      filterVal: null,
      filterTypeText: null,
      filterValText: null,
      filterResult: "",
      tag: {
        Application: [],
        Department: [],
        Environment: [],
        Owner: [],
        Project: [],
      },
      disabledInput: true,
      isEdit: false,
    };
  },
  watch: {
    filterType: function () {
      this.filterResult = null;
      this.filterType == null ? null : (this.addTagBtn_state = false);
      // console.log("test");
      switch (this.filterType) {
        case "region":
          this.filterVal = this.ResourceRegionResult;
          break;
        case "account_id":
          this.filterVal = this.ResourceAccountID;
          break;
        case "resourceGroup":
          this.filterVal = this.ResourceRGResult;
          break;
        case "tag.Application":
          this.filterVal = this.tag.Application;
          break;
        case "tag.Department":
          this.filterVal = this.tag.Department;
          break;
        case "tag.Environment":
          this.filterVal = this.tag.Environment;
          break;
        case "tag.Owner":
          this.filterVal = this.tag.Owner;
          break;
        case "tag.Project":
          this.filterVal = this.tag.Project;
          break;
      }
    },
  },
  methods: {
    onStructure() {},
    testInput() {
      if (this.disabledInput) {
        this.disabledInput = false;
      } else {
        this.disabledInput = true;
      }
    },
    checkNewTargetObj(obj) {
      const filterOpt = [
        "Name",
        "Cost_for_month",
        "Url",
        "Type",
        "Console_url",
      ];
      var withoutArray = {};
      var withArray = {};
      for (var key in obj) {
        // c+=1
        if (obj[key] != "" && filterOpt.indexOf(key) == -1) {
          if (typeof obj[key] != "object") {
            withoutArray = Object.assign(withoutArray, { [key]: obj[key] });
          } else if (
            typeof obj[key] == "object" &&
            obj[key].length != 0 &&
            obj[key] != ""
          ) {
            withArray = Object.assign(withArray, { [key]: obj[key] });
          }
        }
      }
      return [withoutArray, withArray];
    },
    checkInput(title) {
      const editable = ["Name", "Partition_key"];
      if (editable.indexOf(title) == -1) {
        return true;
      }
    },
    onClick() {
      // Close the menu and (by passing true) return focus to the toggle button
      this.filterTypeText = this.filterType;
      this.filterValText = this.filterResult;
      this.$refs.dropdown.hide(true);
    },
    addTag() {
      this.filterResult == undefined ? (this.filterResult = "<all>") : null;
      this.tagValue.push(this.filterType + ": " + this.filterResult);
      this.filterType = null;
      this.filterVal = null;
    },
    removeAllTag() {
      this.tagValue = [];
    },
    ListIncludeAccountID() {
      var set = [];
      for (var i = 0; i < this.nodes.length; i++) {
        if (this.nodes[i].data.account_id) {
          set.push(this.nodes[i].data.account_id);
        }
      }
      this.ResourceAccountID = [...new Set(set)];
    },
    Addimg() {
      const img = [
        {
          title: "DynamoDB",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_Amazon-DynamoDB_32.png",
        },
        {
          title: "Transcribe",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_Amazon-Transcribe_32.png",
        },
        {
          title: "Translate",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_Amazon-Translate_32.png",
        },
        {
          title: "Lambda",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_AWS-Lambda_32.png",
        },
        {
          title: "Step-Functions",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_AWS-Step-Functions_32.png",
        },
        {
          title: "S3",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_AWS-Simple-Storage-Service_S3-Standard_48_Light.png",
        },
        {
          title: "SNS",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Amazon-Simple-Notification-Service-SNS.png",
        },
        {
          title: "API Gateway",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_Amazon-API-Gateway_32.png",
        },
        {
          title: "Cognito",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_Amazon-Cognito_32.png",
        },
        {
          title: "Account",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/AWS-Cloud-Account_light-bg.png",
        },
        {
          title: "RDS",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_Amazon-RDS_32.png",
        },
        {
          title: "EC2",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Arch_Amazon-EC2_32.png",
        },
        {
          title: "Resource-Group",
          url: "https://audio-json.s3.us-west-2.amazonaws.com/img/Amazon-Resourece-Groups-and-Tags.png",
        },
      ];
      for (var i = 0; i < this.nodes.length; i++) {
        for (var j = 0; j < img.length; j++) {
          if (img[j].title.indexOf(this.nodes[i].data.type) != -1) {
            this.nodes[i].data.url = img[j].url;
            // console.log(dataset.nodes[i].data)
          }
        }
      }
    },
    createCytoscape(_this) {
      cytoscape.warnings(false);
      // cytoscape({
      var layout = {
        name: "dagre",
        avoidOverlap: true,
        // dagre algo options, uses default value on undefined
        nodeSep: 50, // the separation between adjacent nodes in the same rank
        edgeSep: undefined, // the separation between adjacent edges in the same rank
        rankSep: undefined, // the separation between each rank in the layout
        rankDir: "LR", // 'TB' for top to bottom flow, 'LR' for left to right,
        align: "UR", // alignment for rank nodes. Can be 'UL', 'UR', 'DL', or 'DR', where U = up, D = down, L = left, and R = right
        acyclicer: undefined, // If set to 'greedy', uses a greedy heuristic for finding a feedback arc set for a graph.
        // A feedback arc set is a set of edges that can be removed to make a graph acyclic.
        ranker: undefined, // Type of algorithm to assign a rank to each node in the input graph. Possible values: 'network-simplex', 'tight-tree' or 'longest-path'
        minLen: function (edge) {
          return 3;
        }, // number of ranks to keep between the source and target of the edge
        edgeWeight: function (edge) {
          return 3;
        }, // higher weight edges are generally made shorter and straighter than lower weight edges
        // general layout options
        fit: true, // whether to fit to viewport
        padding: 10, // fit padding
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        nodeDimensionsIncludeLabels: true, // whether labels should be included in determining the space used by a node
        animate: true, // whether to transition the node positions
        animateFilter: function (node, i) {
          return true;
        }, // whether to animate specific nodes when animation is on; non-animated nodes immediately go to their final positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        transform: function (node, pos) {
          return pos;
        }, // a function that applies a transform to the final node position

        stop: function () {}, // on layoutstop
      };
      var cy = cytoscape({
        container: document.getElementById("cy"),

        boxSelectionEnabled: false,
        autounselectify: true,

        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },

        layout: layout,

        style: [
          {
            selector: "node",
            style: {
              content: function (node) {
                const type =
                  node.data("type")[0].toUpperCase() +
                  node.data("type").slice(1);
                return node.data("label") == "parent"
                  ? `${type} (${node.data("id")})`
                  : node.data("name")
                  ? `${node.data("name")}`
                  : `${node.data("id")}`;
              },
              "text-valign": "top",
              "text-halign": "center",
              "text-margin-y": -6,
              // 'text-margin-x': -25,
              "font-size": 18,
              "text-wrap": "wrap",
              "text-rotation": "autorotate",
              "background-image": "data(url)",
              shape: "rectangle",
              "background-fit": "cover",
              height: "50px",
              width: "50px",
            },
          },
          {
            selector: ":parent",
            style: {
              // width: 4,
              shape: "roundrectangle",
              "border-width": "5px",
              "border-radius": "20%",
              "text-valign": "top",
              "text-halign": "left",
              "background-color": "#fff",
              // "border-color": "#be0e8d",
              "border-color": function (node) {
                const type = node.data("type");
                return type == "account_id"
                  ? "#000"
                  : type == "region"
                  ? "#11789a"
                  : type == "structure"
                  ? "green"
                  : type.includes("tag.")
                  ? "#f1860b"
                  : type.includes("resourceGroup")
                  ? "#2794a5"
                  : "#be0e8d";
              },
              "text-margin-x": 20,
              "text-margin-y": -15,
              "font-size": "22px",
              "font-weight": 700,
              padding: "35px",
              content: function (node) {
                const type = node.data("type");
                const id = node.data("id");
                return node.data("label") == "parent"
                  ? `${node.data("text")} ( $${node.data(
                      "cost_for_month"
                    )} USD/month )`
                  : type == "account_id"
                  ? `Account (${id})`
                  : type == "region"
                  ? `Region (${id})`
                  : type == "structure"
                  ? `${id}`
                  : node.data("name");
              },
              "background-position-x": "0",
              "background-position-y": "0",
              "background-fit": "none",
            },
          },
          {
            selector: ".hidden",
            css: {
              display: "none",
            },
          },
          {
            selector: ":selected",
            style: {
              "background-color": "#adadad",
              "line-color": "#adadad",
              "target-arrow-color": "#adadad",
              "source-arrow-color": "#adadad",
              "border-color": "#adadad",
              "border-width": "3px",
            },
          },
          {
            selector: "edge",
            style: {
              width: 2,
              "target-arrow-shape": "triangle",
              // 'source-arrow-shape': 'triangle',
              "line-color": "#adadad",
              "target-arrow-color": "#adadad",
              "curve-style": "straight",
            },
          },
          {
            selector: "node.highlight",
            style: {
              "border-color": "rgb(96, 178, 240)",
              "border-width": "4px",
              opacity: "1",
              // height: "52px",
              // width: "52px",
            },
          },
          {
            selector: "node.clickstyle",
            style: {
              "border-color": "rgb(96, 178, 240)",
              "border-width": "4px",
              // height: "52px",
              // width: "52px",
            },
          },
          {
            selector: "node.notfilter",
            style: {
              // opacity: "0.5",
              color: "red",
            },
          },
          {
            selector: "node.fitfilter",
            style: {
              width: "60px",
              height: "60px",
            },
          },
          {
            selector: "node.semitransp",
            style: { opacity: "0.5" },
          },
          {
            selector: "edge.highlight",
            style: {
              width: 5,
              "mid-target-arrow-color": "#FFF",
              "line-color": "rgb(96, 178, 240)",
              "target-arrow-color": "rgb(96, 178, 240)",
            },
          },
          {
            selector: "edge.clickstyle",
            style: {
              width: 5,
              "mid-target-arrow-color": "#FFF",
              "line-color": "rgb(96, 178, 240)",
              "target-arrow-color": "rgb(96, 178, 240)",
            },
          },
          {
            selector: "edge.semitransp",
            style: {
              opacity: "0.5",
            },
          },
        ],
        ready: function () {
          cy = this;
          cy.filter("node[label = 'parent']").data("isShow", false);
          // cy.nodes().move({
          //   parent: "Back-end"
          // })
          cy.filter("node[label = 'parent'][!isShow]").addClass("hidden");

          // cy.nodes("[id = 'Processing']").removeClass("hidden")
        },
      });

      $("#filter_apply").click(function () {
        // const query = `node[tag.Application = 'Processing'][tag.Project = 'Clouday1']`;
        let queryAry = [];
        _this.tagValue.map((val, i) => {
          if (val.split(": ")[1] == "<all>") {
            val = `?${val.split(": ")[0]}`;
            queryAry.push(val);
          } else {
            val = `${val.split(": ")[0]}='${val.split(": ")[1]}'`;
            queryAry.push(val);
          }
        });
        // queryAry = [?tag.Environment, tag.Application='...']
        console.log("queryAry", queryAry);

        cy.json({
          elements: {
            nodes: _this.nodes,
            edges: _this.edges,
          },
        });
        cy.nodes().removeClass("notfilter", "highlight");

        function AddqueryString() {
          var string = "";
          if (queryAry.length > 1) {
            queryAry.map((value, i) => {
              if (i != queryAry.length - 1) {
                string += `node[${value}],`;
              } else {
                string += `node[${value}]`;
              }
            });
          } else {
            string += `node[${queryAry[0]}]`;
          }
          return string;
          // return `node${string}`;
          // `node[?tag.Environment][tag.Application='...']`
        }

        if (queryAry.length != 0) {
          // const queryAry = ["?tag.Environment", "?tag.Application"];
          const queryString = AddqueryString();

          const queryNodes = cy.filter(queryString);

          const queryNodes_col = cy.collection().union(queryNodes);
          const graphElements = queryNodes_col
            .merge(queryNodes_col.outgoers())
            .merge(queryNodes_col.incomers())
            .merge(queryNodes_col.parent());

          cy.elements().remove();

          // Add fit filter nodes
          cy.add(graphElements);

          let structureNode = {};
          queryNodes.map(function (ele) {
            ele.data("fitParent", []);
            ele.data("fitQuery", "");
            queryAry.map((value, i) => {
              let queryType;
              if (value.includes("?")) {
                queryType = value.split("?")[1];
                if (Object.keys(structureNode).indexOf(queryType) == -1) {
                  Object.assign(structureNode, { [`${queryType}`]: [] });
                }
                if (queryType == "resourceGroup") {
                  let RG_array = ele.data(queryType);
                  // console.log("RG_array", RG_array);
                  RG_array.forEach((val) => {
                    if (structureNode[queryType].indexOf(val) == -1) {
                      structureNode[queryType].push(val);
                    }
                  });
                } else {
                  if (
                    structureNode[queryType].indexOf(ele.data(queryType)) == -1
                  ) {
                    structureNode[queryType].push(ele.data(queryType));
                  }
                }
                // if (structureNode[queryType].indexOf(ele.data(queryType)) == -1) {
                //   structureNode[queryType].push(ele.data(queryType));
                // }
              } else {
                queryType = value.split("=");
                var queryVal = queryType[1].split("'")[1];
                if (Object.keys(structureNode).indexOf(queryType[0]) == -1) {
                  Object.assign(structureNode, { [`${queryType[0]}`]: [] });
                }
                if (structureNode[queryType[0]].indexOf(queryVal) == -1) {
                  structureNode[queryType[0]].push(queryVal);
                }
              }
            });
          });
          // structureNode = { tag.Application: [..., ...], tag.Project: [..., ...] }

          let newAryCollection = [];
          function testAry() {
            Object.entries(structureNode).forEach(([key, value]) => {
              let newAry = [];
              value.forEach((val) => {
                var string = `${key}='${val}'`;
                // console.log(`[${key}='${val}']`);
                newAry.push(string);
              });
              newAryCollection.push(newAry);
            });
            console.log("newAryCollection", newAryCollection);
            return newAryCollection;
            // newAryCollection = [["tag.Application='...'", "tag.Application='...'"], ["tag.Project='...'", "tag.Project='...'"]]
          }

          function spiltFilterString(val) {
            var p_type = val.split("=");
            var p_val = p_type[1].split("'")[1];
            return [p_type[0], p_val];
            // [tag.Application, Clouday1]
          }

          function toUpperCase(val) {
            return val.replace(/^./, val[0].toUpperCase());
          }

          function toString(array, val) {
            // console.log("val", val)
            let count = 0;
            array.forEach((v) => {
              if (v.toString() == val.toString()) {
                // console.log(v.toString(), v.toString(),"==")
                count += 1;
              }
            });
            if (count == 0) {
              array.push(val);
            }
            return array;
          }

          function checkIsFilterNode2(val, val2) {
            return cy.filter(`node[id=${spiltFilterString(val)[1]}]`).empty &&
              cy.filter(`node[id=${spiltFilterString(val2)[1]}]`).empty
              ? cy.add([
                  {
                    data: {
                      type: spiltFilterString(val)[0],
                      id: `${spiltFilterString(val)[0]}:${
                        spiltFilterString(val)[1]
                      }`,
                      label: "parent",
                    },
                  },
                  {
                    data: {
                      type: spiltFilterString(val2)[0],
                      id: `${spiltFilterString(val2)[0]}:${
                        spiltFilterString(val2)[1]
                      }`,
                      label: "parent",
                    },
                  },
                ])
              : cy.filter(`node[id=${spiltFilterString(val)[1]}]`).empty
              ? cy.add({
                  data: {
                    type: spiltFilterString(val)[0],
                    id: `${spiltFilterString(val)[0]}:${
                      spiltFilterString(val)[1]
                    }`,
                    label: "parent",
                  },
                })
              : cy.filter(`node[id=${spiltFilterString(val2)[1]}]`).empty
              ? cy.add({
                  data: {
                    type: spiltFilterString(val2)[0],
                    id: `${spiltFilterString(val2)[0]}:${
                      spiltFilterString(val2)[1]
                    }`,
                    label: "parent",
                  },
                })
              : console.log("has nodes");
          }

          function checkIsFilterNode(val, val2) {
            if (cy.filter(`node[id=${spiltFilterString(val)[1]}]`).empty) {
              cy.add({
                data: {
                  type: spiltFilterString(val)[0],
                  id: `${spiltFilterString(val)[1]}`,
                  label: "parent",
                  text: `${spiltFilterString(val)[0]}:${
                    spiltFilterString(val)[1]
                  }`,
                },
              });
            }
            if (
              spiltFilterString(val2)[0] != "tag.Application" &&
              cy.filter(`node[id=${spiltFilterString(val2)[1]}]`).empty
            ) {
              cy.add({
                data: {
                  type: spiltFilterString(val2)[0],
                  id: `${spiltFilterString(val2)[1]}`,
                  label: "parent",
                  text: `${spiltFilterString(val2)[0]}:${
                    spiltFilterString(val2)[1]
                  }`,
                },
              });
            }
            if (spiltFilterString(val)[0] == "tag.Application") {
              cy.add({
                data: {
                  type: spiltFilterString(val2)[0],
                  id: `${spiltFilterString(val2)[1]}`,
                  label: "parent",
                  text: `${spiltFilterString(val2)[0]}:${
                    spiltFilterString(val2)[1]
                  }`,
                },
              });
            }
          }

          newAryCollection = testAry();
          if (queryAry.length > 1) {
            let outfitParent = [];
            let outfitfitQuery = [];
            newAryCollection.map(function (value, index, array) {
              value.forEach((val, i) => {
                let queryNodesWithParent = cy.collection();
                console.log("===", val, "===");
                cy.add({
                  data: {
                    type: spiltFilterString(val)[0],
                    id: `${spiltFilterString(val)[1]}${i}`,
                    label: "parent",
                    text: `${toUpperCase(spiltFilterString(val)[0])}:${
                      spiltFilterString(val)[1]
                    }`,
                  },
                });

                let fitQueryNodes;
                if (spiltFilterString(val)[0] == "resourceGroup") {
                  console.log("get resourceGroup");
                  fitQueryNodes = queryNodes.filter(function (element) {
                    return (
                      element
                        .data("resourceGroup")
                        .indexOf(spiltFilterString(val)[1]) != -1
                    );
                  });
                } else {
                  fitQueryNodes = queryNodes.filter(`node[${val}]`);
                }

                queryNodesWithParent = fitQueryNodes.union(
                  fitQueryNodes.parent().filter("node[^label]")
                );
                queryNodesWithParent.map((ele) => {
                  console.log("----", ele.data("name"), "----");
                  var fitParent = ele.data("fitParent");
                  var string = ele.data("fitQuery");
                  // console.log("testtest",ele.data("fitParent"))
                  if (fitParent != undefined) {
                    fitParent.push(`${spiltFilterString(val)[1]}${i}`);
                    ele.data("fitParent", fitParent);
                    string += `[${spiltFilterString(val)[0]}='${
                      spiltFilterString(val)[1]
                    }']`;
                    ele.data("fitQuery", string);
                  } else {
                    ele.data("fitParent", [`${spiltFilterString(val)[1]}${i}`]);
                    ele.data(
                      "fitQuery",
                      `[${spiltFilterString(val)[0]}='${
                        spiltFilterString(val)[1]
                      }']`
                    );
                  }
                  console.log(
                    ele.data("name"),
                    "fitParent:",
                    ele.data("fitParent")
                  );
                  console.log(
                    ele.data("name"),
                    "fitQuery:",
                    ele.data("fitQuery")
                  );
                  outfitParent = toString(outfitParent, ele.data("fitParent"));
                  // if (toString(outfitParent, ele.data("fitParent")) == false) {
                  //   outfitParent.push(ele.data("fitParent"))
                  // }
                  if (outfitfitQuery.indexOf(ele.data("fitQuery")) == -1) {
                    outfitfitQuery.push(ele.data("fitQuery"));
                  }
                });
              });
            });

            // console.log("outfitParent",outfitParent)

            outfitfitQuery = outfitfitQuery.sort((a, b) => {
              return b.split(/\[|\]/).length - a.split(/\[|\]/).length;
            });
            console.log("outfitfitQuery", outfitfitQuery);

            let pp = queryNodes;
            outfitfitQuery.map((val) => {
              const nodes = queryNodes.filter(`node${val}`);
              let test = nodes.union(nodes.parent());
              cy.add({
                data: {
                  type: spiltFilterString(val.split(/\[|\]/).reverse()[1])[0],
                  id: val,
                  label: "parent",
                  text: `${
                    spiltFilterString(val.split(/\[|\]/).reverse()[1])[0]
                  }: ${spiltFilterString(val.split(/\[|\]/).reverse()[1])[1]}`,
                  // text: spiltFilterString(val.split(/\[|\]/).reverse()[1])[0]+": "+spiltFilterString(val.split(/\[|\]/).reverse()[1])[1]
                },
              });
              test.orphans().move({
                parent: val,
              });
              pp = pp.difference(test);
              console.log(pp);
              
            });

            console.log("structureNode", structureNode);
          } else {
            newAryCollection.map(function (value, index, array) {
              value.forEach((val, i) => {
                let queryNodesWithParent = cy.collection();
                console.log(`=======${val}======`);
                cy.add({
                  data: {
                    type: spiltFilterString(val)[0],
                    id: `${spiltFilterString(val)[1]}`,
                    label: "parent",
                    text: `${toUpperCase(spiltFilterString(val)[0])}:${
                      spiltFilterString(val)[1]
                    }`,
                  },
                });

                let fitQueryNodes;
                if (spiltFilterString(val)[0] == "resourceGroup") {
                  console.log("get resourceGroup");
                  fitQueryNodes = queryNodes.filter(function (element) {
                    console.log("RGG", element.data("tag.Application"));
                    console.log(
                      element
                        .data("resourceGroup")
                        .indexOf(spiltFilterString(val)[1])
                    );
                    return (
                      element
                        .data("resourceGroup")
                        .indexOf(spiltFilterString(val)[1]) != -1
                    );
                  });
                  queryNodesWithParent = fitQueryNodes.union(
                    fitQueryNodes.parent()
                  );
                } else {
                  queryNodesWithParent = queryNodesWithParent
                    .union(queryNodes.filter(`node[${val}]`))
                    .union(queryNodes.filter(`node[${val}]`).parent());
                }

                queryNodesWithParent.filter("node[^parent][^label]").move({
                  parent: `${spiltFilterString(val)[1]}`,
                });

                queryNodesWithParent.filter(`node[${val}]`).map((ele) => {
                  console.log(
                    "ele",
                    ele.data("name"),
                    ele.data(spiltFilterString(val)[0]),
                    ele.parent().data("text")
                  );
                });
              });
            });
          }
          cy.filter("node[label='parent']").map((ele) => {
            if (ele.isChildless()) {
              console.log("hidden", ele.data("text"));
              ele.addClass("hidden");
            }
          });
          graphElements.difference(queryNodes).addClass("notfilter");
        }
        cy.filter("node[label='parent']").map((eles) => {
          let totalCost = 0;
          eles.children().map((ele) => {
            totalCost += ele.data("cost_for_month");
            // console.log("eleele", ele.data("name"), ele.data("cost_for_month"))
          });
          eles.data(
            "cost_for_month",
            Math.round((totalCost + Number.EPSILON) * 100) / 100
          );
          // console.log(eles.data("text") ,totalCost, eles.data("cost_for_month"))
        });

        cy.layout(layout).run();
      });

      $("#testMutiFilter").click(function () {
        testMutiFilter();
      });
      function testMutiFilter() {
        console.log("click");
        const query = `node[ tag.Application = 'Processing'][tag.Project = 'Clouday1']`;
        const checkFilterType = cy.filter(`node[?tag.Application][?Project]`);
        let filteredNodes = cy.nodes(query);
        // filteredNodes.map(function(ele) {
        //   console.log(ele.data("name"))
        // })
        const graphElements = checkFilterType
          .merge(checkFilterType.outgoers())
          .merge(checkFilterType.incomers())
          .merge(checkFilterType.parent());

        cy.elements().remove();
        cy.add(graphElements);

        let collection1 = cy.collection();
        cy.nodes().map(function (ele) {
          _this.filterVal.forEach((value) => {
            if (ele.data(`${_this.filterType}`) == value) {
              collection1 = ele.union(ele.parent());
              collection1.filter("node[^parent]").move({
                parent: value,
              });
            }
          });
        });
        const fitQueryElements = graphElements.filter(
          `node[label != 'parent'][?${_this.filterType}]`
        );
        fitQueryElements.map(function (ele) {
          console.log(ele.data("name"), ele.data(`${_this.filterType}`));
        });
        graphElements.difference(fitQueryElements).addClass("notfilter");
      }
  
      cy.on("mouseover", "node", function (e) {
        var sel = e.target;
        // cy.elements()
        //   .difference(sel.outgoers())
        //   .not(sel)
        //   .addClass("semitransp");
        sel.addClass("highlight").outgoers().addClass("highlight");
      });

      cy.on("mouseout", "node", function (e) {
        var sel = e.target;
        // cy.elements().removeClass("semitransp");
        sel.removeClass("highlight").outgoers().removeClass("highlight");
      });
      cy.on("tap", function (event) {
        if (event.target === cy) {
          cy.elements().removeClass("clickstyle");
          _this.isRightSidebarOpen = false;
        }
      });
      cy.on("tap", "node", function (e) {
        _this.isRightSidebarOpen = true;
        if (_this.isRightSidebarOpen) {
        }
        cy.elements().removeClass("clickstyle");

        e.target.addClass("clickstyle").outgoers().addClass("clickstyle");
        // console.log(this.nodes+"nodes")

        const filterOpt = ["id", "parent", "account_id", "fitQuery", "fitParent"];
        this.targetNode = e.target.data();
        _this.newTargetObj = {};
        for (var i in this.targetNode) {
          if (filterOpt.indexOf(i) == -1) {
            const index = `${i.charAt(0).toUpperCase()}${i.slice(1)}`;

            _this.newTargetObj = Object.assign(_this.newTargetObj, {
              [index]: this.targetNode[i],
            });
            // _this.newTargetObj = JSON.stringify(_this.newTargetObj)
            // console.log(newTargetObj)
            // console.log(index+":"+this.targetNode[i])
          }
        }
        // console.log(JSON.stringify(_this.newTargetObj))
      });

      var defaults = {
        container: false, // html dom element
        viewLiveFramerate: 0, // set false to update graph pan only on drag end; set 0 to do it instantly; set a number (frames per second) to update not more than N times per second
        thumbnailEventFramerate: 30, // max thumbnail's updates per second triggered by graph updates
        thumbnailLiveFramerate: false, // max thumbnail's updates per second. Set false to disable
        dblClickDelay: 200, // milliseconds
        removeCustomContainer: false, // destroy the container specified by user on plugin destroy
        rerenderDelay: 100, // ms to throttle rerender updates to the panzoom for performance
      };

      var nav = cy.navigator(defaults);
    },
  },
  async mounted() {
    let params = JSON.parse(sessionStorage.getItem("item"));
    this.requestID = params.requestID;
    this.archName = params.archName;

    let _this = this;
    const dataURL =
      // "https://o6q2hh5nkpdfq4qmzh2s7vexqi0aovau.lambda-url.us-west-2.on.aws/";
      "https://3qgd653iwxosnngnisli7ybxrq0xqqgt.lambda-url.us-west-2.on.aws/";
    try {
      // this.loading = true
      await axios
        .get(dataURL, { params: { requestid: this.requestID } })
        .then((res) => {
          // console.log(JSON.parse(res.data.message))
          var JSONdata = JSON.parse(res.data.message);
          this.nodes = JSONdata[1];
          this.edges = JSONdata[2];

          this.tag.Department = JSONdata[0][0].tag.Department;
          this.tag.Environment = JSONdata[0][0].tag.Environment;
          this.tag.Owner = JSONdata[0][0].tag.Owner;
          this.tag.Project = JSONdata[0][0].tag.Project;
          this.tag.Application = JSONdata[0][0].tag.Application;
          this.ResourceRegionResult = JSONdata[0][0].region;
          this.ResourceRGResult = JSONdata[0][0].resourceGroup;
          this.ResourceTypeResult = JSONdata[0][0].type;
          // this.nodes = res.data[0];
          // this.edges = res.data[1];
        })
        .catch((err) => {
          console.log(err);
        });
      // this.ListIncludeResourceType();
      // this.ListIncludeResourceRegion();
      this.ListIncludeAccountID();
      // this.ListIncludeRG();
      console.log("this.ResourceAccountID", this.ResourceAccountID);
      // this.ListIncludeTag();
      this.Addimg();
      // console.log(this.nodes)
      await this.createCytoscape(_this);
    } catch (e) {
      this.errors.push(e);
    }
  },
};
</script>

<style lang="scss">

</style>


<style lang="scss" scoped>

.b-nav.navbar {
    // display: none !important;
    // margin-left: 50px;
    justify-content: flex-end !important;
}

#cy {
  // max-width: 100%;
  /* height: 75%; */
  height: 515px;
  border: 2px solid #a1a1a1;
  border-radius: 5px;
  color: #cccccc;
  margin: 10px 15px;
  background-image: radial-gradient(#bebebe7b 1px, transparent 0);
  background-size: 18px 18px;
  /* position: relative; */
  /* position: absolute; */
  /* left: 0; */
  /* top: 0; */
  z-index: 1 !important;
}

h1 {
  opacity: 0.5;
  font-size: 1em;
}

main {
  transition: all 0.3s ease;
  margin-left: 50px;
  padding: 8px 8px 0;
  margin-bottom: 0px;
  max-width: 100%;
  &.active {
    margin-left: 250px;
  }
}

.close-sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 50px;
  height: 100%;
  background: #343a40;
  transition: all 0.3s ease;
  button,
  button:hover {
    background: transparent;
    border: 0;
    .b-icon {
      color: rgb(235, 235, 235);
    }
  }
}

.b-icon.delete-icon {
  font-size: 20px;
}

.leftSidebar-menu {
  // background: #000 !important;
  li {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    margin: 4px 0;
    list-style: none;
  }
  hr {
    background: rgba(255, 255, 255, 0.196);
  }
}

.cytoscape-navigator {
  z-index: 1;
}

.filter-panel {
  width: 450px;
  select {
    margin-right: 8px;
  }
}

.filter-result {
  margin-left: 15px;
  font-weight: bold;
  color: #818181;
}

.sidebar-title {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.388);
  word-wrap: break-word;
  font-weight: bold;
}

.info-content {
  font-size: 13px;
  .info-content-title {
    font-weight: bold;
    color: rgb(98, 175, 205);
  }
  .info-content-subtitle {
    font-weight: bold;
    // color: rgb(223, 170, 38);
    color: rgb(215, 161, 91);
  }
  input {
    max-width: 150px;
    color: #639c5a;
    &[disabled] {
      color: #939794;
    }
  }
  & > div > div {
    margin-left: 15px;
  }
  .cost {
    font-size: 16px;
    color: #df7979;
  }
}

.content-title {
  align-items: center;
  margin-bottom: 0.5rem;
  img {
    border-radius: 15%;
    width: 40px;
    height: 40px;
  }
  .titleAndType input {
    max-width: 100%;
    font-weight: bold;
    color: #595a5a;
    font-size: 18px;
    margin: 4px 0;
    display: block;
    border: 0;
    background: transparent;
  }
}

.console-link {
  position: fixed;
  right: 10px;
  bottom: 20px;
  border: 0;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgb(8, 118, 165);
  .b-icon {
    font-size: 100%;
    vertical-align: text-top;
    color: white;
  }
  &:hover {
    background: #db9a47;
  }
}

.cytoscape-navigator {
  z-index: 0 !important;
}
</style>
