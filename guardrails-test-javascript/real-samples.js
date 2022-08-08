function get_line(filename, line_no) {
    let getLineContentCommand =
      "/bin/sed -n " +
      parseInt(line_no, 10) +
      "p " +
      defaults.cwd +
      "/" +
      filename;
  
    let commandSTDOUT = "";
    try {
      commandSTDOUT = execSync(getLineContentCommand, defaults);
    } catch (error) {
      commandSTDOUT = "[GR-Error]: Error occurred in parsing line content.";
    }
  
    let lineContent = commandSTDOUT.toString().trim();
    if (lineContent.length > 350) {
      if (lineContent.toLowerCase().includes("guardrails-disable-line")) {
        lineContent =
          lineContent.substr(0, 350) + "[guardrails-disable-line][gr-truncated]";
      } else {
        lineContent = lineContent.substr(0, 350) + "[gr-truncated]";
      }
    }
    return lineContent.replace(/\'/g, "%27").replace(/\"/g, "%22");
  }