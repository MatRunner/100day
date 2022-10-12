import { useRef, useState } from "react"
export default function () {
  const $canvas = useRef<HTMLCanvasElement | null>(null)
  const $input = useRef<HTMLInputElement | null>(null)
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const getArray = () => {
    if (!$input.current) return
    const str = $input.current.value
    if (/^\[/.test(str) && /\]$/.test(str)) {
      try {
        const t = str.slice(1, str.length - 1)
        const t2 = t.split(',').map(i => +i)
        if (t2.findIndex(i => Object.is(i, NaN)) > -1) {
          alert('invalid array!')
          return
        }
        setData(t2)
      } catch (e) {
        alert(e)
      }
    } else {
      alert('invalid array!')
    }
  }
  return <div>
    <div className="relative top-[-30px] ">
      <span className="mr-2">type an array</span><input ref={$input} type="text" className="border-gray-700 border mr-2" placeholder="[1,2,3,4,5]" />
      <button className="border border-gray-700 rounded bg-slate-100 pl-1 pr-1" onClick={getArray}>create</button>
    </div>
    <canvas id='binary-tree' width={980} height={600} ref={$canvas}></canvas>
  </div>
}