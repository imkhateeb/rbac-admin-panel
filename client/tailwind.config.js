module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-out": {
          "0%": { opacity: "0.5" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 2s infinite",
      },
      textColor: {
        primaryColor: "#3A643B",
        primaryYellow: "#FFF7E2",
      },
      backgroundColor: {
        primaryColor: "#3A643B",
        secondaryColor: "#f6f6f6",
        tertiaryColor: "#fff7e2",
        primaryYellow: "#FFF7E2",
      },
      borderColor: {
        primaryColor: "#3A643B",
        primaryYellow: "#FFF7E2",
      },
    },
  },
  plugins: [],
};
