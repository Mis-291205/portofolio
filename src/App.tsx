import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";

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

      <GridItem area="main" width="100%" maxWidth="100vw" overflowX="hidden">
        Main Content
      </GridItem>
    </Grid>
  );
}

export default App;
