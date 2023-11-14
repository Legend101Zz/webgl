var vertexShaderText = [
  "precision mediump float;",
  "",
  "attribute vec3 vertPosition;",
  "attribute vec3 vertColor;",
  "varying vec3 fragColor;",
  "uniform mat4 mWorld;",
  "uniform mat4 mView;",
  "uniform mat4 mProj;",
  "",
  "void main()",
  "{",
  "fragColor = vertColor;",
  " gl_Position = mProj*mView*mWorld*vec4(vertPosition,1.0);",
  "}",
].join("\n");

var fragmentShaderText = [
  "precision mediump float;",
  "",
  "varying vec3 fragColor;",
  "void main()",
  "{",
  " gl_FragColor = vec4(fragColor,1.0);",
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

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.error("error in vertex", gl.getShaderInfoLog(vertexShader));
    return;
  }
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.error("error in vertex", gl.getShaderInfoLog(fragmentShader));
    return;
  }

  const program = gl.createProgram();
  gl.attachShader(program, fragmentShader);
  gl.attachShader(program, vertexShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("error in linking program", gl.getProgramInfoLog(program));
    return;
  }
  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.error("error in validating program", gl.getProgramInfoLog(program));
    return;
  }

  //
  //buffer
  //
  const triangleVertices = [
    //X,Y           and R,G,B
    0.0, 0.5, 0.0, 1.0, 1.0, 0.0, -0.5, -0.5, 0.0, 0.7, 0.5, 0.5, 0.5, -0.5,
    0.0, 1.0, 0.5, 0.5,
  ];

  const triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(triangleVertices),
    gl.STATIC_DRAW
  );

  const positionAttributeLocation = gl.getAttribLocation(
    program,
    "vertPosition"
  );
  const colorAttributeLocation = gl.getAttribLocation(program, "vertColor");
  gl.vertexAttribPointer(
    positionAttributeLocation, //Attribute Location
    3, //Number of elements per attribute
    gl.FLOAT, //types of elements
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, //size of individual vertex
    0 // offset from the beginning of a single vertex to this attribute
  );

  gl.vertexAttribPointer(
    colorAttributeLocation, //Attribute Location
    3, //Number of elements per attribute
    gl.FLOAT, //types of elements
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, //size of individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT // offset from the beginning of a single vertex to this attribute
  );

  gl.enableVertexAttribArray(positionAttributeLocation);
  gl.enableVertexAttribArray(colorAttributeLocation);

  // Tell opengl state machine which program should be active

  gl.useProgram(program);

  const matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
  const matViewUniformLocation = gl.getUniformLocation(program, "mView");
  const matProjUniformLocation = gl.getUniformLocation(program, "mProj");

  const worldMatrix = new Float32Array(16);
  const viewMatrix = new Float32Array(16);
  const projMatrix = new Float32Array(16);

  glMatrix.mat4.identity(worldMatrix);
  glMatrix.mat4.identity(viewMatrix);
  glMatrix.mat4.identity(projMatrix);

  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
  //
  // Main render Loop
  //

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

//18:19
