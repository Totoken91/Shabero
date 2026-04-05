uniform float uTime;
varying vec2 vUv;

void main() {
  float wave1 = sin(vUv.x * 3.0 + uTime * 0.3) * 0.5 + 0.5;
  float wave2 = sin(vUv.x * 5.0 - uTime * 0.2 + 1.5) * 0.5 + 0.5;
  float wave3 = sin(vUv.x * 2.0 + uTime * 0.15 + 3.0) * 0.5 + 0.5;

  float band1 = smoothstep(0.0, 0.3, wave1) * smoothstep(1.0, 0.5, vUv.y + wave1 * 0.3);
  float band2 = smoothstep(0.0, 0.3, wave2) * smoothstep(1.0, 0.4, vUv.y + wave2 * 0.2);
  float band3 = smoothstep(0.0, 0.3, wave3) * smoothstep(1.0, 0.6, vUv.y + wave3 * 0.25);

  vec3 green = vec3(0.0, 1.0, 0.64);   // #00FFA3
  vec3 cyan = vec3(0.0, 0.898, 1.0);    // #00E5FF
  vec3 violet = vec3(0.702, 0.533, 1.0); // #B388FF

  vec3 color = green * band1 + cyan * band2 + violet * band3;
  float alpha = (band1 + band2 + band3) * 0.18;

  gl_FragColor = vec4(color, alpha);
}
