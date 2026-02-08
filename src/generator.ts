import { graphDataLatestVersion, isComputedNodeData } from "graphai";
import type { NodeData } from "graphai";

export class GraphGenerator {
  public nodes: Record<string, NodeData> = {};

  constructor() {
    this.nodes = {};
  }
  public addNode(nodeId: string, node: NodeData) {
    this.nodes[nodeId] = node;
  }
  public addEdge(data: { from: string[]; to: string[] }) {
    const { from: fromData, to: toData } = data;
    if (!fromData || !toData) {
      throw new Error("no data");
    }
    const fromNodeId = fromData[0] ?? "";
    const toNodeId = toData.shift() ?? "";

    if (!this.nodes[fromNodeId] || !this.nodes[toNodeId]) {
      throw new Error("no data");
    }

    const toNode = this.nodes[toNodeId];
    if (isComputedNodeData(toNode)) {
      if (!toNode.inputs) {
        toNode.inputs = {};
      }
      toNode.inputs[toData[0]] = ":" + fromData.join(".");
    }
  }
  public graph() {
    return {
      version: graphDataLatestVersion,
      nodes: this.nodes,
    };
  }
}
