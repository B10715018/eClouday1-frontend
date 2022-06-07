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
                      class="m-1"
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
          <b-button id="AddNode" @click="AddNode()">Add</b-button>

          <!-- <b-button v-b-toggle.sidebar-1>Add</b-button>
          <b-sidebar id="sidebar-1" title="Add Resource" shadow>
            <div class="px-3 py-2">
              <b-form-select
                v-model="selectedNode"
                :options="AddNodeoption"
              ></b-form-select>
              {{ selectedNode }}
            </div>
            <b-button id="AddNode" @click="AddNode()">Add</b-button>
          </b-sidebar> -->
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
            <input
              type="text"
              v-model="checkNewTargetObj(newTargetObj)[1][index][i]"
              :disabled="disabledInput"
            />
            "
          </div>
        </div>
        <hr />

        <p class="cost">
          <b-icon icon="currency-dollar"></b-icon>
          $ {{ newTargetObj.Cost_for_month }} USD / month
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
window.$ = window.jQuery = jQuery;
// cytoscape
import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import edgehandles from "cytoscape-edgehandles";
import fcose from "cytoscape-fcose";
import expandCollapse from "cytoscape-expand-collapse";
import { fcose_layout, dagre_layout, cytoStyle } from "@/components/cytoscape/handleStyle.js";
import { nodeImg } from "@/components/cytoscape/handleImg.js";

cytoscape.use(expandCollapse);
cytoscape.use(fcose);
cytoscape.use(dagre);
cytoscape.use(edgehandles);

var navigator = require("cytoscape-navigator");

navigator(cytoscape); // register extension
/*eslint-disable*/

export default {
  name: "cytoscape",
  components: {},
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
      AddNodeoption: [
        { text: "Lambda", value: "Lambda" },
        { text: "EC2", value: "EC2" },
        { text: "S3", value: "S3" },
        { text: "RDS", value: "RDS" },
        { text: "DynamoDB", value: "DynamoDB" },
        { text: "CloudFront", value: "CloudFront" },
        { text: "WAF", value: "WAF" },
      ],
      selectedNode: "",
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
      for (var i = 0; i < this.nodes.length; i++) {
        for (var j = 0; j < nodeImg.length; j++) {
          if (nodeImg[j].title.indexOf(this.nodes[i].data.type) != -1) {
            this.nodes[i].data.url = nodeImg[j].url;
            // console.log(dataset.nodes[i].data)
          }
        }
      }
    },
    Mappingimg(node) {
      let img_url;
      nodeImg.forEach((val) => {
        if (val.title == node) {
          img_url = val.url;
        }
      });
      return img_url;
    },
    createCytoscape(_this) {
      cytoscape.warnings(false);
      // cytoscape({
     
      var cy = cytoscape({
        container: document.getElementById("cy"),

        boxSelectionEnabled: false,
        autounselectify: true,

        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },

        layout: fcose_layout, // dagre_layout

        style: cytoStyle,
        ready: function () {
          cy = this;
          cy.filter("node[label = 'parent']").data("isShow", false);
          // cy.nodes().move({
          //   parent: "Back-end"
          // })
          cy.filter("node[label = 'parent'][!isShow]").addClass("hidden");
        },
      });

      function grouping() {
        _this.ResourceTypeResult.map((val, i) => {
          cy.add({
            data: {
              type: val,
              id: `${val}-${i}`,
              name: val,
              label: "parent",
              group: "group",
              text: val,
              url: _this.Mappingimg(val),
            },
          });
          let nodes = cy.filter(function (element) {
            return (
              element.isOrphan() &&
              element.data("type") == val &&
              element.neighborhood().length == 0 &&
              !element.isParent()
            );
          });
          nodes.move({
            parent: `${val}-${i}`,
          });
        });
        cy.filter(function (element) {
          return element.data("group") == "group" && !element.isParent();
        }).remove();
      }

      $("#AddNode").click(function () {
        // cy.add({
        //   data: {
        //     type: _this.selectedNode,
        //     id: `${_this.selectedNode}[2]`,
        //     name: _this.selectedNode,
        //     mode: "test",
        //   },
        // });
        // let img_url = _this.Mappingimg(_this.selectedNode);
        // // cy.$(`#${_this.selectedNode}[2]`).data("url", img_url)
        // cy.filter(`node[id='${_this.selectedNode}[2]']`).map((ele) => {
        //   ele.data("url", img_url);
        //   // console.log(ele.data("id"), ele.data("url"))
        // });

        const group = async () => {
          await grouping();
          await cy.layout(fcose_layout).run();
        };
        group();
        // console.log(cy.filter(`node[id='${_this.selectedNode}[2]']`).data("url"))
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
        cy.nodes().removeClass("notfilter", "highlight", "income_highlight");

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

        cy.layout(fcose_layout).run();
      });

      // expand / collapse

      // use expandcollapse extension:
      var api = cy.expandCollapse({
        layoutBy: fcose_layout, // 用於展開/折疊後的重新排列。它只是佈局選項或整個佈局功能。選擇你的身邊！
        fisheye: true, // 展開/折疊後是否進行魚眼查看 你可以指定一個函數 too
        animate: true, // 是否在繪圖變化時動畫 你可以指定一個函數 too
        undoable: true, // 如果存在 undoRedoExtension，

        cueEnabled: true, // 是否啟用
        expandCollapseCuePosition: "top-right", // 默認 cue 位置是左上角 你也可以為每個節點指定一個函數
        expandCollapseCueSize: 12, // 展開折疊 cue 的大小
        expandCollapseCueLineSize: 8, // 用於繪製加減圖標的線條大小
        expandCueImage: undefined, // 如果未定義則展開圖標的圖像繪製常規展開提示
        collapseCueImage: undefined, // 如果未定義則折疊圖標的圖像繪製常規折疊提示
        expandCollapseCueSensitivity: 1, // 展開-折疊提示的靈敏度
        allowNestedEdgeCollapse: true,
        expandCueImage:
          "https://raw.githubusercontent.com/iVis-at-Bilkent/cytoscape.js-expand-collapse/master/demo/icon-plus.png",
        collapseCueImage:
          "https://raw.githubusercontent.com/iVis-at-Bilkent/cytoscape.js-expand-collapse/master/demo/icon-minus.png",
      });

      cy.on("mouseover", "node", function (e) {
        var sel = e.target;
        cy.elements()
          .difference(sel.outgoers())
          .difference(sel.incomers())
          .difference(sel.parent())
          .difference(sel.children())
          .not(sel)
          .addClass("semitransp");
        sel.incomers().addClass("income_highlight");
        sel
          .addClass("target_highlight")
          .outgoers()
          .addClass("target_highlight");
      });

      cy.on("mouseout", "node", function (e) {
        var sel = e.target;
        cy.elements().removeClass("semitransp");
        sel
          .removeClass("target_highlight")
          .outgoers()
          .removeClass("target_highlight");
        sel.incomers().removeClass("income_highlight");
      });
      cy.on("tap", function (event) {
        if (event.target === cy) {
          cy.elements().removeClass("click_semitransp");
          cy.elements().removeClass("target_clickstyle");
          cy.elements().removeClass("income_clickstyle");
          _this.isRightSidebarOpen = false;
        }
      });
      cy.on("tap", "node", function (e) {
        var sel = e.target;
        _this.isRightSidebarOpen = true;
        if (_this.isRightSidebarOpen) {
        }
        cy.elements().removeClass("click_semitransp");
        cy.elements().removeClass("target_clickstyle");
        cy.elements().removeClass("income_clickstyle");

        sel
          .addClass("target_clickstyle")
          .outgoers()
          .addClass("target_clickstyle");
        sel.incomers().addClass("income_clickstyle");
        cy.elements()
          .difference(sel.outgoers())
          .difference(sel.incomers())
          .difference(sel.parent())
          .difference(sel.children())
          .not(sel)
          .addClass("click_semitransp");

        // console.log(this.nodes+"nodes")

        const filterOpt = [
          "id",
          "parent",
          "account_id",
          "fitQuery",
          "fitParent",
        ];
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

      // navga
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

      // connect
      // the default values of each option are outlined below:
      let connectdefaults = {
        canConnect: function (sourceNode, targetNode) {
          // whether an edge can be created between source and target
          return !sourceNode.same(targetNode); // e.g. disallow loops
        },
        edgeParams: function (sourceNode, targetNode) {
          // for edges between the specified source and target
          // return element object to be passed to cy.add() for edge
          return {};
        },
        hoverDelay: 150, // time spent hovering over a target node before it is considered selected
        snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
        snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
        snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
        noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
        disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
      };

      let eh = cy.edgehandles(connectdefaults);
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
    width: 50%;
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
    width: 100%;
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
    font-size: 20xp;
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
