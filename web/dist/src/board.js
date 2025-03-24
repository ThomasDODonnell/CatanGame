

const svgNS = "http://www.w3.org/2000/svg";

function getHexVerticies(r){
    // r is the radius of the circle the hed is inscribed in
    // basically r is size
    // let verticies = []; // for when we do offsets we need tuples of ints
    let verticies = "";
    for (let i =0; i < 6; i++){
        let x = Math.sin(((Math.PI * i)/3)) * r;
        let y = Math.cos(((Math.PI * i)/3)) * r;
        // verticies.push([x, y]);
        if (i === 0) {
            verticies += `${x},${y}`;
        } else {
            verticies += ` ${x},${y}`;
        }
    }
    return verticies;
}

function drawHex(verticies){
    let hex = document.createElementNS(svgNS, "polygon");
    hex.setAttribute("points", verticies);
    hex.setAttribute("fill", '#7CFC00');
    hex.setAttribute("stroke", "black");
    hex.setAttribute("stroke-width", "2");
    return hex;
}

function getHexSize(height, width){
    if(height < width){
        let r = (height*10)/16;
        let road_scale = r/10;
    }
    let r = (height*10)/16;
    let road_scale = r/10;
    return r, road_scale
}

function positionHexes(hexes, height, width, r){
    // const center = [width/2, height/2];
    let y_offset = r/10;
    let x_offset = r * Math.tan(Math.PI/6)

    let centers = [];
    
    //middle virtical row
    for(let i = 0; i < 6; i++){
        let center = (i + 1) * y_offset + ((2*i) + 1) * r;
        centers.push([center, center])
    }

    //middle horizontal row
    for(let i = 0; i < 5; i++){
        let center = (i + 1) * x_offset + ((2*i) + 1) * r;
        centers.push([center, center])
    }


}

function drawBoard(height, width){
    // Create mother SVG
    const mother_svg = document.createElementNS(svgNS, "svg");
    mother_svg.setAttribute("width", `${width}`);
    mother_svg.setAttribute("height", `${height}`);
    mother_svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    document.body.appendChild(mother_svg);

    const container = document.getElementById('board-container');
    container.appendChild(mother_svg);

    let r = getHexSize(height, width)
    let hex_verticies = getHexVerticies(r);
    let hex = drawHex(hex_verticies);

    //position the hex
    hex.setAttribute("transform", "translate(300, 300)");

    mother_svg.appendChild(hex);

}

export { drawBoard };