export default `
  precision mediump float;

  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  // Gradient function
  vec3 gradient(float t) {
    // Define the colors of the gradient
    vec3 c1 = vec3(0.0, 0.8, 0.6); // Cyan
    vec3 c2 = vec3(0.8, 0.6, 0.0); // Orange
    vec3 c3 = vec3(0.8, 0.0, 0.6); // Purple

    // Interpolate between the colors based on t
    float t2 = smoothstep(0.0, 0.5, t);
    float t3 = smoothstep(0.5, 1.0, t);
    return mix(c1, c2, t2) + mix(c2, c3, t3);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution;
    st.x += sin(st.y * 10.0 + u_time - (u_mouse.y * 1.5)) * 0.2;
    st.y += cos(st.x * 10.0 + u_time - (u_mouse.x * 1.5)) * 0.2;

    float r = sqrt(dot(st, st));
    float theta = atan(st.y, st.x);
    theta += sin(r * 10.0 + u_time) * 0.2;
    r += cos(theta * 10.0 + u_time) * 0.2;

    st.x = r * cos(theta);
    st.y = r * sin(theta);

    // Use the gradient function to determine the color
    vec3 color = gradient(st.x * 0.5 + 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`;
