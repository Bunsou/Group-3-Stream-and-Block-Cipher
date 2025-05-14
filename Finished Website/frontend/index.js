document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const elements = {
    input: {
      text: document.getElementById("input-text"),
      key: document.getElementById("secret-key"),
      format: {
        plain: document.getElementById("plain-text-format"),
        hex: document.getElementById("hex-format"),
        base64: document.getElementById("base64-format"),
        plainLabel: document.getElementById("plain-text-input-label"),
        hexLabel: document.getElementById("hex-input-label"),
        base64Label: document.getElementById("base64-input-label"),
        form: document.getElementById("input-format-form"),
      },
    },
    output: {
      text: document.getElementById("output-text"),
      format: {
        plain: document.getElementById("plain-text-output"),
        hex: document.getElementById("hex-output"),
        base64: document.getElementById("base64-output"),
        plainLabel: document.getElementById("plain-text-output-label"),
        hexLabel: document.getElementById("hex-output-label"),
        base64Label: document.getElementById("base64-output-label"),
        form: document.getElementById("output-format-form"),
      },
    },
    cipher: {
      selection: document.querySelector(".cipher-selection .ciphers"),
      blockOption: document.getElementById("block-cipher"),
      streamOption: document.getElementById("stream-cipher"),
    },
    mode: {
      encrypt: document.getElementById("encrypt-button"),
      decrypt: document.getElementById("decrypt-button"),
    },
    submit: document.getElementById("submit-button"),
    description: document.querySelector(".description .section-content"),
  };

  // Application state
  const state = {
    cipher: "block", // "block" or "stream"
    mode: "encrypt", // "encrypt" or "decrypt"
    inputFormat: "plain", // "plain", "hex", or "base64"
    outputFormat: "hex", // "plain", "hex", or "base64"
    backendBaseUrl: "https://crypto-bs-cipher-backend.vercel.app", // Replace with your backend URL
  };

  // Initialize UI
  function initializeUI() {
    setupEncryptMode();
    updateSubmitButtonState();
    updateDescription();
  }

  // Update description based on current state
  function updateDescription() {
    const modeText = state.mode === "encrypt" ? "encrypt" : "decrypt";
    const cipherText =
      state.cipher === "block" ? "block cipher" : "stream cipher";
    elements.description.textContent = `This tool allows you to ${modeText} any text or number input using ${cipherText} algorithm, ensuring your privacy and security.`;
  }

  // Enable/disable submit button based on input values
  function updateSubmitButtonState() {
    elements.submit.disabled = !(
      elements.input.text.value && elements.input.key.value
    );
  }

  // Set up UI for encrypt mode
  function setupEncryptMode() {
    // Update state
    state.mode = "encrypt";
    state.inputFormat = "plain";
    state.outputFormat = "hex";

    // Update button styles
    elements.mode.encrypt.classList.add("selected");
    elements.mode.decrypt.classList.remove("selected");

    // Configure input format options
    elements.input.format.plain.checked = true;
    elements.input.format.plain.disabled = false;
    elements.input.format.plainLabel.style.display = "inline";
    elements.input.format.hexLabel.style.display = "none";
    elements.input.format.base64Label.style.display = "none";

    // Configure output format options
    elements.output.format.plainLabel.style.display = "none";
    elements.output.format.hexLabel.style.display = "inline";
    elements.output.format.base64Label.style.display = "inline";
    elements.output.format.hex.checked = true;

    updateDescription();
  }

  // Set up UI for decrypt mode
  function setupDecryptMode() {
    // Update state
    state.mode = "decrypt";

    // Make sure input format is one of the valid options (hex/base64)
    // Default to 'hex' if current state is invalid
    state.inputFormat =
      state.inputFormat === "hex" || state.inputFormat === "base64"
        ? state.inputFormat
        : "hex";

    state.outputFormat = "plain";

    // Update button styles
    elements.mode.decrypt.classList.add("selected");
    elements.mode.encrypt.classList.remove("selected");

    // Configure input format options
    elements.input.format.plain.disabled = true;
    elements.input.format.plainLabel.style.display = "none";
    elements.input.format.hexLabel.style.display = "inline";
    elements.input.format.base64Label.style.display = "inline";
    elements.input.format.hex.checked = state.inputFormat === "hex";
    elements.input.format.base64.checked = state.inputFormat === "base64";

    // Configure output format options
    elements.output.format.plainLabel.style.display = "inline";
    elements.output.format.hexLabel.style.display = "none";
    elements.output.format.base64Label.style.display = "none";
    elements.output.format.plain.checked = true;

    updateDescription();
  }

  // Update cipher selection in UI
  function selectCipher(cipherType) {
    state.cipher = cipherType;

    if (cipherType === "block") {
      elements.cipher.blockOption.classList.add("selected");
      elements.cipher.blockOption.classList.remove("unselected");
      elements.cipher.streamOption.classList.add("unselected");
      elements.cipher.streamOption.classList.remove("selected");
    } else {
      elements.cipher.streamOption.classList.add("selected");
      elements.cipher.streamOption.classList.remove("unselected");
      elements.cipher.blockOption.classList.add("unselected");
      elements.cipher.blockOption.classList.remove("selected");
    }

    updateDescription();
  }

  // Process the input based on current state
  async function processData() {
    const inputText = elements.input.text.value;
    const secretKey = elements.input.key.value;

    // Input validation
    if (!inputText || !secretKey) {
      alert(
        `Please enter ${!inputText ? "text" : ""}${
          !inputText && !secretKey ? " and " : ""
        }${!secretKey ? "secret key" : ""}`
      );
      return;
    }

    try {
      // Determine endpoint based on mode and cipher
      const endpoint = `${state.backendBaseUrl}/api/${state.mode}/${state.cipher}`;

      // Prepare request body based on mode
      let requestBody;

      if (state.mode === "encrypt") {
        // For encryption, send plaintext and key only
        requestBody = {
          plaintext: inputText,
          key: secretKey,
        };
      } else {
        // For decryption, send ciphertext, key, AND format
        requestBody = {
          ciphertext: inputText,
          key: secretKey,
          format: state.inputFormat, // Must be 'hex' or 'base64'
        };
      }

      console.log("Sending request:", {
        endpoint,
        method: "POST",
        body: { ...requestBody, key: "******" }, // Log request without exposing the key
      });

      // Send request to backend
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      // Handle the response
      if (!response.ok) {
        const errorData = await response.json();
        elements.output.text.textContent = `${
          state.mode === "encrypt" ? "Encryption" : "Decryption"
        } failed: ${errorData.error || response.statusText}`;
        return;
      }

      // Parse successful response
      const data = await response.json();

      // Process response based on mode
      if (state.mode === "encrypt") {
        // For encryption, backend returns both hex and base64 options
        // We select based on user's output format choice
        elements.output.text.textContent = data.ciphertext[state.outputFormat];
      } else {
        // For decryption, backend returns plaintext directly
        elements.output.text.textContent = data.plaintext;
      }
    } catch (error) {
      console.error(`Error during ${state.mode}:`, error);
      elements.output.text.textContent = `${
        state.mode === "encrypt" ? "Encryption" : "Decryption"
      } failed due to a network error: ${error.message}`;
    }

    console.log("Processing complete");
    console.log("Mode:", state.mode);
    console.log("Cipher:", state.cipher);
    console.log("Input format:", state.inputFormat);
    console.log("Output format:", state.outputFormat);
  }

  // Event Listeners
  function setupEventListeners() {
    // Track input changes
    elements.input.text.addEventListener("input", (e) => {
      updateSubmitButtonState();
    });

    elements.input.key.addEventListener("input", (e) => {
      updateSubmitButtonState();
    });

    // Track input format changes
    elements.input.format.form.addEventListener("change", (e) => {
      if (e.target.type === "radio") {
        state.inputFormat = e.target.value;
        console.log("Input format changed to:", state.inputFormat);
      }
    });

    // Track output format changes
    elements.output.format.form.addEventListener("change", (e) => {
      if (e.target.type === "radio") {
        state.outputFormat = e.target.value;
        console.log("Output format changed to:", state.outputFormat);

        // If we already have encrypted data, update the display
        if (
          state.mode === "encrypt" &&
          elements.output.text.textContent &&
          elements.output.text.textContent !== "Output Value will appear here"
        ) {
          processData();
        }
      }
    });

    // Cipher selection
    elements.cipher.blockOption.addEventListener("click", () =>
      selectCipher("block")
    );
    elements.cipher.streamOption.addEventListener("click", () =>
      selectCipher("stream")
    );

    // Mode selection
    elements.mode.encrypt.addEventListener("click", setupEncryptMode);
    elements.mode.decrypt.addEventListener("click", setupDecryptMode);

    // Submit button
    elements.submit.addEventListener("click", processData);
  }

  // Initialize application
  setupEventListeners();
  initializeUI();
});
