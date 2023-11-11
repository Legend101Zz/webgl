var vertexShaderText = [
  "presion mediump float;",
  "",
  "attribute vec2 vertPosition;",
  "",
  "void main()",
  "{",
  " gl_Position = vec4(vertPosition,0.0,1.0);",
  "}",
].join("\n");

var fragmentShaderText = [
  "presion mediump float;",
  "",
  "void main()",
  "{",
  " gl_Fragcolor = vec4(1.0,0.0,0.0,1.0);",
  "}",
].join("\n");

var initDemo = function () {
  console.log("working");

  const canvas = document.getElementById("game-surface");
  const gl = canvas.getContext("webgl");
  console.log(gl);
  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  //
  //shaders
  //
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
};
