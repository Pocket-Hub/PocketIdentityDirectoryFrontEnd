import "../styles/Loading.css";

export default function Loading({pos}) {

     return (
    <div className="loading-overlay" style={{position: `${pos}`}}>
      <div className="spinner" />
    </div>
  );
}
