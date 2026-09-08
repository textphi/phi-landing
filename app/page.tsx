import Hero from "./components/Hero";
import UseCases from "./components/UseCases";
import Engine from "./components/Engine";
import Brokerages from "./components/Brokerages";
import FAQ from "./components/FAQ";

export default function Home() {
  return (
    <main>
      <Hero />
      <UseCases />
      <Engine />
      <Brokerages />
      <FAQ />
    </main>
  );
}
