import MainLayout from "./main/layout";

export default function Home() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-purple-700">
          Bienvenido a Study Cards App
        </h1>
      </div>
    </MainLayout>
  );
}
