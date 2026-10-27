import BuiltAroundBusiness from "@/components/home/BuiltAroundBusiness";
import CustomerSupport from "@/components/home/CustomerSupport";
import Hero from "@/components/home/Hero";
import Problems from "@/components/home/Problems";
import Process from "@/components/home/Process";
import Solutions from "@/components/home/Solutions";
import WhyQuarry from "@/components/home/WhyQuarry";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problems />
      <Solutions />
      <Process />
      <BuiltAroundBusiness />
      <div className="bg-[#091c32]">
        <WhyQuarry />
      </div>
      <CustomerSupport />
    </main>
  );
}
