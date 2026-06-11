import React, { useState, useMemo } from 'react'

export default function AreaVisualizer() {
  const [inputArea, setInputArea] = useState(500)
  const [unit, setUnit] = useState('sqft')
  const [hoveredRef, setHoveredRef] = useState(null)

  const references = [
    {
      name: 'Parking Space',
      sqft: 180,
      image: 'linear-gradient(135deg, #d4a574 0%, #8b7355 100%)',
      description: 'Standard car parking',
    },
    {
      name: 'Master Bedroom',
      sqft: 200,
      image: 'linear-gradient(135deg, #e8d5c4 0%, #d4a89b 100%)',
      description: 'Typical bedroom',
    },
    {
      name: 'Kitchen',
      sqft: 220,
      image: 'linear-gradient(135deg, #f5e6d3 0%, #d4a574 100%)',
      description: 'Average kitchen',
    },
    {
      name: 'Studio Apartment',
      sqft: 400,
      image: 'linear-gradient(135deg, #e8dcc8 0%, #c9b8a8 100%)',
      description: 'Compact living space',
    },
    {
      name: 'Tennis Court',
      sqft: 2808,
      image: 'linear-gradient(135deg, #7ba876 0%, #5a8b5e 100%)',
      description: 'Full tennis court',
    },
    {
      name: 'Basketball Court',
      sqft: 4700,
      image: 'linear-gradient(135deg, #8b7a6b 0%, #6b5a4a 100%)',
      description: 'Full-size court',
    },
  ]

  const areaInSqft = useMemo(() => {
    const conversions = { sqft: 1, sqm: 10.764, sqyd: 9 }
    return inputArea * conversions[unit]
  }, [inputArea, unit])

  const getDimensions = (sqft) => {
    const sqrt = Math.sqrt(sqft)
    return { width: sqrt.toFixed(1), height: sqrt.toFixed(1) }
  }

  const yourDims = getDimensions(areaInSqft)

  const maxSquare = Math.max(areaInSqft, ...references.map(r => r.sqft))

  const comparisons = useMemo(() => {
    return references.map((ref) => ({
      ...ref,
      ratio: areaInSqft / ref.sqft,
      times: (areaInSqft / ref.sqft).toFixed(1),
    }))
  }, [areaInSqft])

  const sortedComparisons = [...comparisons].sort((a, b) => a.sqft - b.sqft)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-16">
          <div className="inline-block mb-4 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold tracking-widest rounded">
            SPATIAL REASONING
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-stone-900 mb-4">
            Area Imagination
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl leading-relaxed">
            Visualize space sizes instantly. Enter an area and see it scaled against real rooms, courts, and buildings.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-stone-200 p-8">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
              Area Size
            </label>
            <input
              type="number"
              value={inputArea}
              onChange={(e) => setInputArea(Math.max(1, parseFloat(e.target.value) || 0))}
              className="w-full text-5xl font-black text-stone-900 bg-transparent focus:outline-none"
              min="1"
            />
            <div className="mt-4 pt-4 border-t border-stone-100 text-sm text-stone-600">
              <span className="font-semibold text-stone-900">{areaInSqft.toLocaleString('en-US', { maximumFractionDigits: 0 })} sq ft</span> total
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-8">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-3">
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full text-lg font-semibold text-stone-900 bg-transparent focus:outline-none"
            >
              <option value="sqft">Square Feet</option>
              <option value="sqm">Square Meters</option>
              <option value="sqyd">Square Yards</option>
            </select>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">How it compares to real spaces</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedComparisons.map((item, idx) => {
              const isSmaller = item.ratio < 1
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredRef(idx)}
                  onMouseLeave={() => setHoveredRef(null)}
                  className={`group rounded-xl overflow-hidden shadow-sm border border-stone-200 transition-all duration-300 ${
                    hoveredRef === idx ? 'shadow-lg' : 'hover:shadow-md'
                  }`}
                >
                  <div
                    style={{ background: item.image }}
                    className="h-32 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                  </div>

                  <div className="bg-white p-6">
                    <h3 className="font-bold text-lg text-stone-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-stone-600 mb-4">{item.description}</p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
                          Your space is <span className="text-orange-600">{item.times}× {isSmaller ? 'smaller' : 'larger'}</span>
                        </p>
                        <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500"
                            style={{ width: `${Math.min((item.sqft / maxSquare) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm font-mono text-stone-700">{item.sqft.toLocaleString()} sq ft</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-stone-900 to-stone-800 rounded-xl p-8 text-stone-100 mb-8">
          <h3 className="text-xl font-bold mb-6">Context for reference</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm opacity-75 mb-2">Average US Apartment</p>
              <p className="text-3xl font-black">950 sq ft</p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-2">Average US House</p>
              <p className="text-3xl font-black">2,300 sq ft</p>
            </div>
            <div>
              <p className="text-sm opacity-75 mb-2">Tiny Home</p>
              <p className="text-3xl font-black">100–400 sq ft</p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-stone-600">
          <p>Update the input above to explore different area sizes in real-time</p>
        </div>
      </div>
    </div>
  )
}
