

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

function drawBoard(){
    // Create mother SVG
    const mother_svg = document.createElementNS(svgNS, "svg");
    mother_svg.setAttribute("width", "600");
    mother_svg.setAttribute("height", "600");
    mother_svg.setAttribute("viewBox", "0 0 600 600");
    document.body.appendChild(mother_svg);

    const container = document.getElementById('board-container');
    container.appendChild(mother_svg);
    
    let hex_verticies = getHexVerticies(50);
    let hex = drawHex(hex_verticies);

    //position the hex
    hex.setAttribute("transform", "translate(300, 300)");

    mother_svg.appendChild(hex);

}

export { drawBoard };