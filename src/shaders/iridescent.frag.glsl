uniform float uTime;
uniform vec3 uColor;
varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), 3.0);
  float hueShift = fresnel * 2.0 + uTime * 0.2;

  vec3 iriColor = vec3(
    0.5 + 0.5 * cos(hueShift),
    0.5 + 0.5 * cos(hueShift + 2.094),
    0.5 + 0.5 * cos(hueShift + 4.189)
  );

  vec3 baseColor = mix(uColor, iriColor, fresnel * 0.7);
  float alpha = 0.15 + fresnel * 0.5;

  gl_FragColor = vec4(baseColor, alpha);
}
