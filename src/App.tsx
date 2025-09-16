import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Resume from "./pages/Resume";
import Footer from "./components/Footer";

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
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </GridItem>

      <Footer />
    </Grid>
  );
}

export default App;
