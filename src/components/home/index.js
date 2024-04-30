export default function Home({info}) {
    return (
      <div>
        <h1>Pulser</h1>
        
        <p>This is the home page</p>
        <p>{info?.appName}</p>
        <p>{info?.description}</p>
        <p>{info?.developers}</p>
      </div>
    );
  }