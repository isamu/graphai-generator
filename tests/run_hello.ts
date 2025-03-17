import "dotenv/config";

import { GraphAI } from "graphai";
import { GraphGenerator } from "../src/generator";
import { openAIAgent } from "@graphai/openai_agent";
import * as vanilla from "@graphai/vanilla";

const test = async () => {
  const llm = {
    agent: "openAIAgent",
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
  const graphData = graphGenerator.graph();
  
  const graphai = new GraphAI(graphData, {...vanilla, openAIAgent});
  const res = await graphai.run();
  console.log(res);
};

test();
