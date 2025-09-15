import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <Grid
      overflowX="hidden"
      templateAreas={`"nav" "main"`}
      templateColumns="1fr"
    >
      <GridItem area="nav">
        <NavBar />
      </GridItem>

      <GridItem
        area="main"
        width="100%"
        maxWidth="100vw"
        overflowX="hidden"
        p={5}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </GridItem>
    </Grid>
  );
}

export default App;
