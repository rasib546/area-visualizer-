import React, { useState, useMemo } from 'react'

export default function AreaVisualizer() {
  const [inputArea, setInputArea] = useState(500)
  const [unit, setUnit] = useState('sqft')

  const references = [
    { name: 'Parking Space', sqft: 180, image: '#d4a574' },
    { name: 'Bedroom', sqft: 200, image: '#e8d5c4' },
    { name: 'Kitchen', sqft: 220, image: '#f5e6d3' },
    { name: 'Studio Apartment', sqft: 400, image: '#e8dcc8' },
    { name: 'Tennis Court', sqft: 2808, image: '#7ba876' },
    { name: 'Basketball Court', sqft: 4700, image: '#8b7a6b' },
  ]

  const areaInSqft = useMemo(() => {
    const conversions = { sqft: 1, sqm: 10.764, sqyd: 9 }
    return inputArea * conversions[unit]
  }, [inputArea, unit])

  const maxSquare = Math.max(areaInSqft, ...references.map(r => r.sqft))

  const comparisons = references.map((ref) => ({
    ...ref,
    ratio: areaInSqft / ref.sqft,
    times: (areaInSqft / ref.sqft).toFixed(1),
  }))

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #faf8f4 0%, #f0e9e0 100%)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#1a1a1a', marginBottom: '16px' }}>
            Area Imagination
          </h1>
          <p style={{ fontSize: '18px', color: '#666', maxWidth: '500px', lineHeight: '1.6' }}>
            Visualize space sizes instantly. Enter an area and see it compared to real rooms and courts.
          </p>
        </div>

        {/* Input */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', marginBottom: '12px' }}>
              Area Size
            </label>
            <input
              type="number"
              value={inputArea}
              onChange={(e) => setInputArea(Math.max(1, parseFloat(e.target.value) || 0))}
              style={{ width: '100%', fontSize: '36px', fontWeight: 'bold', color: '#1a1a1a', background: 'transparent', border: 'none', outline: 'none' }}
              min="1"
            />
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0', fontSize: '14px', color: '#666' }}>
              <span style={{ fontWeight: 'bold', color: '#1a1a1a' }}>{areaInSqft.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span> sq ft total
            </div>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e0e0e0' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase', marginBottom: '12px' }}>
              Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={{ width: '100%', fontSize: '18px', fontWeight: '600', color: '#1a1a1a', background: 'transparent', border: 'none', outline: 'none' }}
            >
              <option value="sqft">Square Feet</option>
              <option value="sqm">Square Meters</option>
              <option value="sqyd">Square Yards</option>
            </select>
          </div>
        </div>

        {/* Comparisons */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '24px' }}>How it compares</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {comparisons.map((item, idx) => {
              const isSmaller = item.ratio < 1
              return (
                <div key={idx} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <div style={{ height: '120px', background: item.image, opacity: 0.8 }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '4px' }}>{item.name}</h3>
                    <p style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>{item.sqft.toLocaleString()} sq ft</p>
                    
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#666', textTransform: 'uppercase', marginBottom: '8px' }}>
                        Your space is <span style={{ color: '#d97706' }}>{item.times}× {isSmaller ? 'smaller' : 'larger'}</span>
                      </p>
                      <div style={{ width: '100%', height: '8px', background: '#f0f0f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            background: 'linear-gradient(90deg, #d97706 0%, #ea580c 100%)',
                            width: Math.min((item.sqft / maxSquare) * 100, 100) + '%',
                            transition: 'width 0.3s ease'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ background: '#1a1a1a', color: 'white', padding: '32px', borderRadius: '12px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Reference sizes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
            <div>
              <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '8px' }}>Average US Apartment</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }}>950 sq ft</p>
            </div>
            <div>
              <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '8px' }}>Average US House</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }}>2,300 sq ft</p>
            </div>
            <div>
              <p style={{ fontSize: '13px', opacity: 0.7, marginBottom: '8px' }}>Tiny Home</p>
              <p style={{ fontSize: '32px', fontWeight: 'bold' }}>100–400 sq ft</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
