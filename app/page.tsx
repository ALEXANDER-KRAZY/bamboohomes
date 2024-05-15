import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";

export default function Home() {
  return (
    <ClientOnly>
      <Container>
        <div className="
        pt-24
        
        ">
          <div>
            my future listings
          </div>
        </div>
      </Container>
    </ClientOnly>
  )
}
