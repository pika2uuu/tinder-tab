import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#343440",
        color: "white",
      },
    },
    components: {
      Link: {
        baseStyle: {
          color: "#2865aa",
        },
      },
    },
  },
});

export default customTheme;