import Hero from "./components/Hero";
import UseCases from "./components/UseCases";
import Engine from "./components/Engine";
import Brokerages from "./components/Brokerages";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <UseCases />
      <Engine />
      <Brokerages />
      <FAQ />
      <Footer />
    </main>
  );
}
