import { useRef, useState, useEffect } from "react"
const WIDTH = 980
const HEIGHT = 600
export default function () {
  const $canvas = useRef<HTMLCanvasElement | null>(null)
  const $input = useRef<HTMLInputElement | null>(null)
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    paintStart()
  }, [data])
  const getArray = () => {
    if (!$input.current) return
    const str = $input.current.value
    console.log(str)
    if (str == '') return
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
  const paintStart = () => {
    if (!$canvas.current) return
    const ctx = $canvas.current.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.font = '24px serif'
    ctx.lineWidth = 1
    ctx.strokeStyle = 'black'
    paintTree(ctx, data)
  }
  const paintTree = (ctx: CanvasRenderingContext2D, data: number[]) => {
    const root = arrayToTree(data, 0)
    const depth = maxDepth(root)
    const yDistance = Math.floor(500 / depth)
    const yStart = 50
    const posStack = []
    // 先把位置信息集成了
    for (let i = 0; i < depth; i++) {
      const distance = Math.floor(WIDTH / (Math.pow(2, i) + 1))
      for (let j = 0; j < data.length && j < Math.pow(2, i); j++) {
        posStack.push({ x: distance * (j + 1), y: yStart + i * yDistance, val: String(data[j]) })
      }
      data = data.slice(Math.pow(2, i))
    }
    for (let i = 0; i < posStack.length; i++) {
      ctx.fillText(posStack[i].val, posStack[i].x, posStack[i].y)
      if (posStack[2 * i + 1]) {
        ctx.beginPath()
        ctx.moveTo(posStack[i].x + 5, posStack[i].y + 20)
        ctx.lineTo(posStack[2 * i + 1].x + 5, posStack[2 * i + 1].y - 30)
        ctx.closePath()
        ctx.stroke()
      }
      if (posStack[2 * i + 2]) {
        ctx.beginPath()
        ctx.moveTo(posStack[i].x + 5, posStack[i].y + 20)
        ctx.lineTo(posStack[2 * i + 2].x + 5, posStack[2 * i + 2].y - 30)
        ctx.closePath()
        ctx.stroke()
      }
    }
  }

  return <div>
    <div className="relative top-[-30px] ">
      <span className="mr-2">type an array</span><input ref={$input} type="text" className="border-gray-700 border mr-2" placeholder="[1,2,3,4,5]" />
      <button className="border border-gray-700 rounded bg-slate-100 pl-1 pr-1" onClick={getArray}>create</button>
    </div>
    <canvas id='binary-tree' width={WIDTH} height={HEIGHT} ref={$canvas}></canvas>
  </div>
}

//满二叉树数组和二叉链表之间的转换
interface Node {
  val: number;
  left: Node | null;
  right: Node | null;
}
function createTreeNode(val: number): Node {
  return {
    val: val,
    left: null,
    right: null,
  }
}

//数组转链表
function arrayToTree(arr: number[], rootIdx = 0) {
  if (!arr[rootIdx]) {
    return null
  }
  var root = createTreeNode(arr[rootIdx])
  root.left = arrayToTree(arr, rootIdx * 2 + 1)
  root.right = arrayToTree(arr, rootIdx * 2 + 2)
  return root
}
// 树高度
function maxDepth(root: Node | null, depth = 0): number {
  if (!root) return depth
  return Math.max(maxDepth(root.left, depth + 1), maxDepth(root.right, depth + 1))
};