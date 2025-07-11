const allowedStacks = ["backend", "frontend"];
const allowedLevels = ["debug", "info", "warn", "error", "fatal"];

const allowedBackendPackages = [
  "cache",
  "controller",
  "cron_job",
  "db",
  "domain",
  "handler",
  "repository",
  "route",
  "service"
];

const allowedFrontendPackages = ["api"];

function validateLogInput(stack, level, pkg) {
  if (!allowedStacks.includes(stack)) {
    throw new Error(`Invalid stack: ${stack}`);
  }

  if (!allowedLevels.includes(level)) {
    throw new Error(`Invalid level: ${level}`);
  }

  if (stack === "backend") {
    if (!allowedBackendPackages.includes(pkg)) {
      throw new Error(`Invalid backend package: ${pkg}`);
    }
  } else if (stack === "frontend") {
    if (!allowedFrontendPackages.includes(pkg)) {
      throw new Error(`Invalid frontend package: ${pkg}`);
    }
  }
}

async function Log(stack, level, pkg, message) {
  try {
    validateLogInput(stack, level, pkg);
  } catch (error) {
    console.error("Validation error:", error.message);
    return;
  }

  const payload = {
    stack,
    level,
    package: pkg,
    message
  };

  try {
    const response = await fetch(
      "http://localhost:8000/employees",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
          
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      console.error("Error sending log:", response.statusText);
      return;
    }

    const data = await response.json();
    console.log("Log created successfully:", data);
    return data;
  } catch (error) {
    console.error("Error making API call:", error.message);
  }
}

module.exports = {
  Log
};