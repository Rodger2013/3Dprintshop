export default function UnderplayPrototype() {
  const cards = [
    { name: 'Voltix', rarity: 'Basic', color: 'from-yellow-400 to-orange-500' },
    { name: 'Frostjaw', rarity: 'Rare', color: 'from-cyan-400 to-blue-500' },
    { name: 'Embera', rarity: 'Legendary', color: 'from-orange-500 to-red-600' },
    { name: 'Shadowlurk', rarity: 'Mythic', color: 'from-violet-500 to-purple-700' },
    { name: 'Dragonox', rarity: 'God', color: 'from-amber-500 to-orange-700' },
    { name: 'Voidrex', rarity: 'Secret', color: 'from-fuchsia-600 to-purple-900' },
    { name: 'Null Emperor', rarity: 'Impossibleun', color: 'from-gray-700 to-black' },
  ]

  const rewards = {
    Basic: 100,
    Rare: 300,
    Legendary: 1000,
    Mythic: 5000,
    God: 10000,
    Secret: 25000,
    Impossibleun: 50000,
  }

  const rarityChance = () => {
    const roll = Math.random() * 100
    if (roll < 60) return 0
    if (roll < 82) return 1
    if (roll < 93) return 2
    if (roll < 97) return 3
    if (roll < 99) return 4
    if (roll < 99.8) return 5
    return 6
  }

  const [tokens, setTokens] = React.useState(2450)
  const [daily, setDaily] = React.useState(2450)
  const [collection, setCollection] = React.useState([])
  const [pulled, setPulled] = React.useState(null)
  const [message, setMessage] = React.useState('Open a pack to begin your collection.')

  const openPack = () => {
    if (tokens < 500) {
      setMessage('Not enough tokens!')
      return
    }

    const card = cards[rarityChance()]

    setTokens(tokens - 500)
    setDaily(Math.min(50000, daily + rewards[card.rarity]))
    setCollection([...collection, card])
    setPulled(card)

    if (card.rarity === 'Impossibleun') {
      setMessage('⚠ IMPOSSIBLEUN PULL ⚠')
    } else {
      setMessage(`You pulled ${card.name}!`)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex font-sans">
      <div className="w-64 bg-black border-r border-zinc-800 p-6 flex flex-col gap-4">
        <div>
          <h1 className="text-4xl font-black text-violet-400">UNDERPLAY</h1>
          <p className="text-zinc-400 text-sm">Trading Card Game</p>
        </div>

        <div className="mt-6 space-y-2">
          {['Home', 'Play', 'Cards', 'Collections', 'Shop', 'Profile', 'Settings'].map((item) => (
            <button
              key={item}
              className={`w-full text-left px-4 py-3 rounded-xl transition ${item === 'Shop' ? 'bg-violet-600 text-white' : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300'}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-auto bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
          <p className="text-zinc-400 text-sm">Daily Token Cap</p>
          <h2 className="text-2xl font-bold">{daily.toLocaleString()} / 50,000</h2>
          <div className="w-full h-3 bg-zinc-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-violet-500"
              style={{ width: `${(daily / 50000) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-5xl font-black">Pack Shop</h2>
            <p className="text-zinc-400 mt-2">Open packs and collect rare characters.</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4">
            <p className="text-zinc-400">Tokens</p>
            <h2 className="text-3xl font-bold text-violet-400">{tokens.toLocaleString()}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {cards.map((card) => (
            <div
              key={card.name}
              className={`rounded-3xl p-6 bg-gradient-to-br ${card.color} shadow-2xl border border-white/10`}
            >
              <div className="bg-black/30 rounded-2xl p-6 h-full backdrop-blur-sm">
                <p className="uppercase text-sm opacity-80">{card.rarity}</p>
                <h3 className="text-3xl font-black mt-2">{card.name}</h3>
                <div className="mt-16">
                  <button
                    onClick={openPack}
                    className="w-full bg-white text-black font-bold py-3 rounded-xl hover:scale-105 transition"
                  >
                    Open Pack — 500
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-black">Collection</h2>
                <p className="text-zinc-400">Your owned cards</p>
              </div>
              <div className="text-right">
                <p className="text-zinc-400">Owned</p>
                <h3 className="text-2xl font-bold">{collection.length} / 357</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {collection.length === 0 && (
                <div className="col-span-full text-center py-20 text-zinc-500">
                  No cards yet.
                </div>
              )}

              {collection.map((card, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-4 bg-gradient-to-br ${card.color}`}
                >
                  <div className="bg-black/30 rounded-xl p-4 h-full">
                    <p className="text-xs uppercase">{card.rarity}</p>
                    <h3 className="text-xl font-bold mt-2">{card.name}</h3>
                    <p className="text-sm mt-8 opacity-80">+{rewards[card.rarity]} Tokens</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col">
            <h2 className="text-3xl font-black mb-4">Latest Pull</h2>

            {pulled ? (
              <div className={`rounded-3xl p-6 bg-gradient-to-br ${pulled.color} flex-1`}>
                <div className="bg-black/30 rounded-2xl p-6 h-full flex flex-col justify-between">
                  <div>
                    <p className="uppercase text-sm">{pulled.rarity}</p>
                    <h3 className="text-4xl font-black mt-2">{pulled.name}</h3>
                  </div>

                  <div>
                    <p className="text-lg font-semibold">Reward</p>
                    <h2 className="text-5xl font-black">{rewards[pulled.rarity].toLocaleString()}</h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500 bg-zinc-950 rounded-3xl border border-dashed border-zinc-700">
                Open a pack first.
              </div>
            )}

            <div className="mt-6 bg-violet-600 rounded-2xl p-4 text-center font-bold text-lg">
              {message}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
