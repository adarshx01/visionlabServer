export function Hero() {
  return (
    <section className="bg-[#f8faff] py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">
          Empowering Education and Resolving Social Grievances with AI
        </h1>
        <div className="flex justify-center space-x-4">
          <button className="bg-[#1a73e8] text-white px-8 py-3 rounded-md hover:bg-[#1557b0] font-medium">
            Get Started
          </button>
          <button className="bg-white text-[#1a73e8] px-8 py-3 rounded-md border border-[#1a73e8] hover:bg-gray-50 font-medium">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

