function Fact({ icon, label, value }) {
  return (
    <div className="fact">
      <span>{icon}{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default Fact;
