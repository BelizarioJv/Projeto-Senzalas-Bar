export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-stone-800 via-stone-900 to-black  text-white">
      <div className="text-center p-8 rounded-xl shadow-lg bg-gray-950/70 backdrop-blur-md">
        <h1 className="text-4xl font-extrabold mb-4 text-accent">
          Senzalas Bar
        </h1>
        <p className="text-lg text-gray-300">
          Bem-vindo ao App{" "}
          <span className="font-semibold text-accent-foreground">
            Senzalas Bar
          </span>
        </p>
      </div>
    </div>
  );
}
