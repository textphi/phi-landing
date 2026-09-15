import Hero from "./components/Hero";
import UseCases from "./components/UseCases";
import Engine from "./components/Engine";
import Memory from "./components/Memory";
import Brokerages from "./components/Brokerages";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <UseCases />
      <Engine />
      <Memory />
      <Brokerages />
      <FAQ />
      <Footer />
    </main>
  );
}
