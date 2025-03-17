import test from "node:test";
import assert from "node:assert";
import { GraphGenerator } from "../src/generator";

test("test", async () => {
  const llm = {
    agent: "openAIAgent",
    params: {
      model: "gpt-4o",
    },
    inputs: {
      prompt: "Explain ML's transformer in 100 words.",
    },
  };

  const output = {
    agent: "copyAgent",
    params: {
      namedKey: "text",
    },
    console: {
      after: true,
    },
  };

  const graphGenerator = new GraphGenerator();
  graphGenerator.addNode("llm", llm);
  graphGenerator.addNode("output", output);
  graphGenerator.addEdge({ from: ["llm", "text"], to: ["output", "text"] });

  const expectGraph = {
    version: 0.5,
    nodes: {
      llm: {
        agent: "openAIAgent",
        params: {
          model: "gpt-4o",
        },
        inputs: {
          prompt: "Explain ML's transformer in 100 words.",
        },
      },
      output: {
        agent: "copyAgent",
        params: {
          namedKey: "text",
        },
        console: {
          after: true,
        },
        inputs: {
          text: ":llm.text",
        },
      },
    },
  };

  // console.log(JSON.stringify(graphGenerator.graph(), null, 2));

  assert.deepStrictEqual(expectGraph, graphGenerator.graph());
});
