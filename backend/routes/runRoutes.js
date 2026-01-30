import express from "express";
import { exec } from "child_process";

const router = express.Router();

router.post("/run", (req, res) => {
  const { code, testCases } = req.body;

  if (!code || !testCases) {
    return res.status(400).json({ message: "Code and test cases are required" });
  }

  let results = [];
  let completed = 0;

  testCases.forEach((tc, index) => {
    // We pass input via stdin
    const command = `node -e "${code.replace(/"/g, '\\"')}"`;

    const child = exec(command, (error, stdout, stderr) => {
      completed++;

      if (error || stderr) {
        results[index] = {
          input: tc.input,
          expected: tc.output,
          output: stderr || error?.message,
          passed: false
        };
      } else {
        const userOutput = stdout.trim();
        const expectedOutput = tc.output.trim();

        results[index] = {
          input: tc.input,
          expected: expectedOutput,
          output: userOutput,
          passed: userOutput === expectedOutput
        };
      }

      if (completed === testCases.length) {
        res.json({ results });
      }
    });

    // Send input to program
    if (tc.input) {
      child.stdin.write(tc.input);
    }
    child.stdin.end();
  });
});

export default router;
