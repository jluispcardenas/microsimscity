grid = {}
GRID_WIDTH = 8
BUILDINGS_PER_BLOCK = 16
PARCEL_PX = 10
types = ["c", "c", "c", "c", "B", "B", "B", "S"]

currents = []

delta = 0.21;

function setup() {
  createCanvas(400, 400, WEBGL);

  for (var block = 0; block < GRID_WIDTH*GRID_WIDTH; block++) {
    for (var parcel = 0; parcel < BUILDINGS_PER_BLOCK; parcel++) {
      grid[block + "-" + parcel] = [types[Math.floor(Math.random() * types.length)],0]
    }
  }
  
  keys = Object.keys(grid)
  shuf = shuffle(keys)
  
  cam = createCamera()
  cam.move(-180, 150, 0)

}

function draw() {
  //if ((frameCount%2) == 0) {
     if (shuf.length > 0) {
       currents.push(shuf.pop())
       delta *= 1
     }
  //}

  background(200);
  cam.move((delta/2), -delta, -delta);
  ambientLight(180);
  directionalLight(255, 0, 0, 0, 0, 0);
  pointLight(0, 0, 255, 0, 0, 0);

  for (i = 0; i < currents.length; i++) {
    prts = currents[i].split("-")
    block = parseInt(prts[0])
    parcel = parseInt(prts[1])
    y = (block/GRID_WIDTH)
    x = (block%GRID_WIDTH)
    
    block_sqrt = Math.sqrt(BUILDINGS_PER_BLOCK)
    y_p = (parcel/block_sqrt)
    x_p = (parcel%block_sqrt)
    x_street_w = x*PARCEL_PX
    y_street_w = y*PARCEL_PX
    
    push()
    translate(
      ((x*PARCEL_PX*block_sqrt)+(x_p*PARCEL_PX)+x_street_w)-200, 
      ((y*PARCEL_PX*block_sqrt)+(y_p*PARCEL_PX)+y_street_w)-200, 0);
    
    drawFigure(currents[i])
    
    pop();
  }
  
}

function drawFigure(k) {
  val = frameCount * 0.001
  if (val >= 1) val = 0.9
  rotateX(val)

  max_heights = {"c": PARCEL_PX, "B": PARCEL_PX*2, "S": PARCEL_PX*2.5}
  if (grid[k][1] < max_heights[grid[k][0]]) {
    grid[k][1] += 0.5
  }
  
  if (grid[k][0] == "c") {
    fill(150,100,100)
    box(PARCEL_PX, PARCEL_PX, -grid[k][1]);
  } else if (grid[k][0] == "B") {
    fill(110,110,100)
    box(PARCEL_PX,PARCEL_PX, -grid[k][1])
  } else if (grid[k][0] == "S") {
    fill(150,150,150)
    box(PARCEL_PX,PARCEL_PX, -grid[k][1])
  }
}
