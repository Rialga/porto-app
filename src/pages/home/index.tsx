import { Button } from '@/components/ui/button'
import { useCounterStore } from '@/stores/store'

const Home = () => {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <h1 className="text-5xl font-bold text-black">Welcome to Porto App</h1>
      <p className="text-lg text-black/70 text-center max-w-2xl">
        A modern web application built with React, TypeScript, Tailwind CSS, and Zustand state management.
      </p>
      
      <div className="flex flex-col items-center gap-4 rounded-xl border border-black/10 bg-white/80 backdrop-blur-sm p-8 shadow-lg mt-8">
        <h2 className="text-2xl font-semibold text-black">Counter Example (Zustand)</h2>
        <div className="text-6xl font-bold text-primary">{count}</div>
        
        <div className="flex gap-2">
          <Button onClick={decrement} variant="outline" size="md">
            Decrement
          </Button>
          <Button onClick={increment} size="md">
            Increment
          </Button>
          <Button onClick={reset} variant="secondary" size="md">
            Reset
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-8 justify-center">
        <Button variant="primary">Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="secondary">Secondary</Button>
        <Button size="sm">Small</Button>
      </div>
    </div>
  )
}

export default Home
