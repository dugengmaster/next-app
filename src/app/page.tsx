'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [mountTime] = useState(() => new Date().toLocaleTimeString())
  
  // 更詳細的生命週期追蹤
  console.log('🔄 Home 組件重新渲染了！', { count, inputValue, mountTime })
  
  // 追蹤組件掛載/卸載
  useEffect(() => {
    console.log('🎯 Home 組件掛載了！時間:', mountTime)
    return () => {
      console.log('💀 Home 組件卸載了！')
    }
  }, [])
  
  // 追蹤每次渲染
  useEffect(() => {
    console.log('📊 Home 組件狀態更新：', { count, inputValue })
  })
  
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">狀態測試頁面</h1>
      
      {/* 計數器測試 */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">計數器測試</h2>
        <p className="mb-2">當前計數：<span className="font-bold text-blue-600">{count}</span></p>
        <div className="space-x-2">
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            增加 (+1)
          </button>
          <button 
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            減少 (-1)
          </button>
          <button 
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            重置
          </button>
        </div>
      </div>

      {/* 輸入框測試 */}
      <div className="border p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">輸入框測試</h2>
        <p className="mb-2">輸入的內容：<span className="font-bold text-green-600">{inputValue}</span></p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="輸入一些文字..."
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setInputValue('')}
          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          清空輸入
        </button>
      </div>

      {/* 時間戳測試 */}
      <div className="border p-4 rounded bg-blue-50">
        <h2 className="text-lg font-semibold mb-2">⏰ 組件掛載時間</h2>
        <p className="text-sm">
          組件首次掛載時間：<span className="font-bold">{mountTime}</span>
        </p>
        <p className="text-xs text-gray-600 mt-1">
          如果這個時間在 toggle 後改變，代表組件重新掛載了
        </p>
      </div>

      {/* 測試說明 */}
      <div className="border p-4 rounded bg-yellow-50">
        <h2 className="text-lg font-semibold mb-2">🧪 測試步驟</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>增加計數器到一個數字（例如：10）</li>
          <li>在輸入框中輸入一些文字</li>
          <li>記住上面的掛載時間</li>
          <li>操作側邊欄的 toggle 按鈕</li>
          <li>觀察狀態和掛載時間是否改變</li>
          <li>檢查 Console 的生命週期訊息</li>
        </ol>
        <p className="mt-2 text-sm text-gray-600">
          如果狀態被重置，計數器會回到 0，掛載時間會更新
        </p>
      </div>
    </div>
  )
}