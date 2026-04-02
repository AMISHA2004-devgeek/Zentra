import FilterCard from "@/components/FilterCard";
import CuboidCanvas from "@/components/CuboidCanvas";

const CuboidSection = () => (
  <section className="cuboid-section">
    <div className="cuboid-left">
      <FilterCard />
    </div>
    <div className="cuboid-right">
      <CuboidCanvas />
    </div>
  </section>
);

export default CuboidSection;
