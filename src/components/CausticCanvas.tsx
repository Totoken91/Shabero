import { useRef, useEffect } from 'react'

const CAUSTIC_BODY = `
#define TAU 6.28318530718
float caustic(vec2 uv, float time) {
  vec2 p = mod(uv * TAU, TAU) - 250.0;
  vec2 i = p;
  float c = 1.0;
  for (int n = 0; n < 5; n++) {
    float t = time * (1.0 - (3.5 / float(n + 1)));
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 1.0 / length(vec2(p.x / (sin(i.x + t) / 0.005), p.y / (cos(i.y + t) / 0.005)));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}
`

const VERT = `
attribute vec2 a_position;
varying vec2 vUv;
void main() {
  vUv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const FRAG = `
precision highp float;
uniform float uTime;
varying vec2 vUv;
${CAUSTIC_BODY}
void main() {
  float c = caustic(vUv * 4.0, uTime * 0.4);
  vec3 color = vec3(0.5, 0.95, 1.0) * c * 2.0;
  gl_FragColor = vec4(color, c * 0.6);
}`

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function CausticCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl =
      (canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false }) ??
       canvas.getContext('experimental-webgl', { alpha: true, premultipliedAlpha: false })) as WebGLRenderingContext | null
    if (!gl) return

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) return

    const program = gl.createProgram()!
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    gl.useProgram(program)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'uTime')

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE)

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const t0 = performance.now()
    const loop = () => {
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform1f(uTime, (performance.now() - t0) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
