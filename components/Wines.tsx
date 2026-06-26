export default function Wines() {
  return (
    <section className="bg-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-5xl font-bold text-center">
          Our Wines
        </h2>

        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6 mb-16"></div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold">Saperavi</h3>
            <p className="mt-4 text-gray-600">
              Rich, powerful and elegant Georgian red wine.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold">Rkatsiteli</h3>
            <p className="mt-4 text-gray-600">
              Fresh, aromatic and traditional white wine.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold">Kisi</h3>
            <p className="mt-4 text-gray-600">
              Premium Georgian variety with unique character.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}